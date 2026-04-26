window.BENCHMARK_DATA = {
  "lastUpdate": 1777208992103,
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
          "id": "633648ddd5d0bc337c640c7ac8a90708fe36b6fb",
          "message": "deps(rust): bump the rust-dependencies group across 1 directory with 2 updates (#26)\n\nBumps the rust-dependencies group with 2 updates: [winnow](https://github.com/winnow-rs/winnow) and [pyo3](https://github.com/pyo3/pyo3).\n\n\nUpdates `winnow` from 1.0.0 to 1.0.1\n- [Changelog](https://github.com/winnow-rs/winnow/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/winnow-rs/winnow/compare/v1.0.0...v1.0.1)\n\nUpdates `pyo3` from 0.28.2 to 0.28.3\n- [Release notes](https://github.com/pyo3/pyo3/releases)\n- [Changelog](https://github.com/PyO3/pyo3/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/pyo3/pyo3/compare/v0.28.2...v0.28.3)\n\n---\nupdated-dependencies:\n- dependency-name: winnow\n  dependency-version: 1.0.1\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n  dependency-group: rust-dependencies\n- dependency-name: pyo3\n  dependency-version: 0.28.3\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n  dependency-group: rust-dependencies\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-04-04T11:37:22+09:00",
          "tree_id": "b151bdc734e9c3c5b75b0f235cf22b45b362a351",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/633648ddd5d0bc337c640c7ac8a90708fe36b6fb"
        },
        "date": 1775270590076,
        "tool": "cargo",
        "benches": [
          {
            "name": "core/single_line/default_timestamp_ipv4",
            "value": 300,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "core/single_line/syslog_timestamp",
            "value": 298,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "core/single_line/iso8601_timestamp",
            "value": 319,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "core/single_line/ipv6_address",
            "value": 363,
            "range": "± 31",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/10_lines",
            "value": 3318,
            "range": "± 38",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/100_lines",
            "value": 34459,
            "range": "± 651",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/1000_lines",
            "value": 346703,
            "range": "± 1590",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/10000_lines",
            "value": 3472483,
            "range": "± 12477",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/100000_lines",
            "value": 34588213,
            "range": "± 469096",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/1000000_lines",
            "value": 346961699,
            "range": "± 994114",
            "unit": "ns/iter"
          },
          {
            "name": "core/consumption_strategy/iterate_and_count",
            "value": 347261,
            "range": "± 2507",
            "unit": "ns/iter"
          },
          {
            "name": "core/consumption_strategy/collect_to_vec",
            "value": 364216,
            "range": "± 2036",
            "unit": "ns/iter"
          },
          {
            "name": "core/consumption_strategy/partition_results",
            "value": 352653,
            "range": "± 2234",
            "unit": "ns/iter"
          },
          {
            "name": "core/error_handling/50pct_invalid_1000_lines",
            "value": 207245,
            "range": "± 10719",
            "unit": "ns/iter"
          },
          {
            "name": "core/event_coverage/all_8_event_types",
            "value": 2963,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/1_lines",
            "value": 361,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/100_lines",
            "value": 36582,
            "range": "± 238",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/1000_lines",
            "value": 362225,
            "range": "± 2271",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/10000_lines",
            "value": 3659325,
            "range": "± 14970",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/100000_lines",
            "value": 36585625,
            "range": "± 73484",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/1000000_lines",
            "value": 370720133,
            "range": "± 1162628",
            "unit": "ns/iter"
          },
          {
            "name": "core/parallel/iterate/1000_lines",
            "value": 233235,
            "range": "± 3323",
            "unit": "ns/iter"
          },
          {
            "name": "core/parallel/iterate/10000_lines",
            "value": 1899605,
            "range": "± 36595",
            "unit": "ns/iter"
          },
          {
            "name": "core/parallel/iterate/100000_lines",
            "value": 18252609,
            "range": "± 88136",
            "unit": "ns/iter"
          },
          {
            "name": "core/parallel/iterate/1000000_lines",
            "value": 181813287,
            "range": "± 572908",
            "unit": "ns/iter"
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
          "id": "19a05007ac5e57c36a2df7085eedae055274cd07",
          "message": "deps(rust): bump the rust-dependencies group with 4 updates (#36)",
          "timestamp": "2026-04-26T22:02:58+09:00",
          "tree_id": "f2ac5fb2ace2cd6da8762a3f3c78a7142372dd21",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/19a05007ac5e57c36a2df7085eedae055274cd07"
        },
        "date": 1777208991825,
        "tool": "cargo",
        "benches": [
          {
            "name": "core/single_line/default_timestamp_ipv4",
            "value": 396,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "core/single_line/syslog_timestamp",
            "value": 390,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "core/single_line/iso8601_timestamp",
            "value": 400,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "core/single_line/ipv6_address",
            "value": 468,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/10_lines",
            "value": 4036,
            "range": "± 27",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/100_lines",
            "value": 40142,
            "range": "± 229",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/1000_lines",
            "value": 400351,
            "range": "± 2783",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/10000_lines",
            "value": 4004778,
            "range": "± 28324",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/100000_lines",
            "value": 39909650,
            "range": "± 215823",
            "unit": "ns/iter"
          },
          {
            "name": "core/batch/iterate/1000000_lines",
            "value": 402637079,
            "range": "± 6704442",
            "unit": "ns/iter"
          },
          {
            "name": "core/consumption_strategy/iterate_and_count",
            "value": 400720,
            "range": "± 2331",
            "unit": "ns/iter"
          },
          {
            "name": "core/consumption_strategy/collect_to_vec",
            "value": 415413,
            "range": "± 2937",
            "unit": "ns/iter"
          },
          {
            "name": "core/consumption_strategy/partition_results",
            "value": 409977,
            "range": "± 5767",
            "unit": "ns/iter"
          },
          {
            "name": "core/error_handling/50pct_invalid_1000_lines",
            "value": 249440,
            "range": "± 2264",
            "unit": "ns/iter"
          },
          {
            "name": "core/event_coverage/all_8_event_types",
            "value": 3405,
            "range": "± 130",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/1_lines",
            "value": 464,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/100_lines",
            "value": 41928,
            "range": "± 509",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/1000_lines",
            "value": 414955,
            "range": "± 4945",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/10000_lines",
            "value": 4166469,
            "range": "± 20610",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/100000_lines",
            "value": 41214203,
            "range": "± 122378",
            "unit": "ns/iter"
          },
          {
            "name": "core/memory/collect/1000000_lines",
            "value": 419066915,
            "range": "± 2022247",
            "unit": "ns/iter"
          },
          {
            "name": "core/parallel/iterate/1000_lines",
            "value": 206349,
            "range": "± 3743",
            "unit": "ns/iter"
          },
          {
            "name": "core/parallel/iterate/10000_lines",
            "value": 1629088,
            "range": "± 19120",
            "unit": "ns/iter"
          },
          {
            "name": "core/parallel/iterate/100000_lines",
            "value": 15513081,
            "range": "± 41306",
            "unit": "ns/iter"
          },
          {
            "name": "core/parallel/iterate/1000000_lines",
            "value": 154762593,
            "range": "± 611011",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}