use fail2ban_log_parser_core::parse;

#[test]
fn timestamp_only() {
    let line = "2024-01-01 00:00:00,000";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "timestamp-only line should fail");
}

#[test]
fn timestamp_and_header() {
    let line = "2024-01-01 00:00:00,000 fail2ban.filter";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "timestamp+header only should fail");
}

#[test]
fn up_to_pid() {
    let line = "2024-01-01 00:00:00,000 fail2ban.filter [12345]";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "up to pid only should fail");
}

#[test]
fn up_to_level() {
    let line = "2024-01-01 00:00:00,000 fail2ban.filter [12345] INFO";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "up to level only should fail");
}

#[test]
fn up_to_jail() {
    let line = "2024-01-01 00:00:00,000 fail2ban.filter [12345] INFO [sshd]";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "up to jail only should fail");
}

#[test]
fn up_to_event() {
    let line = "2024-01-01 00:00:00,000 fail2ban.filter [12345] INFO [sshd] Found";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "up to event only (no IP) should fail");
}

#[test]
fn truncated_date() {
    let line = "2024-01";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "truncated date should fail");
}

#[test]
fn truncated_time() {
    let line = "2024-01-01 14:32";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "truncated time should fail");
}

#[test]
fn empty_brackets_pid() {
    let line = "2024-01-01 00:00:00,000 fail2ban.filter [] INFO [sshd] Found 1.2.3.4";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "empty pid brackets should fail");
}

#[test]
fn missing_closing_bracket_pid() {
    let line = "2024-01-01 00:00:00,000 fail2ban.filter [12345 INFO [sshd] Found 1.2.3.4";
    let result = parse(line).next().unwrap();
    assert!(
        result.is_err(),
        "missing closing bracket on pid should fail"
    );
}

#[test]
fn missing_closing_bracket_jail() {
    let line = "2024-01-01 00:00:00,000 fail2ban.filter [12345] INFO [sshd Found 1.2.3.4";
    let result = parse(line).next().unwrap();
    assert!(
        result.is_err(),
        "missing closing bracket on jail should fail"
    );
}

#[test]
fn garbage_after_timestamp() {
    let line = "2024-01-01 00:00:00,000 not_fail2ban_header";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "garbage after timestamp should fail");
}

#[test]
fn partial_header() {
    let line = "2024-01-01 00:00:00,000 fail2ban.";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "partial header should fail");
}

#[test]
fn only_whitespace() {
    let line = "   ";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "whitespace-only line should fail");
}

#[test]
fn truncated_ip_parses_as_none() {
    let line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 192.168.";
    let result = parse(line).next().unwrap();
    let log = result.unwrap();
    assert!(log.ip().is_none(), "truncated IP should result in None");
}

#[test]
fn invalid_ip_parses_as_none() {
    let line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 999.999.999.999";
    let result = parse(line).next().unwrap();
    let log = result.unwrap();
    assert!(log.ip().is_none(), "invalid IP should result in None");
}

#[test]
fn syslog_truncated_month() {
    let line = "Ja";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "truncated syslog month should fail");
}

#[test]
fn invalid_month_abbreviation() {
    let line = "Xyz 1 2024 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "invalid month abbreviation should fail");
}

#[test]
fn negative_pid() {
    let line = "2024-01-01 00:00:00,000 fail2ban.filter [-1] INFO [sshd] Found 1.2.3.4";
    let result = parse(line).next().unwrap();
    assert!(result.is_err(), "negative pid should fail");
}

#[test]
fn batch_with_truncated_lines() {
    let input = "\
2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4
2024-01-01 00:00:01,000 fail2ban.filter
2024-01-01 00:00:02,000
2024-01-01
just some text
2024-01-01 00:00:05,000 fail2ban.actions [2] NOTICE [sshd] Ban 5.6.7.8";

    let results: Vec<_> = parse(input).collect();
    assert_eq!(results.len(), 6);

    assert!(results[0].is_ok(), "first complete line should parse");
    assert!(results[5].is_ok(), "last complete line should parse");

    for (i, result) in results[1..5].iter().enumerate() {
        assert!(result.is_err(), "truncated line {} should fail", i + 2);
    }

    assert_eq!(results[1].as_ref().unwrap_err().line_number, 2);
    assert_eq!(results[2].as_ref().unwrap_err().line_number, 3);
    assert_eq!(results[3].as_ref().unwrap_err().line_number, 4);
    assert_eq!(results[4].as_ref().unwrap_err().line_number, 5);
}
