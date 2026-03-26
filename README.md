# Fail2Ban log parser

> [!IMPORTANT]
> This library is still WIP.

General structure:

```text
2024-01-15 14:32:01,847  fail2ban.filter  [12345]  INFO  [sshd] Found 1.2.3.4
|___________________|    |______________|  |____|   |__|  |____| |__| |______|
    timestamp              header            pid    level  jail  event  IP address
```

## Benchmarks

Measured with [Criterion.rs](https://github.com/criterion-rs/criterion.rs) + [dhat](https://docs.rs/dhat) on Apple M4 Pro / 48 GB / rustc 1.94.0.

### Single-line parsing

| Variant | Time |
|---|---|
| ISO date + IPv4 | ~138 ns |
| Syslog date | ~145 ns |
| ISO 8601 (T-separator) | ~141 ns |
| IPv6 address | ~158 ns |

### Batch parsing (throughput)

| Lines | Time | Per line |
|---|---|---|
| 10 | ~1.57 µs | ~157 ns |
| 100 | ~16.4 µs | ~164 ns |
| 1,000 | ~165 µs | ~165 ns |
| 10,000 | ~1.66 ms | ~166 ns |
| 100,000 | ~16.7 ms | ~167 ns |
| 1,000,000 | ~167 ms | ~167 ns |

### Collection strategies (1,000 lines)

| Strategy | Time |
|---|---|
| Iterate + count | ~166 µs |
| Collect to Vec | ~171 µs |
| Partition ok/err | ~170 µs |

### Error handling

| Scenario | Time |
|---|---|
| 1,000 lines (50% invalid) | ~94 µs |
| All 8 event types (8 lines) | ~1.31 µs |

### Memory usage (collect to Vec)

| Lines | Total allocated | Peak in-use | Allocs | Per line |
|---|---|---|---|---|
| 1 | 260 B | 260 B | 2 | 260 B |
| 100 | 16.14 KB | 8.39 KB | 106 | 165 B |
| 1,000 | 131.66 KB | 67.91 KB | 1,009 | 134 B |
| 10,000 | 2.04 MB | 1.04 MB | 10,013 | 213 B |
| 100,000 | 16.38 MB | 8.38 MB | 100,016 | 171 B |
| 1,000,000 | 131.81 MB | 67.81 MB | 1,000,019 | 138 B |

To reproduce:

```sh
cargo bench -p fail2ban-log-parser-core --bench parsing
```
