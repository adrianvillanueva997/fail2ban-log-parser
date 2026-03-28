#!/usr/bin/env node

/**
 * Example: Parse fail2ban logs
 *
 * This example demonstrates how to parse fail2ban log entries
 * and handle both successful parses and errors.
 */

const { parse, Fail2BanHeaderType, Fail2BanLevel, Fail2BanEvent } = require('../index');
const fs = require('fs');
const path = require('path');

// Enum value to name mapping (for displaying results)
const EventNames = {
  0: 'Found',
  1: 'Ban',
  2: 'Unban',
  3: 'Restore',
  4: 'Ignore',
  5: 'AlreadyBanned',
  6: 'Failed',
  7: 'Unknown',
};

const LevelNames = {
  0: 'Info',
  1: 'Notice',
  2: 'Warning',
  3: 'Error',
  4: 'Debug',
};

// Example fail2ban log content
const logContent = `2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1
2024-01-15 14:32:10,123 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1
2024-01-15 14:33:00,456 fail2ban.filter [12345] INFO [httpd] Found 10.0.0.1
invalid log line format
2024-01-15 14:34:30,789 fail2ban.actions [12345] NOTICE [httpd] Ban 10.0.0.1
2024-01-15 14:35:00,000 fail2ban.actions [12345] NOTICE [httpd] Unban 10.0.0.1`;

console.log('=== Fail2Ban Log Parser Example ===\n');

const [logs, errors] = parse(logContent);

console.log(`Parsed ${logs.length} successful log entries\n`);

// Display successful parses
console.log('--- Successful Logs ---');
logs.forEach((log, index) => {
  console.log(`\n[${index + 1}] ${log.timestamp}`);
  console.log(`    Jail: ${log.jail}`);
  console.log(`    Event: ${EventNames[log.event] || 'Unknown'}`);
  console.log(`    Level: ${LevelNames[log.level] || 'Unknown'}`);
  if (log.ip) {
    console.log(`    IP: ${log.ip}`);
  }
  console.log(`    PID: ${log.pid}`);
});

// Display errors
if (errors.length > 0) {
  console.log(`\n\n--- Parse Errors (${errors.length}) ---`);
  errors.forEach((error) => {
    console.log(`\nLine ${error.lineNumber}: "${error.line}"`);
  });
}

console.log('\n=== Summary ===');
console.log(`✓ Successful: ${logs.length}`);
console.log(`✗ Errors: ${errors.length}`);
console.log(`Total lines: ${logs.length + errors.length}`);
