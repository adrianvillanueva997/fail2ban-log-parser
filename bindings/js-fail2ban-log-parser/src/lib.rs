#![deny(clippy::all)]

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

fn convert_header(header: &CoreFail2BanHeaderType) -> Fail2BanHeaderType {
  match header {
    CoreFail2BanHeaderType::Filter => Fail2BanHeaderType::Filter,
    CoreFail2BanHeaderType::Actions => Fail2BanHeaderType::Actions,
    CoreFail2BanHeaderType::Server => Fail2BanHeaderType::Server,
  }
}

fn convert_level(level: &CoreFail2BanLevel) -> Fail2BanLevel {
  match level {
    CoreFail2BanLevel::Info => Fail2BanLevel::Info,
    CoreFail2BanLevel::Notice => Fail2BanLevel::Notice,
    CoreFail2BanLevel::Warning => Fail2BanLevel::Warning,
    CoreFail2BanLevel::Error => Fail2BanLevel::Error,
    CoreFail2BanLevel::Debug => Fail2BanLevel::Debug,
  }
}

fn convert_event(event: &CoreFail2BanEvent) -> Fail2BanEvent {
  match event {
    CoreFail2BanEvent::Found => Fail2BanEvent::Found,
    CoreFail2BanEvent::Ban => Fail2BanEvent::Ban,
    CoreFail2BanEvent::Unban => Fail2BanEvent::Unban,
    CoreFail2BanEvent::Restore => Fail2BanEvent::Restore,
    CoreFail2BanEvent::Ignore => Fail2BanEvent::Ignore,
    CoreFail2BanEvent::AlreadyBanned => Fail2BanEvent::AlreadyBanned,
    CoreFail2BanEvent::Failed => Fail2BanEvent::Failed,
    CoreFail2BanEvent::Unknown => Fail2BanEvent::Unknown,
  }
}

#[napi]
pub fn plus_100(input: u32) -> u32 {
  input + 100
}

#[napi]
pub fn parse(input: String) -> (Vec<Fail2BanLog>, Vec<ParseError>) {
  let mut logs = Vec::new();
  let mut errors = Vec::new();

  for result in core_parse(&input) {
    match result {
      Ok(log) => {
        logs.push(Fail2BanLog {
          timestamp: log.timestamp().map(|t| t.to_rfc3339()),
          header: log.header().map(convert_header),
          pid: log.pid(),
          level: log.level().map(convert_level),
          jail: log.jail().map(ToString::to_string),
          event: log.event().map(convert_event),
          ip: log.ip().map(ToString::to_string),
        });
      }
      Err(e) => {
        errors.push(ParseError {
          line_number: e.line_number as u32,
          line: e.line,
        });
      }
    }
  }

  (logs, errors)
}
