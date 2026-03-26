//! Filter parsed logs to find only Ban events.

use fail2ban_log_parser_core::{Fail2BanEvent, parse};

fn main() {
    let input = "\
2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100
2024-01-15 14:32:02,000 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.100
2024-01-15 14:32:03,000 fail2ban.filter [12345] INFO [sshd] Found 10.0.0.5
2024-01-15 14:32:04,000 fail2ban.actions [12345] NOTICE [sshd] Ban 10.0.0.5
2024-01-15 14:32:05,000 fail2ban.actions [12345] INFO [sshd] Unban 192.168.1.100";

    let bans: Vec<_> = parse(input)
        .filter_map(|r| r.ok())
        .filter(|log| log.event() == Some(&Fail2BanEvent::Ban))
        .collect();

    println!("Found {} ban events:", bans.len());
    for log in &bans {
        println!(
            "  {} banned from [{}] at {:?}",
            log.ip().map(|ip| ip.to_string()).unwrap_or_default(),
            log.jail().unwrap_or("unknown"),
            log.timestamp(),
        );
    }
}
