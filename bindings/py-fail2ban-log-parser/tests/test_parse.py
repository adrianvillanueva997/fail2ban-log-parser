"""Tests for fail2ban_log_parser.parse() function."""

from fail2ban_log_parser import Event, HeaderType, Level, parse


def test_parse_standard_found_line():
    line = (
        "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1"
    )
    logs, _ = parse(line)
    assert len(logs) == 1
    log = logs[0]
    assert log.timestamp is not None
    assert log.header == HeaderType.Filter
    assert log.pid == 12345
    assert log.level == Level.Info
    assert log.jail == "sshd"
    assert log.event == Event.Found
    assert log.ip == "192.168.1.1"


def test_parse_ban_line():
    line = "2024-06-20 03:15:42,100 fail2ban.actions [999] NOTICE [sshd] Ban 10.0.0.5"
    logs, _ = parse(line)
    assert len(logs) == 1
    log = logs[0]
    assert log.header == HeaderType.Actions
    assert log.pid == 999
    assert log.level == Level.Notice
    assert log.jail == "sshd"
    assert log.event == Event.Ban
    assert log.ip == "10.0.0.5"


def test_parse_unban_line():
    line = "2024-01-01 00:00:02,000 fail2ban.actions [3] INFO [sshd] Unban 5.6.7.8"
    logs, _ = parse(line)
    assert len(logs) == 1
    assert logs[0].event == Event.Unban
    assert logs[0].ip == "5.6.7.8"


def test_parse_restore_line():
    line = "2024-01-01 00:00:00,000 fail2ban.actions [1] NOTICE [sshd] Restore Ban 10.0.0.1"
    logs, _ = parse(line)
    assert len(logs) == 1
    assert logs[0].event == Event.Restore


def test_parse_already_banned_line():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] NOTICE [sshd] AlreadyBanned 1.2.3.4"
    logs, _ = parse(line)
    assert len(logs) == 1
    assert logs[0].event == Event.AlreadyBanned


def test_parse_ignore_line():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Ignore 127.0.0.1"
    logs, _ = parse(line)
    assert len(logs) == 1
    assert logs[0].event == Event.Ignore
    assert logs[0].ip == "127.0.0.1"


def test_parse_server_header():
    line = "2024-01-01 00:00:00,000 fail2ban.server [1] INFO [sshd] Ban 1.2.3.4"
    logs, _ = parse(line)
    assert len(logs) == 1
    assert logs[0].header == HeaderType.Server


def test_parse_multiple_lines():
    input_text = (
        "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4\n"
        "2024-01-01 00:00:01,000 fail2ban.actions [2] NOTICE [sshd] Ban 5.6.7.8\n"
        "2024-01-01 00:00:02,000 fail2ban.actions [3] INFO [sshd] Unban 5.6.7.8"
    )
    logs, _ = parse(input_text)
    assert len(logs) == 3
    assert logs[0].event == Event.Found
    assert logs[1].event == Event.Ban
    assert logs[2].event == Event.Unban
    assert logs[0].ip == "1.2.3.4"
    assert logs[1].ip == "5.6.7.8"
    assert logs[2].ip == "5.6.7.8"


def test_parse_empty_input():
    logs, errors = parse("")
    assert len(logs) == 0
    assert len(errors) == 0


def test_parse_returns_errors_for_invalid_lines():
    input_text = (
        "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4\n"
        "garbage line here\n"
        "2024-01-01 00:00:02,000 fail2ban.actions [3] INFO [sshd] Unban 5.6.7.8"
    )
    logs, errors = parse(input_text)
    assert len(logs) == 2
    assert logs[0].event == Event.Found
    assert logs[1].event == Event.Unban
    assert len(errors) == 1
    assert errors[0].line_number == 2
    assert errors[0].line == "garbage line here"


def test_parse_realistic_log_batch():
    input_text = (
        "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100\n"
        "2024-01-15 14:32:02,123 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100\n"
        "2024-01-15 14:32:03,456 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100\n"
        "2024-01-15 14:32:04,789 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.100\n"
        "2024-01-15 14:42:04,789 fail2ban.actions [12345] NOTICE [sshd] Unban 192.168.1.100"
    )
    logs, _ = parse(input_text)
    assert len(logs) == 5
    for log in logs[:3]:
        assert log.event == Event.Found
        assert log.ip == "192.168.1.100"
    assert logs[3].event == Event.Ban
    assert logs[3].level == Level.Notice
    assert logs[4].event == Event.Unban


def test_parse_dot_milliseconds():
    line = "2024-01-01 14:32:01.847 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4"
    logs, _ = parse(line)
    assert len(logs) == 1
    assert logs[0].timestamp is not None


def test_parse_all_levels():
    template = "2024-01-01 00:00:00,000 fail2ban.filter [1] {} [sshd] Found 1.2.3.4"
    for level_input, level_output in [
        ("INFO", Level.Info),
        ("NOTICE", Level.Notice),
        ("WARNING", Level.Warning),
        ("ERROR", Level.Error),
        ("DEBUG", Level.Debug),
    ]:
        logs, _ = parse(template.format(level_input))
        assert len(logs) == 1, f"failed for level {level_input}"
        assert logs[0].level == level_output, (
            f"expected {level_output}, got {logs[0].level}"
        )


def test_parse_all_headers():
    template = "2024-01-01 00:00:00,000 fail2ban.{} [1] INFO [sshd] Found 1.2.3.4"
    for header_input, header_output in [
        ("filter", HeaderType.Filter),
        ("actions", HeaderType.Actions),
        ("server", HeaderType.Server),
    ]:
        logs, _ = parse(template.format(header_input))
        assert len(logs) == 1, f"failed for header {header_input}"
        assert logs[0].header == header_output


def test_parse_ipv6():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found ::1"
    logs, _ = parse(line)
    assert len(logs) == 1
    assert logs[0].ip == "::1"


def test_parse_syslog_format():
    line = (
        "Jan 15 2024 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1"
    )
    logs, _ = parse(line)
    assert len(logs) == 1
    assert logs[0].event == Event.Found
    assert logs[0].ip == "192.168.1.1"


def test_parse_syslog_all_months():
    months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    for month in months:
        line = (
            f"{month} 1 2024 12:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4"
        )
        logs, _ = parse(line)
        assert len(logs) == 1, f"failed for month {month}"


def test_parse_with_extra_whitespace():
    line = "2024-01-01 00:00:00,000  fail2ban.filter  [1]  INFO  [sshd]  Found  1.2.3.4"
    logs, _ = parse(line)
    assert len(logs) == 1
    assert logs[0].event == Event.Found
    assert logs[0].ip == "1.2.3.4"


def test_parse_max_pid():
    line = (
        "2024-01-01 00:00:00,000 fail2ban.filter [4294967295] INFO [sshd] Found 1.2.3.4"
    )
    logs, _ = parse(line)
    assert len(logs) == 1
    assert logs[0].pid == 4294967295


def test_parse_leap_day():
    line = "2024-02-29 12:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4"
    logs, _ = parse(line)
    assert len(logs) == 1
    assert logs[0].timestamp is not None
