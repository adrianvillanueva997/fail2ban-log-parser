"""Benchmarks for fail2ban-log-parser Python bindings."""

import json
import time
from pathlib import Path

from fail2ban_log_parser import parse

SINGLE_LINE = "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1"
SINGLE_LINE_IPV6 = "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 2001:db8::1"

_BATCH_LINES = [
    "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100",
    "2024-01-15 14:32:02,123 fail2ban.filter [12345] INFO [sshd] Found 10.0.0.5",
    "2024-01-15 14:32:03,456 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.100",
    "2024-01-15 14:32:04,789 fail2ban.actions [12345] INFO [sshd] Unban 10.0.0.5",
    "2024-01-15 14:32:05,000 fail2ban.server [12345] WARNING [sshd] Found 172.16.0.1",
    "2024-01-15 14:32:06,100 fail2ban.filter [12345] ERROR [sshd] Failed 8.8.8.8",
    "2024-01-15 14:32:07,200 fail2ban.filter [12345] DEBUG [sshd] Ignore 127.0.0.1",
    "2024-01-15 14:32:08,300 fail2ban.actions [12345] NOTICE [sshd] Restore 5.6.7.8",
]

_INVALID_LINES = [
    "invalid log line that cannot be parsed",
    "corrupted data here",
    "not a valid fail2ban entry",
]


def _generate_batch(n: int) -> str:
    return "\n".join(_BATCH_LINES[i % len(_BATCH_LINES)] for i in range(n))


def _generate_mixed_batch(n: int) -> str:
    lines = []
    for i in range(n):
        if i % 2 == 0:
            lines.append(_BATCH_LINES[i % len(_BATCH_LINES)])
        else:
            lines.append(_INVALID_LINES[i % len(_INVALID_LINES)])
    return "\n".join(lines)


def _bench(name: str, fn, *, iterations: int = 1000) -> dict:
    # Warmup
    for _ in range(min(100, iterations)):
        fn()

    times = []
    for _ in range(iterations):
        start = time.perf_counter_ns()
        fn()
        times.append(time.perf_counter_ns() - start)

    times.sort()
    median_ns = times[len(times) // 2]
    ops_per_sec = round(1_000_000_000 / median_ns) if median_ns > 0 else 0

    print(f"  {name}: {median_ns / 1000:.2f} µs ({ops_per_sec:,} ops/s)")
    return {"name": name, "value": ops_per_sec, "unit": "ops/s"}


def main():
    results: list[dict] = []

    # --- Single line ---
    print("\n📊 Single Line Parsing\n")
    results.append(
        _bench("py/single_line/default_timestamp_ipv4", lambda: parse(SINGLE_LINE))
    )
    results.append(
        _bench("py/single_line/ipv6_address", lambda: parse(SINGLE_LINE_IPV6))
    )

    # --- Batch parsing ---
    print("\n📊 Batch Parsing\n")
    for size in [10, 100, 1_000, 10_000, 100_000]:
        batch = _generate_batch(size)
        iters = max(10, 1000 // max(1, size // 100))
        results.append(
            _bench(f"py/batch/{size}_lines", lambda b=batch: parse(b), iterations=iters)
        )

    # --- Error handling ---
    print("\n📊 Error Handling (50% invalid)\n")
    for size in [100, 500, 1_000]:
        mixed = _generate_mixed_batch(size)
        iters = max(10, 1000 // max(1, size // 100))
        results.append(
            _bench(
                f"py/error_handling/50pct_invalid_{size}_lines",
                lambda m=mixed: parse(m),
                iterations=iters,
            )
        )

    # --- Throughput ---
    print("\n📊 Throughput Analysis\n")
    for size in [10_000, 100_000, 500_000]:
        batch = _generate_batch(size)
        start = time.perf_counter()
        logs, _ = parse(batch)
        elapsed_ms = (time.perf_counter() - start) * 1000
        throughput = round(len(logs) / elapsed_ms) if elapsed_ms > 0 else 0
        print(f"  {size:>7,} lines: {elapsed_ms:.2f} ms ({throughput:,} logs/ms)")
        results.append(
            {"name": f"py/throughput/{size // 1000}k_lines", "value": throughput, "unit": "logs/ms"}
        )

    # --- Write results ---
    output_path = Path(__file__).parent / "benchmark-results.json"
    output_path.write_text(json.dumps(results, indent=2))

    print(f"\n✅ Results written to {output_path}")


if __name__ == "__main__":
    main()
