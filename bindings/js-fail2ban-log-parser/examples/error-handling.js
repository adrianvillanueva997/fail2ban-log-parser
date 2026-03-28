#!/usr/bin/env node

/**
 * Example: Error handling and resilience
 *
 * This example demonstrates best practices for handling parse errors
 * and implementing resilient log processing pipelines.
 */

const { parse } = require('../index');
const fs = require('fs');
const path = require('path');

/**
 * Parse with error summary
 */
function parseWithSummary(content, source = 'log') {
  console.log(`\n--- Processing ${source} ---`);

  const [logs, errors] = parse(content);

  console.log(`✓ Parsed: ${logs.length} entries`);
  console.log(`✗ Errors: ${errors.length} entries`);

  if (errors.length > 0) {
    console.log('\nFirst 3 errors:');
    errors.slice(0, 3).forEach((error) => {
      console.log(`  Line ${error.lineNumber}: "${error.line}"`);
    });
    if (errors.length > 3) {
      console.log(`  ... and ${errors.length - 3} more errors`);
    }
  }

  return { logs, errors };
}

/**
 * Filter out problematic logs with error recovery
 */
function parseWithRecovery(content) {
  const [logs, errors] = parse(content);

  console.log('\n=== Error Recovery Strategy ===');
  console.log(`Total input lines (approx): ${content.split('\n').length - 1}`);
  console.log(`Successfully parsed: ${logs.length} (${((logs.length / (logs.length + errors.length)) * 100).toFixed(1)}%)`);
  console.log(`Failed to parse: ${errors.length} (${((errors.length / (logs.length + errors.length)) * 100).toFixed(1)}%)`);

  // Strategy 1: Use only valid logs
  console.log('\n→ Strategy 1: Skip invalid lines and process valid logs');
  const validLogsCount = logs.length;
  console.log(`  Processing ${validLogsCount} valid entries`);

  // Strategy 2: Log errors for later investigation
  console.log('\n→ Strategy 2: Track error patterns for troubleshooting');
  const errorsByLine = {};
  errors.forEach((error) => {
    const firstTwentyChars = error.line.substring(0, 20);
    errorsByLine[firstTwentyChars] = (errorsByLine[firstTwentyChars] || 0) + 1;
  });
  Object.entries(errorsByLine)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .forEach(([pattern, count]) => {
      console.log(`  "${pattern}..." appears in ${count} error(s)`);
    });

  // Strategy 3: Alert on high error rates
  console.log('\n→ Strategy 3: Alert on high error rates');
  const errorRate = (errors.length / (logs.length + errors.length)) * 100;
  if (errorRate > 10) {
    console.log(`  ⚠️  WARNING: Error rate is ${errorRate.toFixed(1)}% (threshold: 10%)`);
  } else {
    console.log(`  ✓ Error rate is acceptable (${errorRate.toFixed(1)}%)`);
  }

  return { logs, errors };
}

/**
 * Validate log quality
 */
function validateLogQuality(logs) {
  console.log('\n=== Log Quality Checks ===');

  // Check for required fields
  const logsWithoutTimestamp = logs.filter((log) => !log.timestamp);
  const logsWithoutJail = logs.filter((log) => !log.jail);
  const logsWithoutLevel = logs.filter((log) => log.level === undefined);

  console.log(`✓ All timestamps present: ${logsWithoutTimestamp.length === 0 ? 'PASS' : 'FAIL'}`);
  console.log(`✓ All jails present: ${logsWithoutJail.length === 0 ? 'PASS' : 'FAIL'}`);
  console.log(`✓ All levels present: ${logsWithoutLevel.length === 0 ? 'PASS' : 'FAIL'}`);

  // Check for suspicious values
  const suspiciousIPs = logs.filter((log) => !log.ip && (log.event === 1 || log.event === 2)); // Ban or Unban without IP
  if (suspiciousIPs.length > 0) {
    console.log(`⚠️  Found ${suspiciousIPs.length} ban/unban action(s) without IP address`);
  } else {
    console.log(`✓ All ban/unban actions have IP addresses`);
  }
}

// Example 1: Clean logs
console.log('=== Example 1: Clean Input ===');
const cleanInput = `2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1
2024-01-15 14:32:10,123 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1
2024-01-15 14:33:00,456 fail2ban.filter [12345] INFO [httpd] Found 10.0.0.1`;

const { logs: logs1, errors: errors1 } = parseWithSummary(cleanInput, 'clean log');

// Example 2: Logs with errors
console.log('\n\n=== Example 2: Input with Errors ===');
const dirtyInput = `2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1
This is not a valid fail2ban log line
2024-01-15 14:32:10,123 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1
corrupted data here
2024-01-15 14:33:00,456 fail2ban.filter [12345] INFO [httpd] Found 10.0.0.1
invalid line format
2024-01-15 14:34:30,789 fail2ban.actions [12345] NOTICE [httpd] Ban 10.0.0.1`;

const result = parseWithRecovery(dirtyInput);
validateLogQuality(result.logs);

// Example 3: Demonstrating retry logic (pseudo-code pattern)
console.log('\n\n=== Example 3: Recommended Error Handling Pattern ===');
console.log(`
// Pattern: Try parsing, handle errors gracefully
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

  // Process valid logs
  processLogs(logs);

  // Optionally track error patterns for notification
  if (errors.length > logs.length * 0.2) {
    notifyOps('High parse error rate: ' + errors.length + ' errors');
  }
} catch (error) {
  console.error('Parse operation failed:', error.message);
  // Handle gracefully - maybe use cached data or notify
}
`);
