//! Parse a single log line and inspect every field.

use fail2ban_log_parser_core::parse;

fn main() {
    let line = "2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1";

    let log = parse(line).next().unwrap().expect("valid log line");

    println!("Timestamp : {:?}", log.timestamp());
    println!("Header    : {:?}", log.header());
    println!("PID       : {:?}", log.pid());
    println!("Level     : {:?}", log.level());
    println!("Jail      : {:?}", log.jail());
    println!("Event     : {:?}", log.event());
    println!("IP        : {:?}", log.ip());
}
