window.BENCHMARK_DATA = {
  "lastUpdate": 1774527146054,
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
          "id": "1cb1526cf0afbd46d7e9eb29e079628c99fa355f",
          "message": "feat: CICD and examples and docs (#5)\n\nfeat: CICD and examples and docs",
          "timestamp": "2026-03-26T21:07:16+09:00",
          "tree_id": "f75e34fd23d83daae62679a36a1f940b41defb27",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/1cb1526cf0afbd46d7e9eb29e079628c99fa355f"
        },
        "date": 1774527145246,
        "tool": "cargo",
        "benches": [
          {
            "name": "single_line/iso_date_ipv4",
            "value": 382,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/syslog_date",
            "value": 383,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/iso8601_timestamp",
            "value": 383,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/ipv6",
            "value": 466,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/10",
            "value": 4168,
            "range": "± 33",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/100",
            "value": 41788,
            "range": "± 203",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/1000",
            "value": 419630,
            "range": "± 1521",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/10000",
            "value": 4206777,
            "range": "± 15228",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/100000",
            "value": 42092197,
            "range": "± 139776",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/1000000",
            "value": 420207723,
            "range": "± 756791",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/iterate_count",
            "value": 419788,
            "range": "± 1415",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/collect_vec",
            "value": 445798,
            "range": "± 1580",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/partition_ok_err",
            "value": 446972,
            "range": "± 3821",
            "unit": "ns/iter"
          },
          {
            "name": "mixed_valid_invalid_1000",
            "value": 249163,
            "range": "± 1484",
            "unit": "ns/iter"
          },
          {
            "name": "all_event_types",
            "value": 3359,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1",
            "value": 428,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/100",
            "value": 46041,
            "range": "± 181",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1000",
            "value": 450450,
            "range": "± 2161",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/10000",
            "value": 4476158,
            "range": "± 27570",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/100000",
            "value": 44497460,
            "range": "± 53604",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1000000",
            "value": 449267122,
            "range": "± 951091",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}