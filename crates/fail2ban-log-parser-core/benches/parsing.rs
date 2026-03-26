use std::hint::black_box;

use criterion::{BenchmarkId, Criterion, criterion_group, criterion_main};
use fail2ban_log_parser_core::parse;

#[global_allocator]
static ALLOC: dhat::Alloc = dhat::Alloc;

fn fmt_bytes(b: u64) -> String {
    if b >= 1_048_576 {
        format!("{:.2} MB", b as f64 / 1_048_576.0)
    } else if b >= 1024 {
        format!("{:.2} KB", b as f64 / 1024.0)
    } else {
        format!("{b} B")
    }
}

const SINGLE_LINE: &str =
    "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1";

const SINGLE_LINE_SYSLOG: &str =
    "Jan 15 2024 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1";

const SINGLE_LINE_ISO8601: &str =
    "2024-01-15T14:32:01,847Z fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1";

const SINGLE_LINE_IPV6: &str =
    "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 2001:db8::1";

fn generate_log_batch(n: usize) -> String {
    let lines = [
        "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100",
        "2024-01-15 14:32:02,123 fail2ban.filter [12345] INFO [sshd] Found 10.0.0.5",
        "2024-01-15 14:32:03,456 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.100",
        "2024-01-15 14:32:04,789 fail2ban.actions [12345] INFO [sshd] Unban 10.0.0.5",
        "2024-01-15 14:32:05,000 fail2ban.server [12345] WARNING [sshd] Found 172.16.0.1",
        "2024-01-15 14:32:06,100 fail2ban.filter [12345] ERROR [sshd] Failed 8.8.8.8",
        "2024-01-15 14:32:07,200 fail2ban.filter [12345] DEBUG [sshd] Ignore 127.0.0.1",
        "2024-01-15 14:32:08,300 fail2ban.actions [12345] NOTICE [sshd] Restore 5.6.7.8",
    ];
    let mut out = String::with_capacity(n * 90);
    for i in 0..n {
        if i > 0 {
            out.push('\n');
        }
        out.push_str(lines[i % lines.len()]);
    }
    out
}

fn bench_single_line(c: &mut Criterion) {
    let mut group = c.benchmark_group("single_line");

    group.bench_function("iso_date_ipv4", |b| {
        b.iter(|| {
            let result = parse(black_box(SINGLE_LINE)).next().unwrap();
            black_box(result).unwrap();
        });
    });

    group.bench_function("syslog_date", |b| {
        b.iter(|| {
            let result = parse(black_box(SINGLE_LINE_SYSLOG)).next().unwrap();
            black_box(result).unwrap();
        });
    });

    group.bench_function("iso8601_timestamp", |b| {
        b.iter(|| {
            let result = parse(black_box(SINGLE_LINE_ISO8601)).next().unwrap();
            black_box(result).unwrap();
        });
    });

    group.bench_function("ipv6", |b| {
        b.iter(|| {
            let result = parse(black_box(SINGLE_LINE_IPV6)).next().unwrap();
            black_box(result).unwrap();
        });
    });

    group.finish();
}

fn bench_batch_parsing(c: &mut Criterion) {
    let mut group = c.benchmark_group("batch_parsing");

    for size in [10, 100, 1_000, 10_000, 100_000, 1_000_000] {
        let input = generate_log_batch(size);
        if size >= 100_000 {
            group.sample_size(10);
        }
        group.bench_with_input(BenchmarkId::new("lines", size), &input, |b, input| {
            b.iter(|| {
                let count = parse(black_box(input)).filter(|r| r.is_ok()).count();
                black_box(count);
            });
        });
    }

    group.finish();
}

fn bench_collect_vs_iterate(c: &mut Criterion) {
    let input = generate_log_batch(1_000);
    let mut group = c.benchmark_group("collect_vs_iterate");

    group.bench_function("iterate_count", |b| {
        b.iter(|| {
            let count = parse(black_box(&input)).filter(|r| r.is_ok()).count();
            black_box(count);
        });
    });

    group.bench_function("collect_vec", |b| {
        b.iter(|| {
            let logs: Vec<_> = parse(black_box(&input)).filter_map(|r| r.ok()).collect();
            black_box(logs);
        });
    });

    group.bench_function("partition_ok_err", |b| {
        b.iter(|| {
            let (ok, err): (Vec<_>, Vec<_>) = parse(black_box(&input)).partition(Result::is_ok);
            black_box((ok, err));
        });
    });

    group.finish();
}

