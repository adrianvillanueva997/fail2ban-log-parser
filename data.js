window.BENCHMARK_DATA = {
  "lastUpdate": 1775013233466,
  "repoUrl": "https://github.com/adrianvillanueva997/fail2ban-log-parser",
  "entries": {
    "Parser Benchmarks": [
      {
        "commit": {
          "author": {
            "email": "16082421+adrianvillanueva997@users.noreply.github.com",
            "name": "Adrián Villanueva",
            "username": "adrianvillanueva997"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "aa68f8d7ad85457a944f417ce7280bbd472a0672",
          "message": "refactor: Benchmarks (#22)\n\n* refactor: Benchmarks\n\n* fixes",
          "timestamp": "2026-04-01T12:08:17+09:00",
          "tree_id": "7638b41f5aca304f18c757c0933c463284b20bd5",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/aa68f8d7ad85457a944f417ce7280bbd472a0672"
        },
        "date": 1775013233215,
        "tool": "cargo",
        "benches": [
          {
            "name": "core/single_line/default_timestamp_ipv4",
            "value": 306,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "core/single_line/syslog_timestamp",
            "value": 307,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "core/single_line/iso8601_timestamp",
            "value": 301,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "core/single_line/ipv6_address",
            "value": 372,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/10_lines",
            "value": 3296,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/100_lines",
            "value": 34240,
            "range": "± 276",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/1000_lines",
            "value": 344445,
            "range": "± 1886",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/10000_lines",
            "value": 3444436,
            "range": "± 15980",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/100000_lines",
            "value": 34486606,
            "range": "± 93814",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/1000000_lines",
            "value": 344751598,
            "range": "± 785247",
            "unit": "ns/iter"
          },
          {
            "name": "core/consumption_strategy/iterate_and_count",
            "value": 344937,
            "range": "± 5843",
            "unit": "ns/iter"
          },
          {
            "name": "core/consumption_strategy/collect_to_vec",
            "value": 368594,
            "range": "± 1944",
            "unit": "ns/iter"
          },
          {
            "name": "core/consumption_strategy/partition_results",
            "value": 358256,
            "range": "± 1279",
            "unit": "ns/iter"
          },
          {
            "name": "core/error_handling/50pct_invalid_1000_lines",
            "value": 195529,
            "range": "± 979",
            "unit": "ns/iter"
          },
          {
            "name": "core/event_coverage/all_8_event_types",
            "value": 2921,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/1_lines",
            "value": 356,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/100_lines",
            "value": 37557,
            "range": "± 306",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/1000_lines",
            "value": 374029,
            "range": "± 1809",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/10000_lines",
            "value": 3725974,
            "range": "± 36580",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/100000_lines",
            "value": 37268713,
            "range": "± 159924",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/1000000_lines",
            "value": 377079476,
            "range": "± 1098079",
            "unit": "ns/iter"
          },
          {
            "name": "core/parallel/iterate/1000_lines",
            "value": 226190,
            "range": "± 10378",
            "unit": "ns/iter"
          },
          {
            "name": "core/parallel/iterate/10000_lines",
            "value": 1832030,
            "range": "± 40408",
            "unit": "ns/iter"
          },
          {
            "name": "core/parallel/iterate/100000_lines",
            "value": 17291419,
            "range": "± 29249",
            "unit": "ns/iter"
          },
          {
            "name": "core/parallel/iterate/1000000_lines",
            "value": 173639832,
            "range": "± 691014",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}