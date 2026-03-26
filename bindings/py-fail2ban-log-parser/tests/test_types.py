"""Tests for Python object repr and attribute access."""

from fail2ban_log_parser import Event, HeaderType, Level, parse


def test_log_repr():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4"
    logs, _ = parse(line)
    log = logs[0]
    r = repr(log)
    assert "Fail2BanLog" in r
    assert "Found" in r
    assert "1.2.3.4" in r
    assert "sshd" in r
    assert "Info" in r


def test_error_repr():
    _, errors = parse("bad line")
    r = repr(errors[0])
    assert "ParseError" in r
    assert "1" in r  # line_number
    assert "bad line" in r


def test_log_attributes_are_readonly():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4"
    logs, _ = parse(line)
    log = logs[0]
    try:
        log.event = Event.Ban
        assert False, "should have raised AttributeError"
    except AttributeError:
        pass


def test_log_all_fields_present():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4"
    logs, _ = parse(line)
    log = logs[0]
    assert hasattr(log, "timestamp")
    assert hasattr(log, "header")
    assert hasattr(log, "pid")
    assert hasattr(log, "level")
    assert hasattr(log, "jail")
    assert hasattr(log, "event")
    assert hasattr(log, "ip")


def test_error_all_fields_present():
    _, errors = parse("bad line")
    err = errors[0]
    assert hasattr(err, "line_number")
    assert hasattr(err, "line")


def test_parse_returns_tuple_of_lists():
    logs, errors = parse("")
    assert isinstance(logs, list)
    assert isinstance(errors, list)


def test_enum_types():
    line = "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4"
    logs, _ = parse(line)
    log = logs[0]
    assert isinstance(log.header, HeaderType)
    assert isinstance(log.level, Level)
    assert isinstance(log.event, Event)


def test_enum_equality():
    assert HeaderType.Filter == HeaderType.Filter
    assert HeaderType.Filter != HeaderType.Actions
    assert Level.Info == Level.Info
    assert Level.Info != Level.Warning
    assert Event.Found == Event.Found
    assert Event.Found != Event.Ban


def test_enum_hashable():
    """Enums can be used as dict keys and in sets."""
    d = {Event.Ban: "banned", Event.Unban: "unbanned"}
    assert d[Event.Ban] == "banned"
    s = {Level.Info, Level.Warning}
    assert Level.Info in s
