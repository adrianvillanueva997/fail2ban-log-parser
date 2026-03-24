# Fail2Ban log parser

> [!IMPORTANT]
> This library is still WIP.

General structure:

```text
2024-01-15 14:32:01,847  fail2ban.filter  [12345]  INFO  [sshd] Found 1.2.3.4
|___________________|    |______________|  |____|   |__|  |____| |__| |______|
    timestamp              header            pid    level  jail  event  IP address
```
