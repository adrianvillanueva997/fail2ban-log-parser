#!/usr/bin/env node

/**
 * Example: Understanding Fail2Ban enums
 *
 * This example demonstrates how to work with the exported enums
 * for HeaderType, Level, and Event types.
 */

const {
  parse,
  Fail2BanHeaderType,
  Fail2BanLevel,
  Fail2BanEvent,
} = require('../index');

// Enum mappings for reverse lookup (value to name)
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

const HeaderNames = {
  0: 'Filter',
  1: 'Actions',
  2: 'Server',
};

const LevelNames = {
  0: 'Info',
  1: 'Notice',
  2: 'Warning',
  3: 'Error',
  4: 'Debug',
};

const logContent = `2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1
2024-01-15 14:32:10,123 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1
2024-01-15 14:32:15,456 fail2ban.filter [12345] WARNING [httpd] Found 10.0.0.1
2024-01-15 14:32:20,789 fail2ban.actions [12345] ERROR [httpd] Ban 10.0.0.1
2024-01-15 14:32:50,111 fail2ban.actions [12345] NOTICE [sshd] Unban 192.168.1.1`;

console.log('=== Fail2Ban Enums Reference ===\n');

// Show enum constant values
console.log('Header Types (access as Fail2BanHeaderType.Filter, etc):');
console.log(`  Filter: ${Fail2BanHeaderType.Filter}`);
console.log(`  Actions: ${Fail2BanHeaderType.Actions}`);
console.log(`  Server: ${Fail2BanHeaderType.Server}`);

console.log('\nLog Levels (access as Fail2BanLevel.Info, etc):');
console.log(`  Info: ${Fail2BanLevel.Info}`);
console.log(`  Notice: ${Fail2BanLevel.Notice}`);
console.log(`  Warning: ${Fail2BanLevel.Warning}`);
console.log(`  Error: ${Fail2BanLevel.Error}`);
console.log(`  Debug: ${Fail2BanLevel.Debug}`);

console.log('\nEvent Types (access as Fail2BanEvent.Ban, etc):');
console.log(`  Found: ${Fail2BanEvent.Found}`);
console.log(`  Ban: ${Fail2BanEvent.Ban}`);
console.log(`  Unban: ${Fail2BanEvent.Unban}`);
console.log(`  Restore: ${Fail2BanEvent.Restore}`);
console.log(`  Ignore: ${Fail2BanEvent.Ignore}`);
console.log(`  AlreadyBanned: ${Fail2BanEvent.AlreadyBanned}`);
console.log(`  Failed: ${Fail2BanEvent.Failed}`);
console.log(`  Unknown: ${Fail2BanEvent.Unknown}`);

// Parse and demonstrate enum usage
const [logs, errors] = parse(logContent);

console.log('\n=== Using Enums with Parsed Data ===\n');

logs.forEach((log) => {
  // Get enum names from values using the mappings
  const headerName = HeaderNames[log.header] || 'Unknown';
  const levelName = LevelNames[log.level] || 'Unknown';
  const eventName = EventNames[log.event] || 'Unknown';

  console.log(`${log.timestamp} [${levelName}] ${log.jail}`);
  console.log(
    `  Header: ${headerName} | Event: ${eventName} | IP: ${log.ip || 'N/A'}`
  );

  // Example: Direct comparison with enum constants
  if (log.event === Fail2BanEvent.Ban) {
    console.log('  ⚠️  BAN ACTION - IP should be blocked');
  } else if (log.event === Fail2BanEvent.Unban) {
    console.log('  ✓ UNBAN ACTION - IP restrictions removed');
  }

  if (log.level === Fail2BanLevel.Error) {
    console.log('  🔴 ERROR LEVEL - Requires immediate attention');
  } else if (log.level === Fail2BanLevel.Warning) {
    console.log('  🟠 WARNING LEVEL - May indicate issues');
  }

  console.log();
});

// Use case: Count bans and unbans using enum constants
const bans = logs.filter((log) => log.event === Fail2BanEvent.Ban);
const unbans = logs.filter((log) => log.event === Fail2BanEvent.Unban);
const errors_high = logs.filter((log) => log.level === Fail2BanLevel.Error);

console.log('=== Statistics ===');
console.log(`Ban actions: ${bans.length}`);
console.log(`Unban actions: ${unbans.length}`);
console.log(`Error level logs: ${errors_high.length}`);
console.log(`Parse errors: ${errors.length}`);
