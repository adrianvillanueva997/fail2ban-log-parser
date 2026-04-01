# fail2ban-log-parser WASM Bindings

High-performance fail2ban log parser implemented in Rust, compiled to WebAssembly.

## Prerequisites

- Rust (stable)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/)
- Node.js 18+ (for running examples)

## Build

```bash
make build
# or
wasm-pack build --target node
```

## Test

```bash
make test
# or
wasm-pack test --node
```

## Usage

```javascript
const { parse } = require("./pkg");

const logs = `2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1
2024-01-15 14:32:02,100 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1`;

const result = parse(logs);

console.log("Parsed logs:", result.logs);
console.log("Errors:", result.errors);
```

### Output Structure

```typescript
interface Fail2BanLog {
    timestamp: string | null;      // ISO 8601 format
    header: "Filter" | "Actions" | "Server" | null;
    pid: number | null;
    level: "Info" | "Notice" | "Warning" | "Error" | "Debug" | null;
    jail: string | null;
    event: "Found" | "Ban" | "Unban" | "Restore" | "Ignore" | "AlreadyBanned" | "Failed" | "Unknown" | null;
    ip: string | null;
}

interface ParseResult {
    logs: Fail2BanLog[];
    errors: ParseError[];
}

interface ParseError {
    line_number: number;
    line: string;
}
```

## Run Example

The `examples/` directory contains a Svelte + Vite demo app.

```bash
# Build the WASM package first
make build

# Then run the demo
cd examples
pnpm install
pnpm dev
```

Open the URL printed by Vite (typically `http://localhost:5173`).

### Using in your own project

```javascript
import init, { parse } from "wasm-fail2ban-log-parser";

await init();

const result = parse(logString);
console.log(result.logs, result.errors);
```
