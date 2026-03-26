#![warn(clippy::pedantic)]

use pyo3::prelude::*;
use pyo3::types::PyList;

use fail2ban_log_parser_core::{Fail2BanEvent, Fail2BanHeaderType, Fail2BanLevel};

/// Python representation of a parsed fail2ban log line.
#[pyclass(frozen, name = "Fail2BanLog", skip_from_py_object)]
#[derive(Clone)]
struct PyFail2BanLog {
    #[pyo3(get)]
    timestamp: Option<String>,
    #[pyo3(get)]
    header: Option<String>,
    #[pyo3(get)]
    pid: Option<u32>,
    #[pyo3(get)]
    level: Option<String>,
    #[pyo3(get)]
    jail: Option<String>,
    #[pyo3(get)]
    event: Option<String>,
    #[pyo3(get)]
    ip: Option<String>,
}

#[pymethods]
impl PyFail2BanLog {
    fn __repr__(&self) -> String {
        format!(
            "Fail2BanLog(event={:?}, ip={:?}, jail={:?}, level={:?})",
            self.event, self.ip, self.jail, self.level,
        )
    }
}

/// Python representation of a parse error.
#[pyclass(frozen, name = "ParseError", skip_from_py_object)]
#[derive(Clone)]
struct PyParseError {
    #[pyo3(get)]
    line_number: usize,
    #[pyo3(get)]
    line: String,
}

#[pymethods]
impl PyParseError {
    fn __repr__(&self) -> String {
        format!(
            "ParseError(line_number={}, line={:?})",
            self.line_number, self.line,
        )
    }
}

fn header_to_string(h: &Fail2BanHeaderType) -> String {
    match h {
        Fail2BanHeaderType::Filter => "filter".to_string(),
        Fail2BanHeaderType::Actions => "actions".to_string(),
        Fail2BanHeaderType::Server => "server".to_string(),
    }
}

fn level_to_string(l: &Fail2BanLevel) -> String {
    match l {
        Fail2BanLevel::Info => "info".to_string(),
        Fail2BanLevel::Notice => "notice".to_string(),
        Fail2BanLevel::Warning => "warning".to_string(),
        Fail2BanLevel::Error => "error".to_string(),
        Fail2BanLevel::Debug => "debug".to_string(),
    }
}

fn event_to_string(e: &Fail2BanEvent) -> String {
    match e {
        Fail2BanEvent::Found => "found".to_string(),
        Fail2BanEvent::Ban => "ban".to_string(),
        Fail2BanEvent::Unban => "unban".to_string(),
        Fail2BanEvent::Restore => "restore".to_string(),
        Fail2BanEvent::Ignore => "ignore".to_string(),
        Fail2BanEvent::AlreadyBanned => "already_banned".to_string(),
        Fail2BanEvent::Failed => "failed".to_string(),
        Fail2BanEvent::Unknown => "unknown".to_string(),
    }
}

/// A Python module for parsing fail2ban logs, implemented in Rust.
#[pymodule]
mod fail2ban_log_parser {
    use super::{
        IntoPyObject, Py, PyFail2BanLog, PyList, PyParseError, PyResult, Python, event_to_string,
        header_to_string, level_to_string, pyfunction,
    };

    /// Parse fail2ban log input and return a list of (log, error) tuples.
    ///
    /// Each element is a `Fail2BanLog` on success, or a `ParseError` on failure.
    /// Uses parallel parsing via Rayon for multi-core performance.
    ///
    /// Args:
    ///     input: A string containing one or more fail2ban log lines.
    ///
    /// Returns:
    ///     A list of `Fail2BanLog` objects (errors are collected separately
    ///     and can be retrieved with `parse_with_errors`).
    #[pyfunction]
    fn parse(py: Python<'_>, input: &str) -> PyResult<Py<PyList>> {
        let results: Vec<_> = fail2ban_log_parser_core::parse(input)
            .filter_map(std::result::Result::ok)
            .map(|log| PyFail2BanLog {
                timestamp: log.timestamp().map(|t| t.to_rfc3339()),
                header: log.header().map(header_to_string),
                pid: log.pid(),
                level: log.level().map(level_to_string),
                jail: log.jail().map(std::string::ToString::to_string),
                event: log.event().map(event_to_string),
                ip: log.ip().map(std::string::ToString::to_string),
            })
            .collect();

        let list = PyList::new(
            py,
            results
                .into_iter()
                .map(|log| log.into_pyobject(py).unwrap()),
        )?;
        Ok(list.into())
    }

    /// Parse fail2ban log input and return both successful logs and errors.
    ///
    /// Args:
    ///     input: A string containing one or more fail2ban log lines.
    ///
    /// Returns:
    ///     A tuple of (logs, errors) where logs is a list of `Fail2BanLog`
    ///     and errors is a list of `ParseError`.
    #[pyfunction]
    fn parse_with_errors(py: Python<'_>, input: &str) -> PyResult<(Py<PyList>, Py<PyList>)> {
        let mut logs = Vec::new();
        let mut errors = Vec::new();

        for result in fail2ban_log_parser_core::parse(input) {
            match result {
                Ok(log) => {
                    logs.push(PyFail2BanLog {
                        timestamp: log.timestamp().map(|t| t.to_rfc3339()),
                        header: log.header().map(header_to_string),
                        pid: log.pid(),
                        level: log.level().map(level_to_string),
                        jail: log.jail().map(std::string::ToString::to_string),
                        event: log.event().map(event_to_string),
                        ip: log.ip().map(std::string::ToString::to_string),
                    });
                }
                Err(e) => {
                    errors.push(PyParseError {
                        line_number: e.line_number,
                        line: e.line,
                    });
                }
            }
        }

        let logs_list = PyList::new(py, logs.into_iter().map(|l| l.into_pyobject(py).unwrap()))?;
        let errors_list =
            PyList::new(py, errors.into_iter().map(|e| e.into_pyobject(py).unwrap()))?;
        Ok((logs_list.into(), errors_list.into()))
    }
}