fn bench_error_handling(c: &mut Criterion) {
    // 50% invalid lines
    let mut input = String::new();
    for i in 0..1_000 {
        if i > 0 {
            input.push('\n');
        }
        if i % 2 == 0 {
            input.push_str(
                "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 1.2.3.4",
            );
        } else {
            input.push_str("this is an invalid log line that should fail to parse");
        }
    }

    c.bench_function("mixed_valid_invalid_1000", |b| {
        b.iter(|| {
            let results: Vec<_> = parse(black_box(&input)).collect();
            black_box(results);
        });
    });
}

fn bench_all_events(c: &mut Criterion) {
    let events = [
        "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4",
        "2024-01-01 00:00:00,000 fail2ban.actions [1] INFO [sshd] Ban 1.2.3.4",
        "2024-01-01 00:00:00,000 fail2ban.actions [1] INFO [sshd] Unban 1.2.3.4",
        "2024-01-01 00:00:00,000 fail2ban.actions [1] INFO [sshd] Restore 1.2.3.4",
        "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Ignore 1.2.3.4",
        "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] AlreadyBanned 1.2.3.4",
        "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Failed 1.2.3.4",
        "2024-01-01 00:00:00,000 fail2ban.filter [1] INFO [sshd] Unknown 1.2.3.4",
    ];
    let input = events.join("\n");

    c.bench_function("all_event_types", |b| {
        b.iter(|| {
            let logs: Vec<_> = parse(black_box(&input)).filter_map(|r| r.ok()).collect();
            black_box(logs);
        });
    });
}

fn bench_memory_usage(c: &mut Criterion) {
    let mut group = c.benchmark_group("memory_usage");

    eprintln!("\n{:-<80}", "");
    eprintln!(
        "{:<12} {:>14} {:>14} {:>14} {:>14}",
        "Lines", "Total alloc", "Peak in-use", "Alloc count", "Per line"
    );
    eprintln!("{:-<80}", "");

    for size in [1, 100, 1_000, 10_000, 100_000, 1_000_000] {
        let input = generate_log_batch(size);

        // One-shot dhat measurement: collect all parsed results to capture real memory usage
        let _profiler = dhat::Profiler::builder().testing().build();
        let results: Vec<_> = parse(&input).collect();
        let stats = dhat::HeapStats::get();
        drop(results);
        drop(_profiler);

        eprintln!(
            "{:<12} {:>14} {:>14} {:>14} {:>14}",
            size,
            fmt_bytes(stats.total_bytes),
            fmt_bytes(stats.max_bytes as u64),
            stats.total_blocks,
            fmt_bytes(if size > 0 {
                stats.total_bytes / size as u64
            } else {
                0
            }),
        );

        // Criterion time benchmark for the collect path (measures throughput)
        if size >= 100_000 {
            group.sample_size(10);
        }
        group.bench_with_input(
            BenchmarkId::new("collect_lines", size),
            &input,
            |b, input| {
                b.iter(|| {
                    let results: Vec<_> = parse(black_box(input)).filter_map(|r| r.ok()).collect();
                    black_box(results);
                });
            },
        );
    }

    eprintln!("{:-<80}", "");
    group.finish();
}

#[cfg(feature = "parallel")]
fn bench_parallel_vs_sequential(c: &mut Criterion) {
    let mut group = c.benchmark_group("parallel_vs_sequential");

    for size in [1_000, 10_000, 100_000, 1_000_000] {
        let input = generate_log_batch(size);
        if size >= 100_000 {
            group.sample_size(10);
        }
        group.bench_with_input(
            BenchmarkId::new("parallel_lines", size),
            &input,
            |b, input| {
                b.iter(|| {
                    let count = parse(black_box(input)).filter(|r| r.is_ok()).count();
                    black_box(count);
                });
            },
        );
    }

    group.finish();
}

criterion_group!(
    benches,
    bench_single_line,
    bench_batch_parsing,
    bench_collect_vs_iterate,
    bench_error_handling,
    bench_all_events,
    bench_memory_usage,
);

#[cfg(feature = "parallel")]
criterion_group!(parallel_benches, bench_parallel_vs_sequential,);

#[cfg(not(feature = "parallel"))]
criterion_main!(benches);

#[cfg(feature = "parallel")]
criterion_main!(benches, parallel_benches);
