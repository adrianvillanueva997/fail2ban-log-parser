#![warn(clippy::pedantic)]

use fail2ban_log_parser_core::{
  Fail2BanEvent as CoreFail2BanEvent, Fail2BanHeaderType as CoreFail2BanHeaderType,
  Fail2BanLevel as CoreFail2BanLevel, parse as core_parse,
};
use napi_derive::napi;

#[napi]
pub enum Fail2BanHeaderType {
  Filter,
  Actions,
  Server,
}

#[napi]
pub enum Fail2BanLevel {
  Info,
  Notice,
  Warning,
  Error,
  Debug,
}

#[napi]
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

impl From<&CoreFail2BanHeaderType> for Fail2BanHeaderType {
  fn from(h: &CoreFail2BanHeaderType) -> Self {
    match h {
      CoreFail2BanHeaderType::Filter => Self::Filter,
      CoreFail2BanHeaderType::Actions => Self::Actions,
      CoreFail2BanHeaderType::Server => Self::Server,
    }
  }
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

#[napi(object)]
pub struct Fail2BanLog {
  pub timestamp: Option<String>,
  pub header: Option<Fail2BanHeaderType>,
  pub pid: Option<u32>,
  pub level: Option<Fail2BanLevel>,
  pub jail: Option<String>,
  pub event: Option<Fail2BanEvent>,
  pub ip: Option<String>,
}

#[napi(object)]
pub struct ParseError {
  pub line_number: u32,
  pub line: String,
}

#[napi(object)]
pub struct ParseResult {
  pub logs: Vec<Fail2BanLog>,
  pub errors: Vec<ParseError>,
}

#[napi]
#[allow(clippy::needless_pass_by_value)]
pub fn parse(input: String) -> ParseResult {
  let mut logs = Vec::new();
  let mut errors = Vec::new();

  for result in core_parse(&input) {
    match result {
      Ok(log) => logs.push(Fail2BanLog {
        timestamp: log.timestamp().map(|t| t.to_rfc3339()),
        header: log.header().map(Into::into),
        pid: log.pid(),
        level: log.level().map(Into::into),
        jail: log.jail().map(str::to_string),
        event: log.event().map(Into::into),
        ip: log.ip().map(ToString::to_string),
      }),
      Err(e) => errors.push(ParseError {
        line_number: u32::try_from(e.line_number).unwrap_or(0),
        line: e.line,
      }),
    }
  }

  ParseResult { logs, errors }
}
