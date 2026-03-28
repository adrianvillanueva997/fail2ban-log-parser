# Fail2Ban Log Parser - Examples

This directory contains practical examples demonstrating how to use the `fail2banlogparser` JavaScript binding.

## Running Examples

All examples are available in both JavaScript and TypeScript. Make sure you have the package built:

```bash
# From the js-fail2ban-log-parser directory
pnpm install
pnpm build

# Run JavaScript examples
node examples/parse-log.js
node examples/batch-processing.js
node examples/enum-usage.js
node examples/error-handling.js

# Run TypeScript examples (requires tsx or compilation)
npx tsx examples/parse-log.ts
npx tsx examples/batch-processing.ts
npx tsx examples/enum-usage.ts
npx tsx examples/error-handling.ts
```

Alternatively, if you have TypeScript installed globally:

```bash
# Compile and run
npx tsc examples/parse-log.ts --lib es2020 --module es2020 --target es2020 && node examples/parse-log.js
```

## Examples Overview

Each example is available in both **JavaScript** (`.js`) and **TypeScript** (`.ts`) versions. The TypeScript versions provide:

- Full type safety with TypeScript enums and interfaces
- Better IDE autocomplete and compile-time error detection
- Helper functions with proper type guards
- Detailed type annotations for clarity

### 1. **parse-log** - Basic Log Parsing

The simplest example: parse fail2ban log content and display the results.

**Available as:**

- `parse-log.js` - JavaScript version
- `parse-log.ts` - TypeScript version with full type safety

**What it demonstrates:**

- Basic `parse()` function usage
- Accessing parsed logs and errors via tuple destructuring
- Reading log properties (timestamp, jail, event, level, IP, PID)
- Converting numeric enum values back to names for display
- Handling parse errors

**Key concepts:**

```javascript
const [logs, errors] = parse(logContent);

logs.forEach(log => {
  console.log(log.timestamp);  // "2024-01-15 14:32:01,847"
  console.log(log.jail);       // "sshd", "httpd", etc.
  console.log(log.event);      // numeric enum value (0-7)
  console.log(log.level);      // numeric enum value (0-4)
  console.log(log.ip);         // "192.168.1.1" or undefined
  console.log(log.pid);        // 12345
});
```

### 2. **batch-processing** - Processing Multiple Files

Demonstrates parallel processing and aggregation, useful for analyzing multiple log files.

**Available as:**

- `batch-processing.js` - JavaScript version
- `batch-processing.ts` - TypeScript version with interfaces and type-safe operations

**What it demonstrates:**

- Processing multiple logs in parallel with `Promise.all()`
- Aggregating results across multiple files
- Performance timing with `process.hrtime.bigint()`
- Filtering results (e.g., extracting all ban actions)
- Creating aggregate statistics
- Type-safe batch operation handling (TypeScript)

**Key concepts:**

```javascript
// Process files in parallel
const results = await Promise.all(
  filePaths.map(filePath => processFile(filePath))
);

// Aggregate and filter
const allBans = results
  .flatMap(r => r.bans)
  .filter(log => log.event === Fail2BanEvent.Ban);
```

**TypeScript example with interfaces:**

```typescript
interface FileProcessingResult {
  filePath: string;
  logsCount: number;
  errorsCount: number;
  parseTimeNs: number;
  bans: Fail2BanLog[];
  jails: Set<string>;
}
```

**Use cases:**

- Analyzing fail2ban logs across multiple servers
- Batch processing archived logs
- Historical trend analysis

### 3. **enum-usage** - Working with Enums

Complete reference for using the exported enum types with proper type safety.

**Available as:**

- `enum-usage.js` - JavaScript version with enum mappings
- `enum-usage.ts` - TypeScript version with type guards and safe helpers

**Available enums:**

#### Fail2BanHeaderType

Maps the source of the log line:

- `Filter` (0) - Log from filter component
- `Actions` (1) - Log from actions component
- `Server` (2) - Log from server component

#### Fail2BanLevel

Log severity levels:

- `Info` (0) - Informational
- `Notice` (1) - Notice
- `Warning` (2) - Warning
- `Error` (3) - Error
- `Debug` (4) - Debug

#### Fail2BanEvent

Action events:

- `Found` (0) - Suspicious activity detected
- `Ban` (1) - IP banned
- `Unban` (2) - IP unbanned
- `Jumpstart` (3) - Jumpstart recovery
- `MaxRetry` (4) - Max retries exceeded
- `AddIP` (5) - IP added to jail
- `DelIP` (6) - IP deleted from jail
- `Unknown` (7) - Unknown event type

**Key concepts:**

```javascript
// Direct comparison with enum constants (most efficient)
if (log.event === Fail2BanEvent.Ban) {
  // This is fast and recommended
}

// Reverse lookup (value to name) using a mapping object
const EventNames = {
  0: 'Found',
  1: 'Ban',
  2: 'Unban',
  // ... etc
};
const eventName = EventNames[log.event];

// Note: Since TypeScript const enums compile to numeric literals,
// we need to use numeric values directly, not Object.entries()
```

**Common filtering patterns:**

```javascript
// All ban actions
const bans = logs.filter(log => log.event === Fail2BanEvent.Ban);

// All errors
const errorLogs = logs.filter(log => log.level === Fail2BanLevel.Error);

// Specific jail activity
const sshBans = logs.filter(
  log => log.jail === 'sshd' && log.event === Fail2BanEvent.Ban
);

// Recent high-severity events
const recentWarnings = logs.filter(
  log => log.level >= Fail2BanLevel.Warning
);
```

