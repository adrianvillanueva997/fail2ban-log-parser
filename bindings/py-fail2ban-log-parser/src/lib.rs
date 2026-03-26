#![warn(clippy::pedantic)]

use pyo3::prelude::*;
use pyo3::types::PyList;

use fail2ban_log_parser_core::{Fail2BanEvent, Fail2BanHeaderType, Fail2BanLevel};

/// Fail2ban log header type.
#[pyclass(frozen, eq, hash, skip_from_py_object, name = "HeaderType")]
#[derive(Clone, PartialEq, Hash)]
enum PyHeaderType {
    Filter,
    Actions,
    Server,
}

/// Fail2ban log level.
#[pyclass(frozen, eq, hash, skip_from_py_object, name = "Level")]
#[derive(Clone, Debug, PartialEq, Hash)]
enum PyLevel {
    Info,
    Notice,
    Warning,
    Error,
    Debug,
}

/// Fail2ban event type.
#[pyclass(frozen, eq, hash, skip_from_py_object, name = "Event")]
#[derive(Clone, Debug, PartialEq, Hash)]
enum PyEvent {
    Found,
    Ban,
    Unban,
    Restore,
    Ignore,
    AlreadyBanned,
    Failed,
    Unknown,
}

fn convert_header(h: &Fail2BanHeaderType) -> PyHeaderType {
    match h {
        Fail2BanHeaderType::Filter => PyHeaderType::Filter,
        Fail2BanHeaderType::Actions => PyHeaderType::Actions,
        Fail2BanHeaderType::Server => PyHeaderType::Server,
    }
}

fn convert_level(l: &Fail2BanLevel) -> PyLevel {
    match l {
        Fail2BanLevel::Info => PyLevel::Info,
        Fail2BanLevel::Notice => PyLevel::Notice,
        Fail2BanLevel::Warning => PyLevel::Warning,
        Fail2BanLevel::Error => PyLevel::Error,
        Fail2BanLevel::Debug => PyLevel::Debug,
    }
}

fn convert_event(e: &Fail2BanEvent) -> PyEvent {
    match e {
        Fail2BanEvent::Found => PyEvent::Found,
        Fail2BanEvent::Ban => PyEvent::Ban,
        Fail2BanEvent::Unban => PyEvent::Unban,
        Fail2BanEvent::Restore => PyEvent::Restore,
        Fail2BanEvent::Ignore => PyEvent::Ignore,
        Fail2BanEvent::AlreadyBanned => PyEvent::AlreadyBanned,
        Fail2BanEvent::Failed => PyEvent::Failed,
        Fail2BanEvent::Unknown => PyEvent::Unknown,
    }
}

/// Python representation of a parsed fail2ban log line.
#[pyclass(frozen, name = "Fail2BanLog", skip_from_py_object)]
#[derive(Clone)]
struct PyFail2BanLog {
    #[pyo3(get)]
    timestamp: Option<String>,
    #[pyo3(get)]
    header: Option<PyHeaderType>,
    #[pyo3(get)]
    pid: Option<u32>,
    #[pyo3(get)]
    level: Option<PyLevel>,
    #[pyo3(get)]
    jail: Option<String>,
    #[pyo3(get)]
    event: Option<PyEvent>,
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

/// A Python module for parsing fail2ban logs, implemented in Rust.
#[pymodule]
mod fail2ban_log_parser {
    use super::{
        IntoPyObject, Py, PyFail2BanLog, PyList, PyParseError, PyResult, Python, convert_event,
        convert_header, convert_level, pyfunction,
    };

    #[pymodule_export]
    use super::PyEvent;
    #[pymodule_export]
    use super::PyHeaderType;
    #[pymodule_export]
    use super::PyLevel;

    /// Parse fail2ban log input and return both successful logs and errors.
    ///
    /// Args:
    ///     input: A string containing one or more fail2ban log lines.
    ///
    /// Returns:
    ///     A tuple of (logs, errors) where logs is a list of `Fail2BanLog`
    ///     and errors is a list of `ParseError`.
    #[pyfunction]
    fn parse(py: Python<'_>, input: &str) -> PyResult<(Py<PyList>, Py<PyList>)> {
        let mut logs = Vec::new();
        let mut errors = Vec::new();

        for result in fail2ban_log_parser_core::parse(input) {
            match result {
                Ok(log) => {
                    logs.push(PyFail2BanLog {
                        timestamp: log.timestamp().map(|t| t.to_rfc3339()),
                        header: log.header().map(convert_header),
                        pid: log.pid(),
                        level: log.level().map(convert_level),
                        jail: log.jail().map(std::string::ToString::to_string),
                        event: log.event().map(convert_event),
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
