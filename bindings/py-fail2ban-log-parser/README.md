# fail2ban-log-parser

[![PyPI](https://img.shields.io/pypi/v/fail2ban-log-parser)](https://pypi.org/project/fail2ban-log-parser/)
[![PyPI - Python Version](https://img.shields.io/pypi/pyversions/fail2ban-log-parser)](https://pypi.org/project/fail2ban-log-parser/)
[![License](https://img.shields.io/pypi/l/fail2ban-log-parser)](https://github.com/adrianvillanueva997/fail2ban-log-parser/blob/main/LICENSE)

Python bindings for [fail2ban-log-parser-core](https://crates.io/crates/fail2ban-log-parser-core) a fast, zero-copy fail2ban log parser written in Rust.

Parses fail2ban log lines into structured Python objects with full support for IPv4, IPv6, and multiple timestamp formats. The core parsing is done in Rust via PyO3; string fields are owned at the FFI boundary so there are no lifetime constraints on the Python side.

## Installation

```sh
pip install fail2ban-log-parser
```

Requires Python 3.10+. Prebuilt wheels are available for:

| Platform | Architectures |
|---|---|
| Linux | x86_64, aarch64 |
| macOS | x86_64, aarch64 |
| Windows | x86_64 |

## Quickstart

```python
from fail2ban_log_parser import parse, Event

logs, errors = parse(open("/var/log/fail2ban.log").read())

for log in logs:
    print(log.event, log.ip, log.jail, log.timestamp)

for err in errors:
    print(f"Line {err.line_number}: {err.line}")
```

## Usage

### Parse a single line

```python
from fail2ban_log_parser import parse

line = "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1"
logs, errors = parse(line)

log = logs[0]
print(log.timestamp)  # "2024-01-15T14:32:01.847+00:00"
print(log.jail)       # "sshd"
print(log.event)      # Event.Found
print(log.ip)         # "192.168.1.1"
print(log.pid)        # 12345
print(log.level)      # Level.Info
print(log.header)     # HeaderType.Filter
```

### Handle parse errors

```python
from fail2ban_log_parser import parse

input_text = """\
2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100
this line is not a valid log entry
2024-01-15 14:32:03,456 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.100"""

logs, errors = parse(input_text)

for log in logs:
    print(f"{log.event} {log.ip} in jail {log.jail}")

for err in errors:
    print(f"Line {err.line_number}: {err.line}")
```

### Filter by event type

```python
from fail2ban_log_parser import parse, Event

logs, _ = parse(open("/var/log/fail2ban.log").read())

bans    = [log for log in logs if log.event == Event.Ban]
unbans  = [log for log in logs if log.event == Event.Unban]
ignores = [log for log in logs if log.event == Event.Ignore]
```

### Group by jail

```python
from collections import defaultdict
from fail2ban_log_parser import parse

logs, _ = parse(open("/var/log/fail2ban.log").read())

by_jail = defaultdict(list)
for log in logs:
    if log.jail:
        by_jail[log.jail].append(log)

for jail, entries in by_jail.items():
    print(f"{jail}: {len(entries)} events")
```

### Count bans per IP

```python
from collections import Counter
from fail2ban_log_parser import parse, Event

logs, _ = parse(open("/var/log/fail2ban.log").read())

ban_counts = Counter(
    log.ip for log in logs
    if log.event == Event.Ban and log.ip
)

for ip, count in ban_counts.most_common(10):
    print(f"{ip}: {count} bans")
```

## API Reference

### `parse(input: str) -> tuple[list[Fail2BanLog], list[ParseError]]`

Parses one or more fail2ban log lines. Returns a tuple of successfully parsed logs and parse errors. Lines that fail to parse are collected into `errors` rather than raising an exception, so a single bad line never aborts processing of a batch.

---

### `Fail2BanLog`

A parsed log line. All fields are read-only properties and may be `None` if the field was absent or unparseable in the original line.

| Property | Type | Description |
|---|---|---|
| `timestamp` | `Optional[str]` | RFC 3339 timestamp (e.g. `"2024-01-15T14:32:01.847+00:00"`) |
| `header` | `Optional[HeaderType]` | Log source (`Filter`, `Actions`, `Server`) |
| `pid` | `Optional[int]` | Process ID |
| `level` | `Optional[Level]` | Log level |
| `jail` | `Optional[str]` | Jail name (e.g. `"sshd"`) |
| `event` | `Optional[Event]` | Event type |
| `ip` | `Optional[str]` | IP address string (IPv4 or IPv6) |

---

### `ParseError`

Represents a line that could not be parsed.

| Property | Type | Description |
|---|---|---|
| `line_number` | `int` | 1-based line number in the input |
| `line` | `str` | The raw line that failed to parse |

---

### `Event`

```python
class Event(Enum):
    Found
    Ban
    Unban
    Restore
    Ignore
    AlreadyBanned
    Failed
    Unknown
```

### `Level`

```python
class Level(Enum):
    Info
    Notice
    Warning
    Error
    Debug
```

### `HeaderType`

```python
class HeaderType(Enum):
    Filter
    Actions
    Server
```

## Supported log formats

| Field | Formats |
|---|---|
| Timestamp | `2024-01-15 14:32:01,847`, `Jan 15 2024 14:32:01,847`, `2024-01-15T14:32:01,847Z`, `±HH:MM` offset |
| Header | `fail2ban.filter`, `fail2ban.actions`, `fail2ban.server` |
| Level | `INFO`, `NOTICE`, `WARNING`, `ERROR`, `DEBUG` (case-insensitive) |
| Event | `Found`, `Ban`, `Unban`, `Restore`, `Ignore`, `AlreadyBanned`, `Failed`, `Unknown` |
| IP | IPv4 (`192.168.1.1`) and IPv6 (`2001:db8::1`) |

## Related

- [fail2ban-log-parser-core](https://crates.io/crates/fail2ban-log-parser-core) the underlying Rust crate
- [Source code](https://github.com/adrianvillanueva997/fail2ban-log-parser)
- [Benchmark history](https://adrianvillanueva997.github.io/fail2ban-log-parser/)

## License

Apache-2.0
