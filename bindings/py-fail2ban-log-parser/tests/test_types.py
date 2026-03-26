"""Tests for Python object repr and attribute access."""

from fail2ban_log_parser import parse, parse_with_errors


def test_log_repr():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4"
    log = parse(line)[0]
    r = repr(log)
    assert "Fail2BanLog" in r
    assert "found" in r
    assert "1.2.3.4" in r
    assert "sshd" in r
    assert "info" in r


def test_error_repr():
    _, errors = parse_with_errors("bad line")
    r = repr(errors[0])
    assert "ParseError" in r
    assert "1" in r  # line_number
    assert "bad line" in r


def test_log_attributes_are_readonly():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4"
    log = parse(line)[0]
    try:
        log.event = "ban"
        assert False, "should have raised AttributeError"
    except AttributeError:
        pass


def test_log_all_fields_present():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4"
    log = parse(line)[0]
    assert hasattr(log, "timestamp")
    assert hasattr(log, "header")
    assert hasattr(log, "pid")
    assert hasattr(log, "level")
    assert hasattr(log, "jail")
    assert hasattr(log, "event")
    assert hasattr(log, "ip")


def test_error_all_fields_present():
    _, errors = parse_with_errors("bad line")
    err = errors[0]
    assert hasattr(err, "line_number")
    assert hasattr(err, "line")


def test_parse_returns_list():
    logs = parse("")
    assert isinstance(logs, list)


def test_parse_with_errors_returns_tuple_of_lists():
    logs, errors = parse_with_errors("")
    assert isinstance(logs, list)
    assert isinstance(errors, list)
