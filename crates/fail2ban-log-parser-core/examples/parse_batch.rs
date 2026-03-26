//! Parse multiple log lines, separating successes from errors.

use fail2ban_log_parser_core::parse;

fn main() {
    let input = "\
2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.100
this line is not a valid log entry
2024-01-15 14:32:03,456 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.100
2024-01-15 14:32:04,789 fail2ban.actions [12345] INFO [sshd] Unban 10.0.0.5";

    let mut ok_count = 0;
    let mut err_count = 0;

    for result in parse(input) {
        match result {
            Ok(log) => {
                ok_count += 1;
                let event = log.event().map(|e| e.to_string()).unwrap_or_default();
                let ip = log.ip().map(|ip| ip.to_string()).unwrap_or_default();
                println!("[OK] {event} {ip}");
            }
            Err(e) => {
                err_count += 1;
                eprintln!("[ERR] {e}");
            }
        }
    }

    println!("\nParsed {ok_count} lines, {err_count} errors");
}
