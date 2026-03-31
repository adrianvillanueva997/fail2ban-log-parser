const { parse } = require("./pkg");

const logs = `2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1
2024-01-15 14:32:02,100 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1
2024-01-15 14:35:00,000 fail2ban.filter [12346] INFO [nginx] Found 10.0.0.5`;

const result = parse(logs);

console.log("Parsed logs:");
for (const log of result.logs) {
    console.log(`  - ${log.header} [${log.pid}] ${log.level}: ${log.jail} - ${log.event} ${log.ip}`);
}

console.log("\nErrors:", result.errors.length);
