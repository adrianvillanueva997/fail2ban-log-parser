window.BENCHMARK_DATA = {
  "lastUpdate": 1774540243930,
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
          "id": "92c2e0e055d75dbb8f7a0a3c2425ad08a8902b50",
          "message": "ci: Change benchmark directory path (#8)",
          "timestamp": "2026-03-26T21:27:04+09:00",
          "tree_id": "877ad5cabd7abc4d642a7228a5b18664660972f3",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/92c2e0e055d75dbb8f7a0a3c2425ad08a8902b50"
        },
        "date": 1774528294632,
        "tool": "cargo",
        "benches": [
          {
            "name": "single_line/iso_date_ipv4",
            "value": 361,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/syslog_date",
            "value": 369,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/iso8601_timestamp",
            "value": 363,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/ipv6",
            "value": 418,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/10",
            "value": 3831,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/100",
            "value": 39309,
            "range": "± 399",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/1000",
            "value": 395314,
            "range": "± 1232",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/10000",
            "value": 3957876,
            "range": "± 17230",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/100000",
            "value": 39613908,
            "range": "± 30028",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/1000000",
            "value": 395871247,
            "range": "± 1497991",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/iterate_count",
            "value": 395484,
            "range": "± 1588",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/collect_vec",
            "value": 431238,
            "range": "± 3312",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/partition_ok_err",
            "value": 430087,
            "range": "± 5081",
            "unit": "ns/iter"
          },
          {
            "name": "mixed_valid_invalid_1000",
            "value": 243073,
            "range": "± 378",
            "unit": "ns/iter"
          },
          {
            "name": "all_event_types",
            "value": 3150,
            "range": "± 83",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1",
            "value": 409,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/100",
            "value": 41586,
            "range": "± 105",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1000",
            "value": 434408,
            "range": "± 1298",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/10000",
            "value": 4335239,
            "range": "± 36796",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/100000",
            "value": 43333164,
            "range": "± 198455",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1000000",
            "value": 445406193,
            "range": "± 621671",
            "unit": "ns/iter"
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
          "id": "bbc917a9e477777cdd8b2fdcba35b3175f9b2053",
          "message": "perf: String borrow (#9)\n\n* perf: String borrow\n\n* fix clippy issues",
          "timestamp": "2026-03-26T21:44:59+09:00",
          "tree_id": "4a6cc82b54f6ddb9de402d2ebf1683c57ae3f02c",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/bbc917a9e477777cdd8b2fdcba35b3175f9b2053"
        },
        "date": 1774529362977,
        "tool": "cargo",
        "benches": [
          {
            "name": "single_line/iso_date_ipv4",
            "value": 314,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/syslog_date",
            "value": 311,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/iso8601_timestamp",
            "value": 323,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/ipv6",
            "value": 386,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/10",
            "value": 3456,
            "range": "± 62",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/100",
            "value": 35414,
            "range": "± 624",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/1000",
            "value": 356916,
            "range": "± 5160",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/10000",
            "value": 3509235,
            "range": "± 26521",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/100000",
            "value": 34987383,
            "range": "± 113656",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/1000000",
            "value": 349586567,
            "range": "± 2525147",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/iterate_count",
            "value": 355389,
            "range": "± 17441",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/collect_vec",
            "value": 372205,
            "range": "± 4923",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/partition_ok_err",
            "value": 359959,
            "range": "± 2181",
            "unit": "ns/iter"
          },
          {
            "name": "mixed_valid_invalid_1000",
            "value": 208868,
            "range": "± 829",
            "unit": "ns/iter"
          },
          {
            "name": "all_event_types",
            "value": 2948,
            "range": "± 38",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1",
            "value": 380,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/100",
            "value": 37556,
            "range": "± 612",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1000",
            "value": 376773,
            "range": "± 3909",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/10000",
            "value": 3773785,
            "range": "± 23354",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/100000",
            "value": 37402051,
            "range": "± 90101",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1000000",
            "value": 380214901,
            "range": "± 647658",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "adrianvillanueva997@gmail.com",
            "name": "adrianvillanueva997",
            "username": "adrianvillanueva997"
          },
          "committer": {
            "email": "adrianvillanueva997@gmail.com",
            "name": "adrianvillanueva997",
            "username": "adrianvillanueva997"
          },
          "distinct": true,
          "id": "02aac921a4e486b1e7c8bc6f3d1b4db590610758",
          "message": "update documentation",
          "timestamp": "2026-03-26T21:57:37+09:00",
          "tree_id": "f5b08e425bc93a390502e080b5bd935c309ee44f",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/02aac921a4e486b1e7c8bc6f3d1b4db590610758"
        },
        "date": 1774530123407,
        "tool": "cargo",
        "benches": [
          {
            "name": "single_line/iso_date_ipv4",
            "value": 325,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/syslog_date",
            "value": 318,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/iso8601_timestamp",
            "value": 326,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/ipv6",
            "value": 399,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/10",
            "value": 3395,
            "range": "± 37",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/100",
            "value": 35400,
            "range": "± 488",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/1000",
            "value": 357175,
            "range": "± 8039",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/10000",
            "value": 3563432,
            "range": "± 29299",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/100000",
            "value": 35466561,
            "range": "± 57372",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/1000000",
            "value": 354147952,
            "range": "± 2353857",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/iterate_count",
            "value": 356055,
            "range": "± 2554",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/collect_vec",
            "value": 383498,
            "range": "± 4280",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/partition_ok_err",
            "value": 366995,
            "range": "± 2666",
            "unit": "ns/iter"
          },
          {
            "name": "mixed_valid_invalid_1000",
            "value": 220515,
            "range": "± 1162",
            "unit": "ns/iter"
          },
          {
            "name": "all_event_types",
            "value": 3083,
            "range": "± 28",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1",
            "value": 359,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/100",
            "value": 39377,
            "range": "± 292",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1000",
            "value": 387945,
            "range": "± 8823",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/10000",
            "value": 3886147,
            "range": "± 27727",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/100000",
            "value": 38927934,
            "range": "± 151979",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1000000",
            "value": 395306444,
            "range": "± 1378840",
            "unit": "ns/iter"
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
          "id": "f3354df52699774bd7709e5a54163bcab5221872",
          "message": "feat: Paralel processing (#11)\n\n* feat: Paralel processing\nThis PR implements the paralel feature keeping the same interface for\nsequential. The idea is to keep paralel as a feature to later use it\nwhen i develop the wasm bindings\n\n* Address github copilot review\n\n* fmt",
          "timestamp": "2026-03-26T23:27:10+09:00",
          "tree_id": "4112a159958ca434174a96e65d39183eb4d2d899",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/f3354df52699774bd7709e5a54163bcab5221872"
        },
        "date": 1774535594662,
        "tool": "cargo",
        "benches": [
          {
            "name": "single_line/iso_date_ipv4",
            "value": 310,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/syslog_date",
            "value": 311,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/iso8601_timestamp",
            "value": 317,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/ipv6",
            "value": 375,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/10",
            "value": 3320,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/100",
            "value": 34571,
            "range": "± 239",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/1000",
            "value": 348810,
            "range": "± 1923",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/10000",
            "value": 3497944,
            "range": "± 24546",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/100000",
            "value": 35249888,
            "range": "± 58054",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/1000000",
            "value": 352904482,
            "range": "± 1722172",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/iterate_count",
            "value": 348707,
            "range": "± 1947",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/collect_vec",
            "value": 365362,
            "range": "± 1621",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/partition_ok_err",
            "value": 360838,
            "range": "± 1998",
            "unit": "ns/iter"
          },
          {
            "name": "mixed_valid_invalid_1000",
            "value": 208498,
            "range": "± 858",
            "unit": "ns/iter"
          },
          {
            "name": "all_event_types",
            "value": 2903,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1",
            "value": 347,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/100",
            "value": 36471,
            "range": "± 261",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1000",
            "value": 362516,
            "range": "± 1705",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/10000",
            "value": 3657769,
            "range": "± 17288",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/100000",
            "value": 36385059,
            "range": "± 304803",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1000000",
            "value": 369331644,
            "range": "± 586067",
            "unit": "ns/iter"
          },
          {
            "name": "parallel/lines/1000",
            "value": 225793,
            "range": "± 22232",
            "unit": "ns/iter"
          },
          {
            "name": "parallel/lines/10000",
            "value": 1830299,
            "range": "± 52919",
            "unit": "ns/iter"
          },
          {
            "name": "parallel/lines/100000",
            "value": 17677435,
            "range": "± 47657",
            "unit": "ns/iter"
          },
          {
            "name": "parallel/lines/1000000",
            "value": 176500354,
            "range": "± 357520",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "adrianvillanueva997@gmail.com",
            "name": "adrianvillanueva997",
            "username": "adrianvillanueva997"
          },
          "committer": {
            "email": "adrianvillanueva997@gmail.com",
            "name": "adrianvillanueva997",
            "username": "adrianvillanueva997"
          },
          "distinct": true,
          "id": "4ddab6da777395b9bd6f4831f06366fc6384b636",
          "message": "use single global version",
          "timestamp": "2026-03-27T00:45:06+09:00",
          "tree_id": "270f62968f94b3f7ec66914f4621b01cde235ba6",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/4ddab6da777395b9bd6f4831f06366fc6384b636"
        },
        "date": 1774540243615,
        "tool": "cargo",
        "benches": [
          {
            "name": "single_line/iso_date_ipv4",
            "value": 310,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/syslog_date",
            "value": 316,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/iso8601_timestamp",
            "value": 311,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "single_line/ipv6",
            "value": 381,
            "range": "± 32",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/10",
            "value": 3284,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/100",
            "value": 34300,
            "range": "± 1579",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/1000",
            "value": 343819,
            "range": "± 2210",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/10000",
            "value": 3416749,
            "range": "± 18693",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/100000",
            "value": 34255091,
            "range": "± 34829",
            "unit": "ns/iter"
          },
          {
            "name": "batch_parsing/lines/1000000",
            "value": 342842747,
            "range": "± 425451",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/iterate_count",
            "value": 342834,
            "range": "± 2265",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/collect_vec",
            "value": 362284,
            "range": "± 1935",
            "unit": "ns/iter"
          },
          {
            "name": "collect_vs_iterate/partition_ok_err",
            "value": 357946,
            "range": "± 1494",
            "unit": "ns/iter"
          },
          {
            "name": "mixed_valid_invalid_1000",
            "value": 211084,
            "range": "± 577",
            "unit": "ns/iter"
          },
          {
            "name": "all_event_types",
            "value": 2944,
            "range": "± 86",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1",
            "value": 366,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/100",
            "value": 36405,
            "range": "± 988",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1000",
            "value": 357778,
            "range": "± 4410",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/10000",
            "value": 3585022,
            "range": "± 48604",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/100000",
            "value": 35671797,
            "range": "± 24669",
            "unit": "ns/iter"
          },
          {
            "name": "memory_usage/collect_lines/1000000",
            "value": 363147475,
            "range": "± 419807",
            "unit": "ns/iter"
          },
          {
            "name": "parallel/lines/1000",
            "value": 231415,
            "range": "± 3842",
            "unit": "ns/iter"
          },
          {
            "name": "parallel/lines/10000",
            "value": 1877876,
            "range": "± 31958",
            "unit": "ns/iter"
          },
          {
            "name": "parallel/lines/100000",
            "value": 18038495,
            "range": "± 111079",
            "unit": "ns/iter"
          },
          {
            "name": "parallel/lines/1000000",
            "value": 180123114,
            "range": "± 279898",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}