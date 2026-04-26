window.BENCHMARK_DATA = {
  "lastUpdate": 1777208800098,
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
        "date": 1775270293951,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "py/single_line/default_timestamp_ipv4",
            "value": 818331,
            "unit": "ops/s"
          },
          {
            "name": "py/single_line/ipv6_address",
            "value": 773395,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/10_lines",
            "value": 50411,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/100_lines",
            "value": 9145,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/1000_lines",
            "value": 1652,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/10000_lines",
            "value": 184,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/100000_lines",
            "value": 18,
            "unit": "ops/s"
          },
          {
            "name": "py/error_handling/50pct_invalid_100_lines",
            "value": 11700,
            "unit": "ops/s"
          },
          {
            "name": "py/error_handling/50pct_invalid_500_lines",
            "value": 4351,
            "unit": "ops/s"
          },
          {
            "name": "py/error_handling/50pct_invalid_1000_lines",
            "value": 2530,
            "unit": "ops/s"
          },
          {
            "name": "py/throughput/10k_lines",
            "value": 2193,
            "unit": "logs/ms"
          },
          {
            "name": "py/throughput/100k_lines",
            "value": 1957,
            "unit": "logs/ms"
          },
          {
            "name": "py/throughput/500k_lines",
            "value": 1946,
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
          "id": "735b0d72a6277b6a81a8837fed8221b5803f92da",
          "message": "chore(deps-dev): bump pytest from 9.0.2 to 9.0.3 in /bindings/py-fail2ban-log-parser in the uv group across 1 directory (#33)\n\nBumps the uv group with 1 update in the /bindings/py-fail2ban-log-parser directory: [pytest](https://github.com/pytest-dev/pytest).\n\n\nUpdates `pytest` from 9.0.2 to 9.0.3\n- [Release notes](https://github.com/pytest-dev/pytest/releases)\n- [Changelog](https://github.com/pytest-dev/pytest/blob/main/CHANGELOG.rst)\n- [Commits](https://github.com/pytest-dev/pytest/compare/9.0.2...9.0.3)\n\n---\nupdated-dependencies:\n- dependency-name: pytest\n  dependency-version: 9.0.3\n  dependency-type: direct:development\n  dependency-group: uv\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-04-19T22:20:30+09:00",
          "tree_id": "deac8c81809fd160cfd4556b1010e2869fe86731",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/735b0d72a6277b6a81a8837fed8221b5803f92da"
        },
        "date": 1776604884900,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "py/single_line/default_timestamp_ipv4",
            "value": 817661,
            "unit": "ops/s"
          },
          {
            "name": "py/single_line/ipv6_address",
            "value": 756430,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/10_lines",
            "value": 55636,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/100_lines",
            "value": 9805,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/1000_lines",
            "value": 1756,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/10000_lines",
            "value": 182,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/100000_lines",
            "value": 18,
            "unit": "ops/s"
          },
          {
            "name": "py/error_handling/50pct_invalid_100_lines",
            "value": 12286,
            "unit": "ops/s"
          },
          {
            "name": "py/error_handling/50pct_invalid_500_lines",
            "value": 4793,
            "unit": "ops/s"
          },
          {
            "name": "py/error_handling/50pct_invalid_1000_lines",
            "value": 2723,
            "unit": "ops/s"
          },
          {
            "name": "py/throughput/10k_lines",
            "value": 2211,
            "unit": "logs/ms"
          },
          {
            "name": "py/throughput/100k_lines",
            "value": 2000,
            "unit": "logs/ms"
          },
          {
            "name": "py/throughput/500k_lines",
            "value": 1943,
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
          "id": "19a05007ac5e57c36a2df7085eedae055274cd07",
          "message": "deps(rust): bump the rust-dependencies group with 4 updates (#36)",
          "timestamp": "2026-04-26T22:02:58+09:00",
          "tree_id": "f2ac5fb2ace2cd6da8762a3f3c78a7142372dd21",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/19a05007ac5e57c36a2df7085eedae055274cd07"
        },
        "date": 1777208629533,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "py/single_line/default_timestamp_ipv4",
            "value": 792393,
            "unit": "ops/s"
          },
          {
            "name": "py/single_line/ipv6_address",
            "value": 739098,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/10_lines",
            "value": 56392,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/100_lines",
            "value": 9470,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/1000_lines",
            "value": 1727,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/10000_lines",
            "value": 185,
            "unit": "ops/s"
          },
          {
            "name": "py/batch/100000_lines",
            "value": 18,
            "unit": "ops/s"
          },
          {
            "name": "py/error_handling/50pct_invalid_100_lines",
            "value": 11543,
            "unit": "ops/s"
          },
          {
            "name": "py/error_handling/50pct_invalid_500_lines",
            "value": 4677,
            "unit": "ops/s"
          },
          {
            "name": "py/error_handling/50pct_invalid_1000_lines",
            "value": 2643,
            "unit": "ops/s"
          },
          {
            "name": "py/throughput/10k_lines",
            "value": 2234,
            "unit": "logs/ms"
          },
          {
            "name": "py/throughput/100k_lines",
            "value": 1979,
            "unit": "logs/ms"
          },
          {
            "name": "py/throughput/500k_lines",
            "value": 1938,
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
          "id": "39a68fc9d78aa8d8d5a6842e52e0a03684e1f83a",
          "message": "fix: Dependabot (#25)\n\n* fix: Dependabot\n\n* update lock",
          "timestamp": "2026-04-04T11:23:09+09:00",
          "tree_id": "5ef55b0b68a0e4fea60143fa47791230aa7a5cc2",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/39a68fc9d78aa8d8d5a6842e52e0a03684e1f83a"
        },
        "date": 1775269610332,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "js/single_line/default_timestamp_ipv4",
            "value": 250135,
            "unit": "ops/s"
          },
          {
            "name": "js/single_line/ipv6_address",
            "value": 244710,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/10_lines",
            "value": 11762,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/100_lines",
            "value": 2757,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/1000_lines",
            "value": 335,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/10000_lines",
            "value": 34,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/500000_lines",
            "value": 1,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_100_lines",
            "value": 3974,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_500_lines",
            "value": 1004,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_1000_lines",
            "value": 525,
            "unit": "ops/s"
          },
          {
            "name": "js/throughput/10k_lines",
            "value": 333,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/100k_lines",
            "value": 297,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/500k_lines",
            "value": 272,
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
          "id": "a3d067cfa05a0b062bd48d5a15cb859ce573c40f",
          "message": "deps(js): bump the js-dependencies group in /bindings/js-fail2ban-log-parser with 4 updates (#29)\n\nBumps the js-dependencies group in /bindings/js-fail2ban-log-parser with 4 updates: [@oxc-node/core](https://github.com/oxc-project/oxc-node), [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/node), [oxlint](https://github.com/oxc-project/oxc/tree/HEAD/npm/oxlint) and [lodash](https://github.com/lodash/lodash).\n\n\nUpdates `@oxc-node/core` from 0.0.35 to 0.1.0\n- [Release notes](https://github.com/oxc-project/oxc-node/releases)\n- [Changelog](https://github.com/oxc-project/oxc-node/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/oxc-project/oxc-node/compare/v0.0.35...v0.1.0)\n\nUpdates `@types/node` from 25.5.0 to 25.5.2\n- [Release notes](https://github.com/DefinitelyTyped/DefinitelyTyped/releases)\n- [Commits](https://github.com/DefinitelyTyped/DefinitelyTyped/commits/HEAD/types/node)\n\nUpdates `oxlint` from 1.57.0 to 1.58.0\n- [Release notes](https://github.com/oxc-project/oxc/releases)\n- [Changelog](https://github.com/oxc-project/oxc/blob/main/npm/oxlint/CHANGELOG.md)\n- [Commits](https://github.com/oxc-project/oxc/commits/oxlint_v1.58.0/npm/oxlint)\n\nUpdates `lodash` from 4.17.23 to 4.18.1\n- [Release notes](https://github.com/lodash/lodash/releases)\n- [Commits](https://github.com/lodash/lodash/compare/4.17.23...4.18.1)\n\n---\nupdated-dependencies:\n- dependency-name: \"@oxc-node/core\"\n  dependency-version: 0.1.0\n  dependency-type: direct:development\n  update-type: version-update:semver-minor\n  dependency-group: js-dependencies\n- dependency-name: \"@types/node\"\n  dependency-version: 25.5.2\n  dependency-type: direct:development\n  update-type: version-update:semver-patch\n  dependency-group: js-dependencies\n- dependency-name: oxlint\n  dependency-version: 1.58.0\n  dependency-type: direct:development\n  update-type: version-update:semver-minor\n  dependency-group: js-dependencies\n- dependency-name: lodash\n  dependency-version: 4.18.1\n  dependency-type: direct:development\n  update-type: version-update:semver-minor\n  dependency-group: js-dependencies\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-04-04T11:30:21+09:00",
          "tree_id": "3384b8d990453429bec0e7240035be6868d76c29",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/a3d067cfa05a0b062bd48d5a15cb859ce573c40f"
        },
        "date": 1775270058818,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "js/single_line/default_timestamp_ipv4",
            "value": 244431,
            "unit": "ops/s"
          },
          {
            "name": "js/single_line/ipv6_address",
            "value": 239091,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/10_lines",
            "value": 10992,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/100_lines",
            "value": 2681,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/1000_lines",
            "value": 330,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/10000_lines",
            "value": 34,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/500000_lines",
            "value": 1,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_100_lines",
            "value": 3886,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_500_lines",
            "value": 996,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_1000_lines",
            "value": 527,
            "unit": "ops/s"
          },
          {
            "name": "js/throughput/10k_lines",
            "value": 324,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/100k_lines",
            "value": 310,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/500k_lines",
            "value": 222,
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
          "id": "633648ddd5d0bc337c640c7ac8a90708fe36b6fb",
          "message": "deps(rust): bump the rust-dependencies group across 1 directory with 2 updates (#26)\n\nBumps the rust-dependencies group with 2 updates: [winnow](https://github.com/winnow-rs/winnow) and [pyo3](https://github.com/pyo3/pyo3).\n\n\nUpdates `winnow` from 1.0.0 to 1.0.1\n- [Changelog](https://github.com/winnow-rs/winnow/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/winnow-rs/winnow/compare/v1.0.0...v1.0.1)\n\nUpdates `pyo3` from 0.28.2 to 0.28.3\n- [Release notes](https://github.com/pyo3/pyo3/releases)\n- [Changelog](https://github.com/PyO3/pyo3/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/pyo3/pyo3/compare/v0.28.2...v0.28.3)\n\n---\nupdated-dependencies:\n- dependency-name: winnow\n  dependency-version: 1.0.1\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n  dependency-group: rust-dependencies\n- dependency-name: pyo3\n  dependency-version: 0.28.3\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n  dependency-group: rust-dependencies\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-04-04T11:37:22+09:00",
          "tree_id": "b151bdc734e9c3c5b75b0f235cf22b45b362a351",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/633648ddd5d0bc337c640c7ac8a90708fe36b6fb"
        },
        "date": 1775270455557,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "js/single_line/default_timestamp_ipv4",
            "value": 244903,
            "unit": "ops/s"
          },
          {
            "name": "js/single_line/ipv6_address",
            "value": 240987,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/10_lines",
            "value": 11311,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/100_lines",
            "value": 2668,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/1000_lines",
            "value": 330,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/10000_lines",
            "value": 34,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/500000_lines",
            "value": 1,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_100_lines",
            "value": 3878,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_500_lines",
            "value": 993,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_1000_lines",
            "value": 525,
            "unit": "ops/s"
          },
          {
            "name": "js/throughput/10k_lines",
            "value": 341,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/100k_lines",
            "value": 285,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/500k_lines",
            "value": 272,
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
          "id": "3e1df40ab9794e775f8c66163b77ecc34d45e717",
          "message": "deps(js): bump the js-dependencies group (#32)",
          "timestamp": "2026-04-13T04:44:20+09:00",
          "tree_id": "cab361f7510c1d1595140cd058ed74be318e6dfd",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/3e1df40ab9794e775f8c66163b77ecc34d45e717"
        },
        "date": 1776023277815,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "js/single_line/default_timestamp_ipv4",
            "value": 245432,
            "unit": "ops/s"
          },
          {
            "name": "js/single_line/ipv6_address",
            "value": 243083,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/10_lines",
            "value": 13410,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/100_lines",
            "value": 3018,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/1000_lines",
            "value": 356,
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
            "value": 4426,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_500_lines",
            "value": 1057,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_1000_lines",
            "value": 544,
            "unit": "ops/s"
          },
          {
            "name": "js/throughput/10k_lines",
            "value": 356,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/100k_lines",
            "value": 300,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/500k_lines",
            "value": 279,
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
          "id": "475e65496921bc5b071276002833549ba2262f0d",
          "message": "deps(js): bump the js-dependencies group in /bindings/js-fail2ban-log-parser with 4 updates (#35)\n\n* deps(js): bump the js-dependencies group\n\nBumps the js-dependencies group in /bindings/js-fail2ban-log-parser with 4 updates: [@napi-rs/cli](https://github.com/napi-rs/napi-rs), [oxlint](https://github.com/oxc-project/oxc/tree/HEAD/npm/oxlint), [prettier](https://github.com/prettier/prettier) and [typescript](https://github.com/microsoft/TypeScript).\n\n\nUpdates `@napi-rs/cli` from 3.6.1 to 3.6.2\n- [Release notes](https://github.com/napi-rs/napi-rs/releases)\n- [Commits](https://github.com/napi-rs/napi-rs/compare/@napi-rs/cli@3.6.1...@napi-rs/cli@3.6.2)\n\nUpdates `oxlint` from 1.59.0 to 1.60.0\n- [Release notes](https://github.com/oxc-project/oxc/releases)\n- [Changelog](https://github.com/oxc-project/oxc/blob/main/npm/oxlint/CHANGELOG.md)\n- [Commits](https://github.com/oxc-project/oxc/commits/oxlint_v1.60.0/npm/oxlint)\n\nUpdates `prettier` from 3.8.2 to 3.8.3\n- [Release notes](https://github.com/prettier/prettier/releases)\n- [Changelog](https://github.com/prettier/prettier/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/prettier/prettier/compare/3.8.2...3.8.3)\n\nUpdates `typescript` from 6.0.2 to 6.0.3\n- [Release notes](https://github.com/microsoft/TypeScript/releases)\n- [Commits](https://github.com/microsoft/TypeScript/compare/v6.0.2...v6.0.3)\n\n---\nupdated-dependencies:\n- dependency-name: \"@napi-rs/cli\"\n  dependency-version: 3.6.2\n  dependency-type: direct:development\n  update-type: version-update:semver-patch\n  dependency-group: js-dependencies\n- dependency-name: oxlint\n  dependency-version: 1.60.0\n  dependency-type: direct:development\n  update-type: version-update:semver-minor\n  dependency-group: js-dependencies\n- dependency-name: prettier\n  dependency-version: 3.8.3\n  dependency-type: direct:development\n  update-type: version-update:semver-patch\n  dependency-group: js-dependencies\n- dependency-name: typescript\n  dependency-version: 6.0.3\n  dependency-type: direct:development\n  update-type: version-update:semver-patch\n  dependency-group: js-dependencies\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\n\n* drop node 20 testing\n\n* drop node 20 for 22\n\n* more cleanup\n\n---------\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: adrianvillanueva997 <adrianvillanueva997@gmail.com>\nCo-authored-by: Adrián Villanueva <16082421+adrianvillanueva997@users.noreply.github.com>",
          "timestamp": "2026-04-19T22:56:03+09:00",
          "tree_id": "a0705cdad86d9f5b892c70e1b34de245291b44e0",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/475e65496921bc5b071276002833549ba2262f0d"
        },
        "date": 1776607185879,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "js/single_line/default_timestamp_ipv4",
            "value": 261332,
            "unit": "ops/s"
          },
          {
            "name": "js/single_line/ipv6_address",
            "value": 255720,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/10_lines",
            "value": 12368,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/100_lines",
            "value": 2959,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/1000_lines",
            "value": 349,
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
            "value": 4284,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_500_lines",
            "value": 1050,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_1000_lines",
            "value": 557,
            "unit": "ops/s"
          },
          {
            "name": "js/throughput/10k_lines",
            "value": 319,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/100k_lines",
            "value": 323,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/500k_lines",
            "value": 228,
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
          "id": "19a05007ac5e57c36a2df7085eedae055274cd07",
          "message": "deps(rust): bump the rust-dependencies group with 4 updates (#36)",
          "timestamp": "2026-04-26T22:02:58+09:00",
          "tree_id": "f2ac5fb2ace2cd6da8762a3f3c78a7142372dd21",
          "url": "https://github.com/adrianvillanueva997/fail2ban-log-parser/commit/19a05007ac5e57c36a2df7085eedae055274cd07"
        },
        "date": 1777208799239,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "js/single_line/default_timestamp_ipv4",
            "value": 350382,
            "unit": "ops/s"
          },
          {
            "name": "js/single_line/ipv6_address",
            "value": 345058,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/10_lines",
            "value": 18039,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/100_lines",
            "value": 4364,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/1000_lines",
            "value": 516,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/10000_lines",
            "value": 53,
            "unit": "ops/s"
          },
          {
            "name": "js/batch/500000_lines",
            "value": 1,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_100_lines",
            "value": 6215,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_500_lines",
            "value": 1525,
            "unit": "ops/s"
          },
          {
            "name": "js/error_handling/50pct_invalid_1000_lines",
            "value": 801,
            "unit": "ops/s"
          },
          {
            "name": "js/throughput/10k_lines",
            "value": 522,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/100k_lines",
            "value": 466,
            "unit": "logs/ms"
          },
          {
            "name": "js/throughput/500k_lines",
            "value": 293,
            "unit": "logs/ms"
          }
        ]
      }
    ]
  }
}