### 4. **error-handling** - Resilient Processing

Best practices for handling parse errors in production scenarios with error recovery strategies.

**Available as:**

- `error-handling.js` - JavaScript version with practical error patterns
- `error-handling.ts` - TypeScript version with type-safe error handlers and validation

**What it demonstrates:**

- Handling mixed valid/invalid logs
- Error rate calculation
- Error pattern analysis
- Quality validation
- Recovery strategies

**Error handling strategies:**

1. **Skip Invalid Lines - Keep Going**

   ```javascript
   const [logs, errors] = parse(content);
   // Use logs - errors are safely separated
   processValidLogs(logs);
   ```

2. **Track Error Patterns**

   ```javascript
   const patterns = {};
   errors.forEach(e => {
     const pattern = e.line.substring(0, 20);
     patterns[pattern] = (patterns[pattern] || 0) + 1;
   });
   // Find common error patterns
   ```

3. **Alert on High Error Rates**

   ```javascript
   const errorRate = errors.length / (logs.length + errors.length);
   if (errorRate > 0.1) {  // 10% threshold
     console.warn('High parse error rate detected');
   }
   ```

4. **Validate Log Quality**

   ```javascript
   const logsWithoutIP = logs.filter(
     log => !log.ip && (log.event === Ban || log.event === Unban)
   );
   if (logsWithoutIP.length > 0) {
     console.warn(`${logsWithoutIP.length} ban actions without IP`);
   }
   ```

## Performance Tips

### 1. **Use Numeric Enum Comparisons**

Numeric comparisons are faster than string lookups:

```javascript
// Fast (numeric comparison)
if (log.event === Fail2BanEvent.Ban) { }

// Slower (string lookup)
const name = Object.entries(Fail2BanEvent).find(([,v]) => v === log.event)?.[0];
if (name === 'Ban') { }
```

### 2. **Batch Processing**

Process logs in batches rather than line-by-line:

```javascript
// Fast: parse entire buffer at once
const { logs } = parse(entireBuffer);

// Slow: parse repeatedly
const lines = buffer.split('\n');
lines.forEach(line => parse(line));  // Don't do this!
```

### 3. **Filter Before Complex Operations**

Filter early to reduce subsequent processing:

```javascript
// Good: filter first, then process
const bans = logs.filter(log => log.event === Ban);
const recentBans = bans.filter(log => isRecent(log.timestamp));

// Less efficient: nested filtering
const result = logs.filter(log =>
  log.event === Ban && isRecent(log.timestamp)
);
```

## Common Patterns

### Monitoring Specific Jails

```javascript
const jailsOfInterest = ['sshd', 'httpd'];
const interestingLogs = logs.filter(log =>
  jailsOfInterest.includes(log.jail)
);
```

### Counting Bans by IP

```javascript
const bansByIP = {};
logs
  .filter(log => log.event === Fail2BanEvent.Ban)
  .forEach(log => {
    bansByIP[log.ip] = (bansByIP[log.ip] || 0) + 1;
  });
```

### Finding Recently Added Jails

```javascript
const newJails = new Set(
  logs
    .filter(log => log.event === Fail2BanEvent.AddIP)
    .map(log => log.jail)
);
```

### Alerting on Errors

```javascript
const [logs, errors] = parse(content);
if (errors.length > 0) {
  console.error(`Parse errors on lines: ${errors.map(e => e.lineNumber).join(', ')}`);
}
```

## API Reference

### `parse(input: string): [logs, errors]`

Parses fail2ban log content and returns a tuple.

**Parameters:**

- `input` (string): Log content to parse

**Returns:**

A tuple `[logs, errors]` where:

- `logs` (Array): List of successfully parsed log entries
  - `timestamp?: string` - RFC3339 formatted timestamp
  - `header?: Fail2BanHeaderType` - Source of the log (Filter/Actions/Server)
  - `pid?: number` - Process ID
  - `level?: Fail2BanLevel` - Log severity level
  - `jail?: string` - Jail name (e.g., "sshd", "httpd")
  - `event?: Fail2BanEvent` - Event type (Found/Ban/Unban/etc)
  - `ip?: string` - IP address (when applicable)

- `errors` (Array): List of lines that failed to parse
  - `lineNumber: number` - Line number (1-indexed)
  - `line: string` - The unparseable line content

**Example:**

```typescript
const [logs, errors] = parse(input);
// logs: Fail2BanLog[]
// errors: ParseError[]
```

## Troubleshooting

### "Module not found" errors

Make sure you've built the native addon:

```bash
pnpm build
```

### Performance issues

- Use batch processing instead of line-by-line
- Avoid repeated enum lookups in hot loops
- Consider streaming for very large files

### Empty results

Check the `errors` array to see which lines failed to parse:

```javascript
const { logs, errors } = parse(content);
if (logs.length === 0 && errors.length > 0) {
  console.log('All lines failed to parse:', errors);
}
```

## Further Reading

- [Main README](./README.md) - Installation and usage
- [API Documentation](./index.d.ts) - TypeScript definitions
- [Test Cases](./__test__/index.spec.ts) - More usage examples
