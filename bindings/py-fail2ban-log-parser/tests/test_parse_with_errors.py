"""Tests for fail2ban_log_parser.parse_with_errors() function."""

from fail2ban_log_parser import parse_with_errors


def test_parse_with_errors_all_valid():
    input_text = (
        "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4\n"
        "2024-01-01 00:00:01,000 fail2ban.actions [2] NOTICE [sshd] Ban 5.6.7.8"
    )
    logs, errors = parse_with_errors(input_text)
    assert len(logs) == 2
    assert len(errors) == 0


def test_parse_with_errors_all_invalid():
    input_text = "garbage line\nanother bad line"
    logs, errors = parse_with_errors(input_text)
    assert len(logs) == 0
    assert len(errors) == 2


def test_parse_with_errors_mixed():
    input_text = (
        "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4\n"
        "garbage line here\n"
        "2024-01-01 00:00:02,000 fail2ban.actions [3] INFO [sshd] Unban 5.6.7.8"
    )
    logs, errors = parse_with_errors(input_text)
    assert len(logs) == 2
    assert len(errors) == 1
    assert logs[0].event == "found"
    assert logs[1].event == "unban"


def test_parse_with_errors_error_has_line_number():
    input_text = "bad line\n2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4"
    logs, errors = parse_with_errors(input_text)
    assert len(logs) == 1
    assert len(errors) == 1
    assert errors[0].line_number == 1
    assert errors[0].line == "bad line"


def test_parse_with_errors_multiple_errors_line_numbers():
    input_text = (
        "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4\n"
        "2024-01-01 00:00:01,000 fail2ban.filter\n"
        "2024-01-01 00:00:02,000\n"
        "2024-01-01\n"
        "just some text\n"
        "2024-01-01 00:00:05,000 fail2ban.actions [2] NOTICE [sshd] Ban 5.6.7.8"
    )
    logs, errors = parse_with_errors(input_text)
    assert len(logs) == 2
    assert len(errors) == 4
    assert errors[0].line_number == 2
    assert errors[1].line_number == 3
    assert errors[2].line_number == 4
    assert errors[3].line_number == 5


def test_parse_with_errors_empty_input():
    logs, errors = parse_with_errors("")
    assert len(logs) == 0
    assert len(errors) == 0


def test_parse_with_errors_incomplete_lines():
    """Test various incomplete log lines that should produce errors."""
    incomplete_lines = [
        "2024-01-01 00:00:00,000",
        "2024-01-01 00:00:00,000 fail2ban.filter",
        "2024-01-01 00:00:00,000 fail2ban.filter [12345]",
        "2024-01-01 00:00:00,000 fail2ban.filter [12345] INFO",
        "2024-01-01 00:00:00,000 fail2ban.filter [12345] INFO [sshd]",
        "2024-01-01 00:00:00,000 fail2ban.filter [12345] INFO [sshd] Found",
    ]
    for line in incomplete_lines:
        logs, errors = parse_with_errors(line)
        assert len(errors) >= 1, f"expected error for: {line}"


def test_parse_with_errors_truncated_ip():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 192.168."
    logs, errors = parse_with_errors(line)
    # The line parses but ip will be None
    assert len(logs) == 1
    assert logs[0].ip is None


def test_parse_with_errors_invalid_ip():
    line = (
        "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 999.999.999.999"
    )
    logs, errors = parse_with_errors(line)
    assert len(logs) == 1
    assert logs[0].ip is None
