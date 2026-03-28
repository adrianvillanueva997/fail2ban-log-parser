import { Bench } from "tinybench";
import { writeFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "../index.js";

const SINGLE_LINE =
  "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1";
const SINGLE_LINE_IPV6 =
  "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 2001:db8::1";

// Generate log batches of various sizes
function generateLogBatch(n: number): string {
  const lines = [
    "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100",
    "2024-01-15 14:32:02,123 fail2ban.filter [12345] INFO [sshd] Found 10.0.0.5",
    "2024-01-15 14:32:03,456 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.100",
    "2024-01-15 14:32:04,789 fail2ban.actions [12345] INFO [sshd] Unban 10.0.0.5",
    "2024-01-15 14:32:05,000 fail2ban.server [12345] WARNING [sshd] Found 172.16.0.1",
    "2024-01-15 14:32:06,100 fail2ban.filter [12345] ERROR [sshd] Failed 8.8.8.8",
    "2024-01-15 14:32:07,200 fail2ban.filter [12345] DEBUG [sshd] Ignore 127.0.0.1",
    "2024-01-15 14:32:08,300 fail2ban.actions [12345] NOTICE [sshd] Restore 5.6.7.8",
  ];
  return Array(n)
    .fill(null)
    .map((_, i) => lines[i % lines.length])
    .join("\n");
}

// Generate mixed valid/invalid log batch
function generateMixedLogBatch(n: number): string {
  const validLines = [
    "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1",
    "2024-01-15 14:32:10,123 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1",
    "2024-01-15 14:33:00,456 fail2ban.filter [12345] INFO [httpd] Found 10.0.0.1",
  ];
  const invalidLines = [
    "invalid log line that cannot be parsed",
    "corrupted data here",
    "not a valid fail2ban entry",
  ];
  const result: string[] = [];
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      result.push(validLines[i % validLines.length]);
    } else {
      result.push(invalidLines[i % invalidLines.length]);
    }
  }
  return result.join("\n");
}

// BenchmarkResult type for JSON output
interface BenchmarkResult {
  name: string;
  value: number;
  unit?: string;
}

const results: BenchmarkResult[] = [];

// SINGLE LINE BENCHMARKS

console.log("\n📊 Single Line Parsing\n");
const singleBench = new Bench({ name: "single_line" });

singleBench.add("ipv4", () => {
  parse(SINGLE_LINE);
});

singleBench.add("ipv6", () => {
  parse(SINGLE_LINE_IPV6);
});

await singleBench.run();
console.table(singleBench.table());

// Collect results (throughput in ops/s - bigger is better)
for (const task of singleBench.tasks) {
  results.push({
    name: `single_line/${task.name}`,
    value: Math.round(task.result?.throughput?.mean ?? 0),
    unit: "ops/s",
  });
}

// ============================================================================
// BATCH PARSING BENCHMARKS
// ============================================================================

console.log("\n📊 Batch Parsing (Various Sizes)\n");
const batchSizes = [10, 100, 1_000, 10_000];
const batchBench = new Bench({ name: "batch_parsing" });

for (const size of batchSizes) {
  const batch = generateLogBatch(size);
  batchBench.add(`${size} lines`, () => {
    const [logs, errors] = parse(batch);
    return logs.length + errors.length;
  });
}

await batchBench.run();
console.table(batchBench.table());

// Collect results (throughput - bigger is better)
for (const task of batchBench.tasks) {
  results.push({
    name: `batch/${task.name}`,
    value: Math.round(task.result?.throughput?.mean ?? 0),
    unit: "ops/s",
  });
}

// ============================================================================
// ERROR HANDLING BENCHMARKS
// ============================================================================

console.log("\n📊 Error Handling (Mixed Valid/Invalid)\n");
const errorBench = new Bench({ name: "error_handling" });

const mixed100 = generateMixedLogBatch(100);
const mixed500 = generateMixedLogBatch(500);
const mixed1000 = generateMixedLogBatch(1_000);

errorBench.add("100 lines (50% invalid)", () => {
  const [logs, errors] = parse(mixed100);
  return logs.length + errors.length;
});

errorBench.add("500 lines (50% invalid)", () => {
  const [logs, errors] = parse(mixed500);
  return logs.length + errors.length;
});

errorBench.add("1000 lines (50% invalid)", () => {
  const [logs, errors] = parse(mixed1000);
  return logs.length + errors.length;
});

await errorBench.run();
console.table(errorBench.table());

// Collect results (throughput - bigger is better)
for (const task of errorBench.tasks) {
  results.push({
    name: `error_handling/${task.name}`,
    value: Math.round(task.result?.throughput?.mean ?? 0),
    unit: "ops/s",
  });
}

// THROUGHPUT COMPARISON

console.log("\n📊 Throughput Analysis\n");
console.log("Calculating throughput (logs/ms)...\n");

const batch10k = generateLogBatch(10_000);
const batch100k = generateLogBatch(100_000);

// Measure 10k batch
const start10k = performance.now();
const [logs10k] = parse(batch10k);
const time10k = performance.now() - start10k;
const throughput10k = Math.round(logs10k.length / time10k);

results.push({
  name: "throughput/10k_lines",
  value: throughput10k,
  unit: "logs/ms",
});

console.log(
  `✓ 10,000 lines: ${time10k.toFixed(2)}ms (${throughput10k} logs/ms)`,
);

// Measure 100k batch
const start100k = performance.now();
const [logs100k] = parse(batch100k);
const time100k = performance.now() - start100k;
const throughput100k = Math.round(logs100k.length / time100k);

results.push({
  name: "throughput/100k_lines",
  value: throughput100k,
  unit: "logs/ms",
});

console.log(
  `✓ 100,000 lines: ${time100k.toFixed(2)}ms (${throughput100k} logs/ms)`,
);

// OUTPUT RESULTS

console.log("\n✅ Benchmark Summary");
console.log("━".repeat(80));
console.log("✓ Single line parsing (IPv4, IPv6 variations)");
console.log("✓ Batch parsing (10 to 10,000 lines)");
console.log("✓ Error handling with mixed valid/invalid content");
console.log("✓ Throughput analysis at scale");
console.log("━".repeat(80));

// Write JSON results to a file for benchmark-action

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = `${__dirname}/benchmark-results.json`;

writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
console.log(`\n✓ Results written to ${outputPath}`);
