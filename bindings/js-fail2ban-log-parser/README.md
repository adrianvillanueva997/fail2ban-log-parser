# fail2banlogparser

> High-performance fail2ban log parser implemented in Rust with Node.js bindings.

## Installation

```bash
npm install fail2banlogparser
# or with pnpm
pnpm add fail2banlogparser
```

## Usage

```javascript
const { parse } = require('fail2banlogparser');

const input = `
2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1
2024-01-15 14:32:10,123 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1
`;

const [logs, errors] = parse(input);

console.log(logs[0]);
// {
//   timestamp: '2024-01-15T14:32:01.847Z',
//   header: 0,        // HeaderType.Filter
//   pid: 12345,
//   level: 0,         // Level.Info
//   jail: 'sshd',
//   event: 0,         // Event.Found
//   ip: '192.168.1.1'
// }
```

## Development

### Requirements

- Rust 1.85.0+
- Node.js 18.0.0+
- pnpm

### Build

```bash
pnpm install
pnpm build
```

### Test

```bash
pnpm test
```

### Benchmarks

```bash
pnpm bench
```

## License

APACHE

## Test in local

- pnpm
- pnpm build
- pnpm test
