use std::net::{IpAddr, Ipv4Addr};

use fail2ban_log_parser_core::{Fail2BanEvent, Fail2BanLevel, parse};

#[test]
fn parse_multiple_lines() {
    let input = "\
2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4
2024-01-01 00:00:01,000 fail2ban.actions [2] NOTICE [sshd] Ban 5.6.7.8
2024-01-01 00:00:02,000 fail2ban.actions [3] INFO [sshd] Unban 5.6.7.8";
    let results: Vec<_> = parse(input).collect();
    assert_eq!(results.len(), 3);
    assert!(results.iter().all(|r| r.is_ok()));

    let logs: Vec<_> = results.into_iter().map(|r| r.unwrap()).collect();
    assert_eq!(logs[0].event(), Some(&Fail2BanEvent::Found));
    assert_eq!(logs[1].event(), Some(&Fail2BanEvent::Ban));
    assert_eq!(logs[2].event(), Some(&Fail2BanEvent::Unban));

    assert_eq!(logs[0].ip(), Some(&IpAddr::V4(Ipv4Addr::new(1, 2, 3, 4))));
    assert_eq!(logs[1].ip(), Some(&IpAddr::V4(Ipv4Addr::new(5, 6, 7, 8))));
    assert_eq!(logs[2].ip(), Some(&IpAddr::V4(Ipv4Addr::new(5, 6, 7, 8))));
}

#[test]
fn parse_empty_input_yields_no_results() {
    let results: Vec<_> = parse("").collect();
    assert_eq!(results.len(), 0);
}

#[test]
fn parse_invalid_line_returns_error() {
    let line = "this is not a valid log line";
    let result = parse(line).next().unwrap();
    assert!(result.is_err());
}

#[test]
fn parse_error_contains_line_number_and_text() {
    let input = "bad line\n2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4";
    let results: Vec<_> = parse(input).collect();
    assert_eq!(results.len(), 2);

    let err = results[0].as_ref().unwrap_err();
    assert_eq!(err.line_number, 1);
    assert_eq!(err.line, "bad line");
    assert!(results[1].is_ok());
}

#[test]
fn parse_mixed_valid_and_invalid_lines() {
    let input = "\
2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4
garbage line here
2024-01-01 00:00:02,000 fail2ban.actions [3] INFO [sshd] Unban 5.6.7.8";
    let results: Vec<_> = parse(input).collect();
    assert_eq!(results.len(), 3);
    assert!(results[0].is_ok());
    assert!(results[1].is_err());
    assert!(results[2].is_ok());
}

#[test]
fn parse_error_display_format() {
    let err = parse("bad").next().unwrap().unwrap_err();
    let msg = format!("{}", err);
    assert!(msg.contains("failed to parse line 1"));
    assert!(msg.contains("bad"));
}

#[test]
fn parse_realistic_log_batch() {
    let input = "\
2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100
2024-01-15 14:32:02,123 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100
2024-01-15 14:32:03,456 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100
2024-01-15 14:32:04,789 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.100
2024-01-15 14:42:04,789 fail2ban.actions [12345] NOTICE [sshd] Unban 192.168.1.100";

    let logs: Vec<_> = parse(input).map(|r| r.unwrap()).collect();
    assert_eq!(logs.len(), 5);

    for log in &logs[..3] {
        assert_eq!(log.event(), Some(&Fail2BanEvent::Found));
        assert_eq!(log.ip(), Some(&IpAddr::V4(Ipv4Addr::new(192, 168, 1, 100))));
    }

    assert_eq!(logs[3].event(), Some(&Fail2BanEvent::Ban));
    assert_eq!(logs[3].level(), Some(&Fail2BanLevel::Notice));
    assert_eq!(logs[4].event(), Some(&Fail2BanEvent::Unban));
}
