mod date;
mod header;
mod jail;
mod level;
mod pid;
mod time;
mod timestamp;

use std::net::IpAddr;

use chrono::{DateTime, Utc};
use winnow::Parser;

use crate::parser::{
    header::{Fail2banHeaderType, parse_header},
    jail::parse_jail,
    level::{Fail2BanLogger, parse_level},
    pid::parse_pid,
    timestamp::parse_timestamp,
};
use winnow::ascii::multispace1;

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

#[derive(Clone, PartialEq, Default)]
pub struct Fail2BanStructuredLog {
    timestamp: Option<DateTime<Utc>>,
    header: Option<Fail2banHeaderType>,
    pid: Option<u32>,
    level: Option<Fail2BanLogger>,
    jail: Option<String>,
    event: Option<Fail2BanEvent>,
    ip_field: Option<IpAddr>,
    attempts: Option<u32>,
    raw_line: Option<String>,
}

impl Fail2BanStructuredLog {
    pub fn raw_line(&self) -> Option<&str> {
        self.raw_line.as_deref()
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

    pub fn jail(&self) -> Option<&str> {
        self.jail.as_deref()
    }

    pub fn level(&self) -> Option<&Fail2BanLogger> {
        self.level.as_ref()
    }

    pub fn pid(&self) -> Option<u32> {
        self.pid
    }

    pub fn header(&self) -> Option<&Fail2banHeaderType> {
        self.header.as_ref()
    }

    pub fn timestamp(&self) -> Option<DateTime<Utc>> {
        self.timestamp
    }
}

pub(crate) fn parse_log_line<'a>(input: &'a mut &'a str) -> winnow::Result<Fail2BanStructuredLog> {
    let timestamp = parse_timestamp.parse_next(input)?;
    multispace1.parse_next(input)?;
    let header = parse_header.parse_next(input)?;
    multispace1.parse_next(input)?;
    let pid = parse_pid.parse_next(input)?;
    multispace1.parse_next(input)?;
    let level = parse_level.parse_next(input)?;
    multispace1.parse_next(input)?;
    let jail = parse_jail.parse_next(input)?;
    multispace1.parse_next(input)?;

    Ok(Fail2BanStructuredLog {
        timestamp,
        header,
        pid,
        level,
        jail: jail.map(|j| j.to_string()),
        ..Default::default()
    })
}
