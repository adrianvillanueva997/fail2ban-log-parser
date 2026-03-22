mod date;
mod time;
mod timestamp;

use std::net::IpAddr;

use chrono::{DateTime, Utc};
use timestamp::parse_timestamp;
use winnow::Parser;

enum Fail2BanModule {
    Filter,
    Actions,
    Server,
}

enum Fail2BanLogger {
    Info,
    Notice,
    Warning,
    Error,
    Debug,
}

enum Fail2BanEvent {
    Found,
    Ban,
    Unban,
    Restore,
    Ignore,
    AlreadyBanned,
    Failed,
    Unknown,
}

enum IpAddressType {
    Ipv4,
    Ipv6,
}

struct IpField {
    ip: Option<IpAddr>,
    ip_type: IpAddressType,
}

#[derive(Default)]
pub struct Fail2banStructuredLog {
    timestamp: Option<DateTime<Utc>>,
    module: Option<Fail2BanModule>,
    pid: Option<u32>,
    level: Option<Fail2BanLogger>,
    jail: Option<String>,
    event: Option<Fail2BanEvent>,
    ip_field: Option<IpField>,
    attempts: Option<u32>,
    raw_line: Option<String>,
}

pub(crate) fn parse_log_line(input: &mut &str) -> winnow::Result<Fail2banStructuredLog> {
    let timestamp = parse_timestamp.parse_next(input)?;

    Ok(Fail2banStructuredLog {
        timestamp,
        ..Default::default()
    })
}
