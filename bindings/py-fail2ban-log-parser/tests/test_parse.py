"""Tests for fail2ban_log_parser.parse() function."""

from fail2ban_log_parser import parse


def test_parse_standard_found_line():
    line = (
        "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1"
    )
    logs = parse(line)
    assert len(logs) == 1
    log = logs[0]
    assert log.timestamp is not None
    assert log.header == "filter"
    assert log.pid == 12345
    assert log.level == "info"
    assert log.jail == "sshd"
    assert log.event == "found"
    assert log.ip == "192.168.1.1"


def test_parse_ban_line():
    line = "2024-06-20 03:15:42,100 fail2ban.actions [999] NOTICE [sshd] Ban 10.0.0.5"
    logs = parse(line)
    assert len(logs) == 1
    log = logs[0]
    assert log.header == "actions"
    assert log.pid == 999
    assert log.level == "notice"
    assert log.jail == "sshd"
    assert log.event == "ban"
    assert log.ip == "10.0.0.5"


def test_parse_unban_line():
    line = "2024-01-01 00:00:02,000 fail2ban.actions [3] INFO [sshd] Unban 5.6.7.8"
    logs = parse(line)
    assert len(logs) == 1
    assert logs[0].event == "unban"
    assert logs[0].ip == "5.6.7.8"


def test_parse_restore_line():
    line = "2024-01-01 00:00:00,000 fail2ban.actions [1] NOTICE [sshd] Restore Ban 10.0.0.1"
    logs = parse(line)
    assert len(logs) == 1
    assert logs[0].event == "restore"


def test_parse_already_banned_line():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] NOTICE [sshd] Already banned 1.2.3.4"
    logs = parse(line)
    assert len(logs) == 1
    assert logs[0].event == "already_banned"


def test_parse_ignore_line():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Ignore 127.0.0.1"
    logs = parse(line)
    assert len(logs) == 1
    assert logs[0].event == "ignore"
    assert logs[0].ip == "127.0.0.1"


def test_parse_server_header():
    line = "2024-01-01 00:00:00,000 fail2ban.server [1] INFO [sshd] Ban 1.2.3.4"
    logs = parse(line)
    assert len(logs) == 1
    assert logs[0].header == "server"


def test_parse_multiple_lines():
    input_text = (
        "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4\n"
        "2024-01-01 00:00:01,000 fail2ban.actions [2] NOTICE [sshd] Ban 5.6.7.8\n"
        "2024-01-01 00:00:02,000 fail2ban.actions [3] INFO [sshd] Unban 5.6.7.8"
    )
    logs = parse(input_text)
    assert len(logs) == 3
    assert logs[0].event == "found"
    assert logs[1].event == "ban"
    assert logs[2].event == "unban"
    assert logs[0].ip == "1.2.3.4"
    assert logs[1].ip == "5.6.7.8"
    assert logs[2].ip == "5.6.7.8"


def test_parse_empty_input():
    logs = parse("")
    assert len(logs) == 0


def test_parse_skips_invalid_lines():
    """parse() silently skips invalid lines (use parse_with_errors to get them)."""
    input_text = (
        "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4\n"
        "garbage line here\n"
        "2024-01-01 00:00:02,000 fail2ban.actions [3] INFO [sshd] Unban 5.6.7.8"
    )
    logs = parse(input_text)
    assert len(logs) == 2
    assert logs[0].event == "found"
    assert logs[1].event == "unban"


def test_parse_realistic_log_batch():
    input_text = (
        "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100\n"
        "2024-01-15 14:32:02,123 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100\n"
        "2024-01-15 14:32:03,456 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100\n"
        "2024-01-15 14:32:04,789 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.100\n"
        "2024-01-15 14:42:04,789 fail2ban.actions [12345] NOTICE [sshd] Unban 192.168.1.100"
    )
    logs = parse(input_text)
    assert len(logs) == 5
    for log in logs[:3]:
        assert log.event == "found"
        assert log.ip == "192.168.1.100"
    assert logs[3].event == "ban"
    assert logs[3].level == "notice"
    assert logs[4].event == "unban"


def test_parse_dot_milliseconds():
    line = "2024-01-01 14:32:01.847 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4"
    logs = parse(line)
    assert len(logs) == 1
    assert logs[0].timestamp is not None


def test_parse_all_levels():
    template = "2024-01-01 00:00:00,000 fail2ban.filter [1] {} [sshd] Found 1.2.3.4"
    for level_input, level_output in [
        ("INFO", "info"),
        ("NOTICE", "notice"),
        ("WARNING", "warning"),
        ("ERROR", "error"),
        ("DEBUG", "debug"),
    ]:
        logs = parse(template.format(level_input))
        assert len(logs) == 1, f"failed for level {level_input}"
        assert logs[0].level == level_output, (
            f"expected {level_output}, got {logs[0].level}"
        )


def test_parse_all_headers():
    template = "2024-01-01 00:00:00,000 fail2ban.{} [1] INFO [sshd] Found 1.2.3.4"
    for header_input, header_output in [
        ("filter", "filter"),
        ("actions", "actions"),
        ("server", "server"),
    ]:
        logs = parse(template.format(header_input))
        assert len(logs) == 1, f"failed for header {header_input}"
        assert logs[0].header == header_output


def test_parse_ipv6():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found ::1"
    logs = parse(line)
    assert len(logs) == 1
    assert logs[0].ip == "::1"


def test_parse_syslog_format():
    line = (
        "Jan 15 2024 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1"
    )
    logs = parse(line)
    assert len(logs) == 1
    assert logs[0].event == "found"
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
        logs = parse(line)
        assert len(logs) == 1, f"failed for month {month}"


def test_parse_with_extra_whitespace():
    line = "2024-01-01 00:00:00,000  fail2ban.filter  [1]  INFO  [sshd]  Found  1.2.3.4"
    logs = parse(line)
    assert len(logs) == 1
    assert logs[0].event == "found"
    assert logs[0].ip == "1.2.3.4"


def test_parse_max_pid():
    line = (
        "2024-01-01 00:00:00,000 fail2ban.filter [4294967295] INFO [sshd] Found 1.2.3.4"
    )
    logs = parse(line)
    assert len(logs) == 1
    assert logs[0].pid == 4294967295


def test_parse_leap_day():
    line = "2024-02-29 12:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4"
    logs = parse(line)
    assert len(logs) == 1
    assert logs[0].timestamp is not None
