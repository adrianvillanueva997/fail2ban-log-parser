mod date;
mod time;
mod timestamp;

use std::net::IpAddr;

use chrono::{DateTime, Utc};
use timestamp::parse_timestamp;
use winnow::Parser;

#[derive(Debug, PartialEq, Clone)]
pub enum Fail2BanModule {
    Filter,
    Actions,
    Server,
}

#[derive(Debug, Clone, PartialEq)]
pub enum Fail2BanLogger {
    Info,
    Notice,
    Warning,
    Error,
    Debug,
}

#[derive(Debug, Clone, PartialEq)]
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

#[derive(Default, Clone, PartialEq)]
pub struct Fail2BanStructuredLog {
    timestamp: Option<DateTime<Utc>>,
    module: Option<Fail2BanModule>,
    pid: Option<u32>,
    level: Option<Fail2BanLogger>,
    jail: Option<String>,
    event: Option<Fail2BanEvent>,
    ip_field: Option<IpAddr>,
    attempts: Option<u32>,
    raw_line: Option<String>,
}

impl Fail2BanStructuredLog {
    pub fn raw_line(&self) -> Option<&String> {
        self.raw_line.as_ref()
    }

    pub fn attempts(&self) -> Option<u32> {
        self.attempts
    }

    pub fn ip_field(&self) -> Option<&IpAddr> {
        self.ip_field.as_ref()
    }

    pub fn event(&self) -> Option<&Fail2BanEvent> {
        self.event.as_ref()
    }

    pub fn jail(&self) -> Option<&String> {
        self.jail.as_ref()
    }

    pub fn level(&self) -> Option<&Fail2BanLogger> {
        self.level.as_ref()
    }

    pub fn pid(&self) -> Option<u32> {
        self.pid
    }

    pub fn module(&self) -> Option<&Fail2BanModule> {
        self.module.as_ref()
    }

    pub fn timestamp(&self) -> Option<DateTime<Utc>> {
        self.timestamp
    }
}

pub(crate) fn parse_log_line(input: &mut &str) -> winnow::Result<Fail2BanStructuredLog> {
    let timestamp = parse_timestamp.parse_next(input)?;

    Ok(Fail2BanStructuredLog {
        timestamp,
        ..Default::default()
    })
}
