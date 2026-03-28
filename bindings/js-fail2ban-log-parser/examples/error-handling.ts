#!/usr/bin/env node

/**
 * Example: Error handling and resilience with TypeScript
 *
 * Best practices for handling parse errors in production scenarios
 * with type safety and proper error recovery patterns.
 */

import { parse, Fail2BanLog, ParseError, Fail2BanEvent } from "../index";

// Type-safe result wrapper
interface ParseWithMetadata {
	logs: Fail2BanLog[];
	errors: ParseError[];
	metadata: {
		successRate: number;
		errorRate: number;
		totalLines: number;
	};
}

interface ErrorPattern {
	pattern: string;
	count: number;
	examples: string[];
}

/**
 * Parse with error summary and metadata
 */
function parseWithSummary(
	content: string,
	source: string = "log",
): ParseWithMetadata {
	console.log(`\n--- Processing ${source} ---`);

	const [logs, errors] = parse(content);
	const totalLines = logs.length + errors.length;
	const successRate = totalLines > 0 ? (logs.length / totalLines) * 100 : 0;
	const errorRate = 100 - successRate;

	console.log(`✓ Parsed: ${logs.length} entries (${successRate.toFixed(1)}%)`);
	console.log(`✗ Errors: ${errors.length} entries (${errorRate.toFixed(1)}%)`);

	return {
		logs,
		errors,
		metadata: {
			successRate,
			errorRate,
			totalLines,
		},
	};
}

/**
 * Parse with recovery strategies and analysis
 */
function parseWithRecovery(content: string): ParseWithMetadata {
	const [logs, errors] = parse(content);
	const totalLines = logs.length + errors.length;

	console.log("\n=== Error Recovery Strategy ===");
	console.log(`Total input lines (approx): ${totalLines}`);
	console.log(
		`Successfully parsed: ${logs.length} (${((logs.length / totalLines) * 100).toFixed(1)}%)`,
	);
	console.log(
		`Failed to parse: ${errors.length} (${((errors.length / totalLines) * 100).toFixed(1)}%)`,
	);

	// Strategy 1: Use only valid logs
	console.log("\n→ Strategy 1: Skip invalid lines and process valid logs");
	console.log(`  Processing ${logs.length} valid entries`);

	// Strategy 2: Analyze error patterns
	console.log("\n→ Strategy 2: Track error patterns for troubleshooting");
	const errorPatterns = analyzeErrorPatterns(errors);
	errorPatterns.slice(0, 3).forEach((pattern) => {
		console.log(
			`  "${pattern.pattern}..." appears in ${pattern.count} error(s)`,
		);
	});

	// Strategy 3: Alert on high error rates
	const errorRate = (errors.length / totalLines) * 100;
	console.log("\n→ Strategy 3: Alert on high error rates");
	if (errorRate > 10) {
		console.log(
			`  ⚠️  WARNING: Error rate is ${errorRate.toFixed(1)}% (threshold: 10%)`,
		);
	} else {
		console.log(`  ✓ Error rate is acceptable (${errorRate.toFixed(1)}%)`);
	}

	return {
		logs,
		errors,
		metadata: {
			successRate: (logs.length / totalLines) * 100,
			errorRate,
			totalLines,
		},
	};
}

/**
 * Analyze error patterns to identify common failure modes
 */
function analyzeErrorPatterns(errors: ParseError[]): ErrorPattern[] {
	const patterns = new Map<string, { count: number; examples: string[] }>();

	errors.forEach((error) => {
		const pattern = error.line.substring(0, 20);
		const existing = patterns.get(pattern) || { count: 0, examples: [] };
		existing.count++;
		if (existing.examples.length < 2) {
			existing.examples.push(error.line);
		}
		patterns.set(pattern, existing);
	});

	return Array.from(patterns.entries())
		.map(([pattern, data]) => ({
			pattern,
			count: data.count,
			examples: data.examples,
		}))
		.sort((a, b) => b.count - a.count);
}

/**
 * Validate log quality with type-safe guards
 */
function validateLogQuality(logs: Fail2BanLog[]): void {
	console.log("\n=== Log Quality Checks ===");

	// Check for required fields
	const logsWithoutTimestamp = logs.filter((log) => !log.timestamp).length;
	const logsWithoutJail = logs.filter((log) => !log.jail).length;
	const logsWithoutLevel = logs.filter((log) => log.level === undefined).length;

	console.log(
		`✓ All timestamps present: ${logsWithoutTimestamp === 0 ? "PASS" : "FAIL"}`,
	);
	console.log(
		`✓ All jails present: ${logsWithoutJail === 0 ? "FAIL" : "PASS"}`,
	);
	console.log(
		`✓ All levels present: ${logsWithoutLevel === 0 ? "PASS" : "FAIL"}`,
	);

	// Check for suspicious values (ban/unban without IP)
	const suspiciousActions = logs.filter(
		(log) =>
			!log.ip &&
			(log.event === Fail2BanEvent.Ban || log.event === Fail2BanEvent.Unban),
	);

	if (suspiciousActions.length > 0) {
		console.log(
			`⚠️  Found ${suspiciousActions.length} ban/unban action(s) without IP address`,
		);
	} else {
		console.log(`✓ All ban/unban actions have IP addresses`);
	}
}

// Example 1: Clean logs
console.log("=== Example 1: Clean Input ===");
const cleanInput = `2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1
2024-01-15 14:32:10,123 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1
2024-01-15 14:33:00,456 fail2ban.filter [12345] INFO [httpd] Found 10.0.0.1`;

const cleanResult = parseWithSummary(cleanInput, "clean log");

// Example 2: Logs with errors
console.log("\n\n=== Example 2: Input with Errors ===");
const dirtyInput = `2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1
This is not a valid fail2ban log line
2024-01-15 14:32:10,123 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1
corrupted data here
2024-01-15 14:33:00,456 fail2ban.filter [12345] INFO [httpd] Found 10.0.0.1
invalid line format
2024-01-15 14:34:30,789 fail2ban.actions [12345] NOTICE [httpd] Ban 10.0.0.1`;

const result = parseWithRecovery(dirtyInput);
validateLogQuality(result.logs);

// Example 3: Production error handling pattern
console.log("\n\n=== Example 3: Recommended Error Handling Pattern ===");
console.log(`
// Type-safe pattern: Try parsing, handle errors gracefully
function handleLogParsing(logContent: string): boolean {
  try {
    const [logs, errors] = parse(logContent);

    if (errors.length > 0) {
      console.warn('Warning: ' + errors.length + ' lines could not be parsed');
      // Process what you can
    }

    // Validate the logs you received
    if (logs.length === 0 && errors.length > 0) {
      throw new Error('No valid logs parsed and errors present');
    }

    // Process valid logs with type safety
    processValidLogs(logs);

    // Optionally track error patterns for notification
    if (errors.length > logs.length * 0.2) {
      notifyOps('High parse error rate: ' + errors.length + ' errors');
    }

    return true;
  } catch (error) {
    console.error('Parse operation failed:', error instanceof Error ? error.message : 'Unknown error');
    // Handle gracefully - maybe use cached data or notify
    return false;
  }
}

// Helper functions (type-safe)
function processValidLogs(logs: Fail2BanLog[]): void {
  // Your logic here
}

function notifyOps(message: string): void {
  // Your notification logic
}
`);
