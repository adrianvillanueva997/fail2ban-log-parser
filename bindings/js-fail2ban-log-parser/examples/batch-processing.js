#!/usr/bin/env node

/**
 * Example: Batch processing fail2ban logs
 *
 * This example demonstrates how to process multiple log files
 * in parallel and aggregate results, showing performance benefits
 * of the native parser.
 */

const { parse } = require('../index');
const fs = require('fs');
const path = require('path');

/**
 * Process a single log file
 */
async function processFile(filePath) {
  return new Promise((resolve, reject) => {
    // In a real scenario, you'd read actual log files
    // This simulates processing by using a sample
    const sampleLog = `2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1
2024-01-15 14:32:10,123 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1
2024-01-15 14:33:00,456 fail2ban.filter [12345] INFO [httpd] Found 10.0.0.1
2024-01-15 14:34:30,789 fail2ban.actions [12345] NOTICE [httpd] Ban 10.0.0.1`;

    try {
      const startTime = process.hrtime.bigint();
      const [logs, errors] = parse(sampleLog);
      const endTime = process.hrtime.bigint();

      resolve({
        filePath,
        logsCount: logs.length,
        errorsCount: errors.length,
        parseTimeNs: Number(endTime - startTime),
        bans: logs.filter((log) => log.event === 1), // event 1 is Ban
        jails: [...new Set(logs.map((log) => log.jail))],
      });
    } catch (error) {
      reject({ filePath, error: error.message });
    }
  });
}

/**
 * Process multiple log files
 */
async function processBatch(filePaths) {
  console.log('=== Batch Log Processing Example ===\n');
  console.log(`Processing ${filePaths.length} files...\n`);

  const startTotal = process.hrtime.bigint();
  const results = await Promise.all(filePaths.map(processFile));
  const endTotal = process.hrtime.bigint();

  // Display results
  let totalLogs = 0;
  let totalErrors = 0;
  let totalParsingTime = 0;
  const allJails = new Set();
  const allBans = [];

  results.forEach((result) => {
    totalLogs += result.logsCount;
    totalErrors += result.errorsCount;
    totalParsingTime += result.parseTimeNs;
    result.jails.forEach((jail) => allJails.add(jail));
    allBans.push(...result.bans);

    console.log(`✓ ${result.filePath}`);
    console.log(`  Logs: ${result.logsCount} | Errors: ${result.errorsCount}`);
    console.log(`  Parse time: ${(result.parseTimeNs / 1000).toFixed(2)}µs`);
  });

  console.log('\n=== Aggregate Results ===');
  console.log(`Total log entries: ${totalLogs}`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Total jails tracked: ${allJails.size} (${[...allJails].join(', ')})`);
  console.log(`Total ban actions: ${allBans.length}`);
  console.log(
    `Average parse time: ${(totalParsingTime / results.length / 1000).toFixed(2)}µs per file`
  );
  console.log(`Batch total time: ${(Number(endTotal - startTotal) / 1000000).toFixed(2)}ms`);
}

// Simulate processing multiple log files
const sampleFiles = [
  '/var/log/fail2ban.log.1',
  '/var/log/fail2ban.log.2',
  '/var/log/fail2ban.log.3',
];

processBatch(sampleFiles);
