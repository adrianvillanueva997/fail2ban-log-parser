use std::net::{IpAddr, Ipv4Addr};

use fail2ban_log_parser_core::{
    Fail2BanEvent, Fail2BanHeaderType, Fail2BanLevel, parse,
};

fn build_log_line(
    timestamp: &str,
    header: &str,
    pid: u32,
    level: &str,
    jail: &str,
    event: &str,
    ip: &str,
) -> String {
    format!(
        "{} {} [{}] {} [{}] {} {}",
        timestamp, header, pid, level, jail, event, ip
    )
}

#[test]
fn all_event_header_combinations() {
    let headers = [
        ("fail2ban.filter", Fail2BanHeaderType::Filter),
        ("fail2ban.actions", Fail2BanHeaderType::Actions),
        ("fail2ban.server", Fail2BanHeaderType::Server),
    ];
    let events = [
        ("Found", Fail2BanEvent::Found),
        ("Ban", Fail2BanEvent::Ban),
        ("Unban", Fail2BanEvent::Unban),
        ("Restore", Fail2BanEvent::Restore),
        ("Ignore", Fail2BanEvent::Ignore),
        ("AlreadyBanned", Fail2BanEvent::AlreadyBanned),
        ("Failed", Fail2BanEvent::Failed),
        ("Unknown", Fail2BanEvent::Unknown),
    ];

    for (header_str, expected_header) in &headers {
        for (event_str, expected_event) in &events {
            let line = build_log_line(
                "2024-01-01 00:00:00,000",
                header_str,
                1,
                "INFO",
                "sshd",
                event_str,
                "1.2.3.4",
            );
            let log = parse(&line).next().unwrap().unwrap_or_else(|e| {
                panic!("failed to parse header={}, event={}: {}", header_str, event_str, e)
            });
            assert_eq!(
                log.header(),
                Some(expected_header),
                "header mismatch for {}/{}",
                header_str,
                event_str
            );
            assert_eq!(
                log.event(),
                Some(expected_event),
                "event mismatch for {}/{}",
                header_str,
                event_str
            );
        }
    }
}

#[test]
fn all_level_event_combinations() {
    let levels = [
        ("INFO", Fail2BanLevel::Info),
        ("NOTICE", Fail2BanLevel::Notice),
        ("WARNING", Fail2BanLevel::Warning),
        ("ERROR", Fail2BanLevel::Error),
        ("DEBUG", Fail2BanLevel::Debug),
    ];
    let events = [
        ("Found", Fail2BanEvent::Found),
        ("Ban", Fail2BanEvent::Ban),
        ("Unban", Fail2BanEvent::Unban),
        ("Restore", Fail2BanEvent::Restore),
        ("Ignore", Fail2BanEvent::Ignore),
        ("AlreadyBanned", Fail2BanEvent::AlreadyBanned),
        ("Failed", Fail2BanEvent::Failed),
        ("Unknown", Fail2BanEvent::Unknown),
    ];

    for (level_str, expected_level) in &levels {
        for (event_str, expected_event) in &events {
            let line = build_log_line(
                "2024-06-15 12:00:00,500",
                "fail2ban.filter",
                42,
                level_str,
                "sshd",
                event_str,
                "10.20.30.40",
            );
            let log = parse(&line).next().unwrap().unwrap_or_else(|e| {
                panic!("failed to parse level={}, event={}: {}", level_str, event_str, e)
            });
            assert_eq!(
                log.level(),
                Some(expected_level),
                "level mismatch for {}/{}",
                level_str,
                event_str
            );
            assert_eq!(
                log.event(),
                Some(expected_event),
                "event mismatch for {}/{}",
                level_str,
                event_str
            );
        }
    }
}

#[test]
fn timestamp_formats() {
    let timestamps = [
        ("2024-01-01 00:00:00,000", "ISO date + comma ms"),
        ("2024-01-01 00:00:00.000", "ISO date + dot ms"),
        ("2024-01-01T00:00:00,000", "ISO 8601 T-separator + comma ms"),
        ("2024-01-01T00:00:00.000", "ISO 8601 T-separator + dot ms"),
        ("2024-01-01T00:00:00,000Z", "ISO 8601 + Z timezone"),
        ("2024-01-01T00:00:00,000+01:00", "ISO 8601 + positive offset"),
        ("2024-01-01T00:00:00,000-08:00", "ISO 8601 + negative offset"),
        ("Jan 1 2024 00:00:00,000", "Syslog format"),
        ("Dec 31 2024 23:59:59,999", "Syslog format end of year"),
    ];

    for (ts_str, label) in &timestamps {
        let line = format!("{} fail2ban.filter [1] INFO [sshd] Found 1.2.3.4", ts_str);
        let result = parse(&line).next().unwrap();
        assert!(result.is_ok(), "timestamp format failed: {} ({})", ts_str, label);
        let log = result.unwrap();
        assert!(
            log.timestamp().is_some(),
            "timestamp was None for: {} ({})",
            ts_str,
            label
        );
    }
}

