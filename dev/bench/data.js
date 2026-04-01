window.BENCHMARK_DATA = {
  "lastUpdate": 1775008691501,
  "repoUrl": "https://github.com/adrianvillanueva997/fail2ban-log-parser",
  "entries": {
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
          "id": "7d706c39920aaf9403bf5dc056aad66d85fa3e5a",
          "message": "feat: Javascript bindings (#17)\n\n* feat: Javascript bindings\n\n* improve CI and some optimization\n\n* add examples, documentation and CI improvements\n\n* fixes\n\n* improve benchmakrs\n\n* fix CI\n\n* remove cache\n\n* remove caching\n\n* add 1 million lines batch\n\n* reduce benchmark size",
          "timestamp": "2026-03-28T11:41:10+09:00",
          "tree_id": "25c635075cae271dcba517afbfeb09d1f315dbff",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/7d706c39920aaf9403bf5dc056aad66d85fa3e5a"
        },
        "date": 1774665872798,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "single_line/ipv4",
            "value": 254025,
            "unit": "ops/s"
          },
          {
            "name": "single_line/ipv6",
            "value": 248084,
            "unit": "ops/s"
          },
          {
            "name": "batch/10 lines",
            "value": 11032,
            "unit": "ops/s"
          },
          {
            "name": "batch/100 lines",
            "value": 2763,
            "unit": "ops/s"
          },
          {
            "name": "batch/1000 lines",
            "value": 341,
            "unit": "ops/s"
          },
          {
            "name": "batch/10000 lines",
            "value": 35,
            "unit": "ops/s"
          },
          {
            "name": "batch/500000 lines",
            "value": 1,
            "unit": "ops/s"
          },
          {
            "name": "error_handling/100 lines (50% invalid)",
            "value": 3998,
            "unit": "ops/s"
          },
          {
            "name": "error_handling/500 lines (50% invalid)",
            "value": 1022,
            "unit": "ops/s"
          },
          {
            "name": "error_handling/1000 lines (50% invalid)",
            "value": 543,
            "unit": "ops/s"
          },
          {
            "name": "throughput/10k_lines",
            "value": 358,
            "unit": "logs/ms"
          },
          {
            "name": "throughput/100k_lines",
            "value": 309,
            "unit": "logs/ms"
          },
          {
            "name": "throughput/500k_lines",
            "value": 226,
            "unit": "logs/ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ed028ce04aeb2f9440baedf4d584784b27d3154e",
          "message": "deps(js): bump @napi-rs/cli (#21)",
          "timestamp": "2026-03-30T07:30:50+09:00",
          "tree_id": "dd5d543025dbb63df916119150d35a84aca7f7a6",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/ed028ce04aeb2f9440baedf4d584784b27d3154e"
        },
        "date": 1774823659659,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "single_line/ipv4",
            "value": 252661,
            "unit": "ops/s"
          },
          {
            "name": "single_line/ipv6",
            "value": 249048,
            "unit": "ops/s"
          },
          {
            "name": "batch/10 lines",
            "value": 11060,
            "unit": "ops/s"
          },
          {
            "name": "batch/100 lines",
            "value": 2701,
            "unit": "ops/s"
          },
          {
            "name": "batch/1000 lines",
            "value": 336,
            "unit": "ops/s"
          },
          {
            "name": "batch/10000 lines",
            "value": 34,
            "unit": "ops/s"
          },
          {
            "name": "batch/500000 lines",
            "value": 1,
            "unit": "ops/s"
          },
          {
            "name": "error_handling/100 lines (50% invalid)",
            "value": 3944,
            "unit": "ops/s"
          },
          {
            "name": "error_handling/500 lines (50% invalid)",
            "value": 1004,
            "unit": "ops/s"
          },
          {
            "name": "error_handling/1000 lines (50% invalid)",
            "value": 535,
            "unit": "ops/s"
          },
          {
            "name": "throughput/10k_lines",
            "value": 348,
            "unit": "logs/ms"
          },
          {
            "name": "throughput/100k_lines",
            "value": 312,
            "unit": "logs/ms"
          },
          {
            "name": "throughput/500k_lines",
            "value": 254,
            "unit": "logs/ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "99f96e634d2b76e8c124921c88a4f45d2b91b5bb",
          "message": "deps(rust): bump the rust-dependencies group with 2 updates (#19)",
          "timestamp": "2026-03-30T07:31:12+09:00",
          "tree_id": "1836742ae6f946ff3e2411f504b6c14b6003b305",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/99f96e634d2b76e8c124921c88a4f45d2b91b5bb"
        },
        "date": 1774823675250,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "single_line/ipv4",
            "value": 246142,
            "unit": "ops/s"
          },
          {
            "name": "single_line/ipv6",
            "value": 242754,
            "unit": "ops/s"
          },
          {
            "name": "batch/10 lines",
            "value": 11503,
            "unit": "ops/s"
          },
          {
            "name": "batch/100 lines",
            "value": 2766,
            "unit": "ops/s"
          },
          {
            "name": "batch/1000 lines",
            "value": 339,
            "unit": "ops/s"
          },
          {
            "name": "batch/10000 lines",
            "value": 35,
            "unit": "ops/s"
          },
          {
            "name": "batch/500000 lines",
            "value": 1,
            "unit": "ops/s"
          },
          {
            "name": "error_handling/100 lines (50% invalid)",
            "value": 4002,
            "unit": "ops/s"
          },
          {
            "name": "error_handling/500 lines (50% invalid)",
            "value": 1013,
            "unit": "ops/s"
          },
          {
            "name": "error_handling/1000 lines (50% invalid)",
            "value": 535,
            "unit": "ops/s"
          },
          {
            "name": "throughput/10k_lines",
            "value": 352,
            "unit": "logs/ms"
          },
          {
            "name": "throughput/100k_lines",
            "value": 315,
            "unit": "logs/ms"
          },
          {
            "name": "throughput/500k_lines",
            "value": 224,
            "unit": "logs/ms"
          }
        ]
      },
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
          "id": "d4254666c14c93645f5230cf6b9736e25790becd",
          "message": "feat: wasm bindings (#18)\n\n* [WIP]feat: wasm bindings\n\n* use wasm generate instead\n\n* update CI and binding implementation\n\n* fix ci\n\n* typo\n\n* fix permissions\n\n* ci changes\n\n* optimize makefile\n\n* forgot sudo\n\n* stuff\n\n* update CI and example\n\n* see if it works now\n\n* Apply suggestions from code review\n\nCo-authored-by: Copilot <175728472+Copilot@users.noreply.github.com>\n\n* fix\n\n---------\n\nCo-authored-by: Copilot <175728472+Copilot@users.noreply.github.com>",
          "timestamp": "2026-04-01T10:54:46+09:00",
          "tree_id": "01f75069ac7b9fbb3d369cfdb228fbdc70874545",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/d4254666c14c93645f5230cf6b9736e25790becd"
        },
        "date": 1775008690734,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "single_line/ipv4",
            "value": 264454,
            "unit": "ops/s"
          },
          {
            "name": "single_line/ipv6",
            "value": 259685,
            "unit": "ops/s"
          },
          {
            "name": "batch/10 lines",
            "value": 12965,
            "unit": "ops/s"
          },
          {
            "name": "batch/100 lines",
            "value": 3105,
            "unit": "ops/s"
          },
          {
            "name": "batch/1000 lines",
            "value": 380,
            "unit": "ops/s"
          },
          {
            "name": "batch/10000 lines",
            "value": 39,
            "unit": "ops/s"
          },
          {
            "name": "batch/500000 lines",
            "value": 1,
            "unit": "ops/s"
          },
          {
            "name": "error_handling/100 lines (50% invalid)",
            "value": 4320,
            "unit": "ops/s"
          },
          {
            "name": "error_handling/500 lines (50% invalid)",
            "value": 1118,
            "unit": "ops/s"
          },
          {
            "name": "error_handling/1000 lines (50% invalid)",
            "value": 589,
            "unit": "ops/s"
          },
          {
            "name": "throughput/10k_lines",
            "value": 372,
            "unit": "logs/ms"
          },
          {
            "name": "throughput/100k_lines",
            "value": 345,
            "unit": "logs/ms"
          },
          {
            "name": "throughput/500k_lines",
            "value": 279,
            "unit": "logs/ms"
          }
        ]
      }
    ]
  }
}