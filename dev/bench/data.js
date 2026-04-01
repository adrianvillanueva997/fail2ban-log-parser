window.BENCHMARK_DATA = {
  "lastUpdate": 1775013115574,
  "repoUrl": "https://github.com/adrianvillanueva997/fail2ban-log-parser",
  "entries": {
    "Python Bindings Benchmarks": [
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
        "date": 1775012957708,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "py/single_line/default_timestamp_ipv4",
            "value": 811688,
            "unit": "ops/s"
          },
          {
            "name": "py/single_line/ipv6_address",
            "value": 750751,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/10_lines",
            "value": 49983,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/100_lines",
            "value": 9108,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/1000_lines",
            "value": 1708,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/10000_lines",
            "value": 181,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/100000_lines",
            "value": 17,
            "unit": "ops/s"
          },
          {
            "name": "py/error_handling/50pct_invalid_100_lines",
            "value": 12099,
            "unit": "ops/s"
          },
          {
            "name": "py/error_handling/50pct_invalid_500_lines",
            "value": 4339,
            "unit": "ops/s"
          },
          {
            "name": "py/error_handling/50pct_invalid_1000_lines",
            "value": 2575,
            "unit": "ops/s"
          },
          {
            "name": "py/throughput/10k_lines",
            "value": 2209,
            "unit": "logs/ms"
          },
          {
            "name": "py/throughput/100k_lines",
            "value": 1974,
            "unit": "logs/ms"
          },
          {
            "name": "py/throughput/500k_lines",
            "value": 1907,
            "unit": "logs/ms"
          }
        ]
      }
    ],
    "JS Bindings Benchmarks": [
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
        "date": 1775013114750,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "js/single_line/default_timestamp_ipv4",
            "value": 258132,
            "unit": "ops/s"
          },
          {
            "name": "js/single_line/ipv6_address",
            "value": 251203,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/10_lines",
            "value": 11275,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/100_lines",
            "value": 2766,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/1000_lines",
            "value": 345,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/10000_lines",
            "value": 36,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/500000_lines",
            "value": 1,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_100_lines",
            "value": 4001,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_500_lines",
            "value": 1027,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_1000_lines",
            "value": 544,
            "unit": "ops/s"
          },
          {
            "name": "js/throughput/10k_lines",
            "value": 358,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/100k_lines",
            "value": 294,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/500k_lines",
            "value": 278,
            "unit": "logs/ms"
          }
        ]
      }
    ]
  }
}