#[test]
fn ipv4_addresses() {
    let ips = [
        ("0.0.0.0", Ipv4Addr::new(0, 0, 0, 0)),
        ("1.2.3.4", Ipv4Addr::new(1, 2, 3, 4)),
        ("10.0.0.1", Ipv4Addr::new(10, 0, 0, 1)),
        ("127.0.0.1", Ipv4Addr::new(127, 0, 0, 1)),
        ("172.16.0.1", Ipv4Addr::new(172, 16, 0, 1)),
        ("192.168.1.1", Ipv4Addr::new(192, 168, 1, 1)),
        ("192.168.255.255", Ipv4Addr::new(192, 168, 255, 255)),
        ("255.255.255.255", Ipv4Addr::new(255, 255, 255, 255)),
    ];

    for (ip_str, expected) in &ips {
        let line = build_log_line(
            "2024-01-01 00:00:00,000",
            "fail2ban.filter",
            1,
            "INFO",
            "sshd",
            "Found",
            ip_str,
        );
        let log = parse(&line)
            .next()
            .unwrap()
            .unwrap_or_else(|e| panic!("failed to parse IP {}: {}", ip_str, e));
        assert_eq!(
            log.ip(),
            Some(&IpAddr::V4(*expected)),
            "IP mismatch for {}",
            ip_str
        );
    }
}

#[test]
fn ipv6_addresses() {
    let ips = [
        "::1",
        "2001:db8::1",
        "fe80::1",
        "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        "::ffff:192.168.1.1",
    ];

    for ip_str in &ips {
        let line = build_log_line(
            "2024-01-01 00:00:00,000",
            "fail2ban.filter",
            1,
            "INFO",
            "sshd",
            "Found",
            ip_str,
        );
        let log = parse(&line)
            .next()
            .unwrap()
            .unwrap_or_else(|e| panic!("failed to parse IPv6 {}: {}", ip_str, e));
        let expected: IpAddr = ip_str.parse().unwrap();
        assert_eq!(log.ip(), Some(&expected), "IPv6 mismatch for {}", ip_str);
    }
}

#[test]
fn pid_values() {
    let pids: &[u32] = &[0, 1, 100, 9999, 32768, 65535, 100000, 4294967295];

    for &pid in pids {
        let line = build_log_line(
            "2024-01-01 00:00:00,000",
            "fail2ban.filter",
            pid,
            "INFO",
            "sshd",
            "Found",
            "1.2.3.4",
        );
        let log = parse(&line)
            .next()
            .unwrap()
            .unwrap_or_else(|e| panic!("failed to parse pid {}: {}", pid, e));
        assert_eq!(log.pid(), Some(pid), "PID mismatch for {}", pid);
    }
}

#[test]
fn case_variations() {
    let case_variations = [
        ("fail2ban.filter", "INFO", "Found"),
        ("FAIL2BAN.FILTER", "INFO", "Found"),
        ("Fail2ban.Filter", "Info", "Found"),
        ("fail2ban.filter", "info", "found"),
        ("FAIL2BAN.ACTIONS", "NOTICE", "BAN"),
        ("fail2ban.server", "debug", "ignore"),
        ("Fail2ban.Actions", "Warning", "Unban"),
    ];

    for (header, level, event) in &case_variations {
        let line = build_log_line(
            "2024-01-01 00:00:00,000",
            header,
            1,
            level,
            "sshd",
            event,
            "1.2.3.4",
        );
        let result = parse(&line).next().unwrap();
        assert!(
            result.is_ok(),
            "case variation failed: header={}, level={}, event={}",
            header,
            level,
            event
        );
        let log = result.unwrap();
        assert!(log.header().is_some());
        assert!(log.level().is_some());
        assert!(log.event().is_some());
    }
}
