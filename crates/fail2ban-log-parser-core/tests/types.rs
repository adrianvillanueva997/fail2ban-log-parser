use fail2ban_log_parser_core::{
    Fail2BanEvent, Fail2BanHeaderType, Fail2BanLevel, Fail2BanStructuredLog, parse,
};

#[test]
fn display_fail2ban_event() {
    assert_eq!(format!("{}", Fail2BanEvent::Found), "Found");
    assert_eq!(format!("{}", Fail2BanEvent::Ban), "Ban");
    assert_eq!(format!("{}", Fail2BanEvent::Unban), "Unban");
    assert_eq!(format!("{}", Fail2BanEvent::Restore), "Restore");
    assert_eq!(format!("{}", Fail2BanEvent::Ignore), "Ignore");
    assert_eq!(format!("{}", Fail2BanEvent::AlreadyBanned), "AlreadyBanned");
    assert_eq!(format!("{}", Fail2BanEvent::Failed), "Failed");
    assert_eq!(format!("{}", Fail2BanEvent::Unknown), "Unknown");
}

#[test]
fn display_fail2ban_header_type() {
    assert_eq!(format!("{}", Fail2BanHeaderType::Filter), "Filter");
    assert_eq!(format!("{}", Fail2BanHeaderType::Actions), "Actions");
    assert_eq!(format!("{}", Fail2BanHeaderType::Server), "Server");
}

#[test]
fn display_fail2ban_level() {
    assert_eq!(format!("{}", Fail2BanLevel::Info), "Info");
    assert_eq!(format!("{}", Fail2BanLevel::Notice), "Notice");
    assert_eq!(format!("{}", Fail2BanLevel::Warning), "Warning");
    assert_eq!(format!("{}", Fail2BanLevel::Error), "Error");
    assert_eq!(format!("{}", Fail2BanLevel::Debug), "Debug");
}

#[test]
fn structured_log_default_is_all_none() {
    let log = Fail2BanStructuredLog::default();
    assert!(log.timestamp().is_none());
    assert!(log.header().is_none());
    assert!(log.pid().is_none());
    assert!(log.level().is_none());
    assert!(log.jail().is_none());
    assert!(log.event().is_none());
    assert!(log.ip().is_none());
}

#[test]
fn structured_log_clone_and_eq() {
    let line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4";
    let log = parse(line).next().unwrap().unwrap();
    let cloned = log.clone();
    assert_eq!(log, cloned);
}

#[test]
fn parse_error_clone_debug_display() {
    let err = parse("bad").next().unwrap().unwrap_err();

    // Display
    let msg = format!("{}", err);
    assert!(msg.contains("failed to parse line 1"));
    assert!(msg.contains("bad"));

    // Clone + field equality
    let cloned = err.clone();
    assert_eq!(err.line_number, cloned.line_number);
    assert_eq!(err.line, cloned.line);

    // Debug
    let debug = format!("{:?}", err);
    assert!(debug.contains("ParseError"));

    // std::error::Error
    let _: &dyn std::error::Error = &err;
}
