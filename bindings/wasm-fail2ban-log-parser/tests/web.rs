//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use fail2ban_log_parser_wasm::{Fail2BanEvent, Fail2BanHeaderType, Fail2BanLevel, parse};
use wasm_bindgen_test::*;

#[wasm_bindgen_test]
fn parse_found_line() {
    let line = "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1";
    let result = parse(line.into());

    assert_eq!(result.logs().len(), 1);
    assert_eq!(result.errors().len(), 0);

    let log = &result.logs()[0];
    assert!(log.timestamp().is_some());
    assert_eq!(log.header(), Some(Fail2BanHeaderType::Filter));
    assert_eq!(log.pid(), Some(12345));
    assert_eq!(log.level(), Some(Fail2BanLevel::Info));
    assert_eq!(log.jail().as_deref(), Some("sshd"));
    assert_eq!(log.event(), Some(Fail2BanEvent::Found));
    assert_eq!(log.ip().as_deref(), Some("192.168.1.1"));
}

#[wasm_bindgen_test]
fn parse_ban_line() {
    let line = "2024-06-20 03:15:42,100 fail2ban.actions [999] NOTICE [sshd] Ban 10.0.0.5";
    let result = parse(line.into());

    assert_eq!(result.logs().len(), 1);

    let log = &result.logs()[0];
    assert_eq!(log.header(), Some(Fail2BanHeaderType::Actions));
    assert_eq!(log.pid(), Some(999));
    assert_eq!(log.level(), Some(Fail2BanLevel::Notice));
    assert_eq!(log.jail().as_deref(), Some("sshd"));
    assert_eq!(log.event(), Some(Fail2BanEvent::Ban));
    assert_eq!(log.ip().as_deref(), Some("10.0.0.5"));
}

#[wasm_bindgen_test]
fn parse_multiple_lines() {
    let input = "2024-01-15 14:32:01,847 fail2ban.filter [1] INFO [sshd] Found 192.168.1.1\n2024-01-15 14:32:02,100 fail2ban.actions [1] NOTICE [sshd] Ban 192.168.1.1";
    let result = parse(input.into());

    assert_eq!(result.logs().len(), 2);
    assert_eq!(result.errors().len(), 0);
    assert_eq!(result.logs()[0].event(), Some(Fail2BanEvent::Found));
    assert_eq!(result.logs()[1].event(), Some(Fail2BanEvent::Ban));
}

#[wasm_bindgen_test]
fn parse_error_line() {
    let line = "this is not a fail2ban log line";
    let result = parse(line.into());

    assert_eq!(result.logs().len(), 0);
    assert_eq!(result.errors().len(), 1);

    let error = &result.errors()[0];
    assert_eq!(error.line_number(), 1);
    assert_eq!(error.line().as_str(), line);
}

#[wasm_bindgen_test]
fn parse_mixed_lines() {
    let input = "2024-01-15 14:32:01,847 fail2ban.filter [1] INFO [sshd] Found 192.168.1.1\ninvalid line\n2024-01-15 14:32:02,100 fail2ban.actions [1] NOTICE [sshd] Ban 192.168.1.1";
    let result = parse(input.into());

    assert_eq!(result.logs().len(), 2);
    assert_eq!(result.errors().len(), 1);
    assert_eq!(result.errors()[0].line_number(), 2);
}

#[wasm_bindgen_test]
fn parse_unban_line() {
    let line = "2024-06-20 03:15:42,100 fail2ban.actions [1] NOTICE [sshd] UnBan 10.0.0.5";
    let result = parse(line.into());

    assert_eq!(result.logs().len(), 1);
    assert_eq!(result.logs()[0].event(), Some(Fail2BanEvent::Unban));
}

#[wasm_bindgen_test]
fn parse_error_level() {
    let line = "2024-06-20 03:15:42,100 fail2ban.filter [1] ERROR [sshd] Restore 10.0.0.5";
    let result = parse(line.into());

    assert_eq!(result.logs().len(), 1);
    assert_eq!(result.logs()[0].level(), Some(Fail2BanLevel::Error));
}

#[wasm_bindgen_test]
fn parse_server_header() {
    let line = "2024-06-20 03:15:42,100 fail2ban.server [1] INFO [sshd] Found 10.0.0.1";
    let result = parse(line.into());

    assert_eq!(result.logs().len(), 1);
    assert_eq!(result.logs()[0].header(), Some(Fail2BanHeaderType::Server));
}

#[wasm_bindgen_test]
fn parse_ipv6() {
    let line = "2024-01-15 14:32:01,847 fail2ban.filter [1] INFO [sshd] Found 2001:db8::1";
    let result = parse(line.into());

    assert_eq!(result.logs().len(), 1);
    assert_eq!(result.logs()[0].ip().as_deref(), Some("2001:db8::1"));
}
