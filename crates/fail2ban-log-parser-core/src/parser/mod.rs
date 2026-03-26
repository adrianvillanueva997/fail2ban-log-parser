mod date;
mod header;
mod jail;
mod level;
mod pid;
mod time;
mod timestamp;

pub use header::Fail2BanHeaderType;
pub use level::Fail2BanLevel;

use std::net::IpAddr;

use chrono::{DateTime, Utc};
use winnow::Parser;

use crate::parser::{
    header::parse_header, jail::parse_jail, level::parse_level, pid::parse_pid,
    timestamp::parse_timestamp,
};
use winnow::ascii::multispace1;

#[derive(Debug, Clone, PartialEq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
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

impl std::fmt::Display for Fail2BanEvent {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Found => write!(f, "Found"),
            Self::Ban => write!(f, "Ban"),
            Self::Unban => write!(f, "Unban"),
            Self::Restore => write!(f, "Restore"),
            Self::Ignore => write!(f, "Ignore"),
            Self::AlreadyBanned => write!(f, "AlreadyBanned"),
            Self::Failed => write!(f, "Failed"),
            Self::Unknown => write!(f, "Unknown"),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Default)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub struct Fail2BanStructuredLog {
    timestamp: Option<DateTime<Utc>>,
    header: Option<Fail2BanHeaderType>,
    pid: Option<u32>,
    level: Option<Fail2BanLevel>,
    jail: Option<String>,
    event: Option<Fail2BanEvent>,
    ip: Option<IpAddr>,
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

    pub fn ip(&self) -> Option<&IpAddr> {
        self.ip.as_ref()
    }

    pub fn event(&self) -> Option<&Fail2BanEvent> {
        self.event.as_ref()
    }

    pub fn jail(&self) -> Option<&str> {
        self.jail.as_deref()
    }

    pub fn level(&self) -> Option<&Fail2BanLevel> {
        self.level.as_ref()
    }

    pub fn pid(&self) -> Option<u32> {
        self.pid
    }

    pub fn header(&self) -> Option<&Fail2BanHeaderType> {
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
