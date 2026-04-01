#![warn(clippy::pedantic)]

use fail2ban_log_parser_core::{
    Fail2BanEvent as CoreFail2BanEvent, Fail2BanHeaderType as CoreFail2BanHeaderType,
    Fail2BanLevel as CoreFail2BanLevel, parse as core_parse,
};
use std::convert::TryFrom;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, PartialEq, Eq, Debug)]
pub enum Fail2BanHeaderType {
    Filter,
    Actions,
    Server,
}

impl From<&CoreFail2BanHeaderType> for Fail2BanHeaderType {
    fn from(h: &CoreFail2BanHeaderType) -> Self {
        match h {
            CoreFail2BanHeaderType::Filter => Self::Filter,
            CoreFail2BanHeaderType::Actions => Self::Actions,
            CoreFail2BanHeaderType::Server => Self::Server,
        }
    }
}

#[wasm_bindgen]
#[derive(Clone, PartialEq, Eq, Debug)]
pub enum Fail2BanLevel {
    Info,
    Notice,
    Warning,
    Error,
    Debug,
}

impl From<&CoreFail2BanLevel> for Fail2BanLevel {
    fn from(l: &CoreFail2BanLevel) -> Self {
        match l {
            CoreFail2BanLevel::Info => Self::Info,
            CoreFail2BanLevel::Notice => Self::Notice,
            CoreFail2BanLevel::Warning => Self::Warning,
            CoreFail2BanLevel::Error => Self::Error,
            CoreFail2BanLevel::Debug => Self::Debug,
        }
    }
}

#[wasm_bindgen]
#[derive(Clone, PartialEq, Eq, Debug)]
pub enum Fail2BanEvent {
    Found,
    Ban,
    Unban,
    Restore,
    Ignore,
    AlreadyBanned,
    Failed,
    Unknown,
}

impl From<&CoreFail2BanEvent> for Fail2BanEvent {
    fn from(e: &CoreFail2BanEvent) -> Self {
        match e {
            CoreFail2BanEvent::Found => Self::Found,
            CoreFail2BanEvent::Ban => Self::Ban,
            CoreFail2BanEvent::Unban => Self::Unban,
            CoreFail2BanEvent::Restore => Self::Restore,
            CoreFail2BanEvent::Ignore => Self::Ignore,
            CoreFail2BanEvent::AlreadyBanned => Self::AlreadyBanned,
            CoreFail2BanEvent::Failed => Self::Failed,
            CoreFail2BanEvent::Unknown => Self::Unknown,
        }
    }
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct Fail2BanLog {
    timestamp: Option<String>,
    header: Option<Fail2BanHeaderType>,
    pid: Option<u32>,
    level: Option<Fail2BanLevel>,
    jail: Option<String>,
    event: Option<Fail2BanEvent>,
    ip: Option<String>,
}

#[wasm_bindgen]
impl Fail2BanLog {
    #[wasm_bindgen(getter)]
    #[must_use]
    pub fn timestamp(&self) -> Option<String> {
        self.timestamp.clone()
    }

    #[wasm_bindgen(getter)]
    #[must_use]
    pub fn header(&self) -> Option<Fail2BanHeaderType> {
        self.header.clone()
    }
    #[wasm_bindgen(getter)]
    #[must_use]
    pub fn pid(&self) -> Option<u32> {
        self.pid
    }
    #[wasm_bindgen(getter)]
    #[must_use]
    pub fn level(&self) -> Option<Fail2BanLevel> {
        self.level.clone()
    }
    #[wasm_bindgen(getter)]
    #[must_use]
    pub fn jail(&self) -> Option<String> {
        self.jail.clone()
    }
    #[wasm_bindgen(getter)]
    #[must_use]
    pub fn event(&self) -> Option<Fail2BanEvent> {
        self.event.clone()
    }
    #[wasm_bindgen(getter)]
    #[must_use]
    pub fn ip(&self) -> Option<String> {
        self.ip.clone()
    }
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct ParseError {
    line_number: u32,
    line: String,
}

#[wasm_bindgen]
impl ParseError {
    #[wasm_bindgen(getter)]
    #[must_use]
    pub fn line_number(&self) -> u32 {
        self.line_number
    }
    #[wasm_bindgen(getter)]
    #[must_use]
    pub fn line(&self) -> String {
        self.line.clone()
    }
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct ParseResult {
    logs: Vec<Fail2BanLog>,
    errors: Vec<ParseError>,
}

#[wasm_bindgen]
impl ParseResult {
    #[wasm_bindgen(getter)]
    #[must_use]
    pub fn logs(&self) -> Vec<Fail2BanLog> {
        self.logs.clone()
    }

    #[must_use]
    #[wasm_bindgen(getter)]
    pub fn errors(&self) -> Vec<ParseError> {
        self.errors.clone()
    }

    /// Consume and return all logs without cloning.
    ///
    /// On the JS side this is exposed as `takeLogs()`.
    #[wasm_bindgen(js_name = "takeLogs")]
    #[must_use]
    pub fn take_logs(&mut self) -> Vec<Fail2BanLog> {
        std::mem::take(&mut self.logs)
    }

    /// Consume and return all errors without cloning.
    ///
    /// On the JS side this is exposed as `takeErrors()`.
    #[wasm_bindgen(js_name = "takeErrors")]
    #[must_use]
    pub fn take_errors(&mut self) -> Vec<ParseError> {
        std::mem::take(&mut self.errors)
    }
}

#[wasm_bindgen]
impl ParseResult {
    #[wasm_bindgen(constructor)]
    #[must_use]
    pub fn new() -> ParseResult {
        ParseResult {
            logs: Vec::new(),
            errors: Vec::new(),
        }
    }
}

impl Default for ParseResult {
    fn default() -> Self {
        Self::new()
    }
}

#[wasm_bindgen]
#[allow(clippy::needless_pass_by_value)]
pub fn parse(input: String) -> ParseResult {
    let mut result = ParseResult::new();

    for res in core_parse(&input) {
        match res {
            Ok(log) => {
                result.logs.push(Fail2BanLog {
                    timestamp: log.timestamp().map(|t| t.to_rfc3339()),
                    header: log.header().map(Into::into),
                    pid: log.pid(),
                    level: log.level().map(Into::into),
                    jail: log.jail().map(str::to_string),
                    event: log.event().map(Into::into),
                    ip: log.ip().map(ToString::to_string),
                });
            }
            Err(e) => {
                result.errors.push(ParseError {
                    line_number: u32::try_from(e.line_number).unwrap_or(u32::MAX),
                    line: e.line,
                });
            }
        }
    }

    result
}
