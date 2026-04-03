# fail2ban-log-parser WASM Bindings

High-performance fail2ban log parser implemented in Rust, compiled to WebAssembly.

## Prerequisites

- Rust (stable)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/)
- Node.js 20.19+ (for running examples)

## Build

```bash
make build
# or
wasm-pack build
```

## Test

```bash
make test
# or
wasm-pack test --node
```

## Usage

```javascript
import init, { parse } from "fail2ban-log-parser-wasm";

await init();

const logs = `2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1
2024-01-15 14:32:02,100 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1`;

const result = parse(logs);

console.log("Parsed logs:", result.logs);
console.log("Errors:", result.errors);
```

### Output Structure

```typescript
// These enums mirror what `wasm-bindgen` typically generates: numeric enums.
// Check the generated `pkg/*.d.ts` to confirm the exact names and values.
export enum Fail2BanHeader {
    Filter = 0,
    Actions = 1,
    Server = 2,
}

export enum Fail2BanLevel {
    Info = 0,
    Notice = 1,
    Warning = 2,
    Error = 3,
    Debug = 4,
}

export enum Fail2BanEvent {
    Found = 0,
    Ban = 1,
    Unban = 2,
    Restore = 3,
    Ignore = 4,
    AlreadyBanned = 5,
    Failed = 6,
    Unknown = 7,
}

interface Fail2BanLog {
    // Fields originating from `Option<T>` in Rust are represented as `T | undefined`
    // in the generated TypeScript, which we model here using optional properties.
    timestamp?: string;           // ISO 8601 format
    header?: Fail2BanHeader;
    pid?: number;
    level?: Fail2BanLevel;
    jail?: string;
    event?: Fail2BanEvent;
    ip?: string;
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
import init, { parse } from "fail2ban-log-parser-wasm";

await init();

const result = parse(logString);
console.log(result.logs, result.errors);
```
