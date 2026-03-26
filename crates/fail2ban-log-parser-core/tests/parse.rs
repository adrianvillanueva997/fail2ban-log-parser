use std::net::{IpAddr, Ipv4Addr};

use chrono::Datelike;
use fail2ban_log_parser_core::{Fail2BanEvent, Fail2BanHeaderType, Fail2BanLevel, parse};

#[test]
fn parse_standard_found_line() {
    let line = "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1";
    let result: Vec<_> = parse(line).collect();
    assert_eq!(result.len(), 1);
    let log = result[0].as_ref().unwrap();
    assert!(log.timestamp().is_some());
    assert_eq!(log.header(), Some(&Fail2BanHeaderType::Filter));
    assert_eq!(log.pid(), Some(12345));
    assert_eq!(log.level(), Some(&Fail2BanLevel::Info));
    assert_eq!(log.jail(), Some("sshd"));
    assert_eq!(log.event(), Some(&Fail2BanEvent::Found));
    assert_eq!(log.ip(), Some(&IpAddr::V4(Ipv4Addr::new(192, 168, 1, 1))));
}

#[test]
fn parse_ban_line() {
    let line = "2024-06-20 03:15:42,100 fail2ban.actions [999] NOTICE [sshd] Ban 10.0.0.5";
    let log = parse(line).next().unwrap().unwrap();
    assert_eq!(log.header(), Some(&Fail2BanHeaderType::Actions));
    assert_eq!(log.pid(), Some(999));
    assert_eq!(log.level(), Some(&Fail2BanLevel::Notice));
    assert_eq!(log.jail(), Some("sshd"));
    assert_eq!(log.event(), Some(&Fail2BanEvent::Ban));
    assert_eq!(log.ip(), Some(&IpAddr::V4(Ipv4Addr::new(10, 0, 0, 5))));
}

#[test]
fn parse_syslog_all_months() {
    let months = [
        ("Jan", 1),
        ("Feb", 2),
        ("Mar", 3),
        ("Apr", 4),
        ("May", 5),
        ("Jun", 6),
        ("Jul", 7),
        ("Aug", 8),
        ("Sep", 9),
        ("Oct", 10),
        ("Nov", 11),
        ("Dec", 12),
    ];
    for (abbr, expected_month) in &months {
        let line = format!(
            "{} 1 2024 12:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4",
            abbr
        );
        let log = parse(&line).next().unwrap().unwrap();
        let ts = log.timestamp().unwrap();
        assert_eq!(
            ts.month(),
            *expected_month,
            "failed for month abbreviation {}",
            abbr
        );
    }
}

#[test]
fn parse_time_with_dot_milliseconds() {
    let line = "2024-01-01 14:32:01.847 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4";
    let log = parse(line).next().unwrap().unwrap();
    let ts = log.timestamp().unwrap();
    assert_eq!(ts.format("%H:%M:%S").to_string(), "14:32:01");
}

#[test]
fn parse_leap_day() {
    let line = "2024-02-29 12:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4";
    let log = parse(line).next().unwrap().unwrap();
    let ts = log.timestamp().unwrap();
    assert_eq!(ts.format("%Y-%m-%d").to_string(), "2024-02-29");
}

#[test]
fn parse_end_of_day_timestamp() {
    let line = "2024-01-01 23:59:59,999 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4";
    let log = parse(line).next().unwrap().unwrap();
    let ts = log.timestamp().unwrap();
    assert_eq!(ts.format("%H:%M:%S").to_string(), "23:59:59");
}

#[test]
fn parse_timestamp_millisecond_precision() {
    let line = "2024-06-15 08:30:45,123 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4";
    let log = parse(line).next().unwrap().unwrap();
    let ts = log.timestamp().unwrap();
    assert_eq!(ts.timestamp_subsec_millis(), 123);
}

#[test]
fn parse_with_extra_whitespace() {
    let line = "2024-01-01 00:00:00,000  fail2ban.filter  [1]  INFO  [sshd]  Found  1.2.3.4";
    let log = parse(line).next().unwrap().unwrap();
    assert_eq!(log.event(), Some(&Fail2BanEvent::Found));
    assert_eq!(log.ip(), Some(&IpAddr::V4(Ipv4Addr::new(1, 2, 3, 4))));
}
