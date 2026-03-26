#![warn(clippy::pedantic)]

pub use crate::parser::{Fail2BanEvent, Fail2BanHeaderType, Fail2BanLevel, Fail2BanStructuredLog};
use std::fmt;

mod parser;

/// Error returned when a log line fails to parse.
#[derive(Debug, Clone)]
pub struct ParseError {
    pub line_number: usize,
    pub line: String,
}

impl fmt::Display for ParseError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "failed to parse line {}: {}",
            self.line_number, self.line
        )
    }
}

impl std::error::Error for ParseError {}

/// Parse fail2ban log input. Returns a lazy iterator over parse results.
///
/// Each line yields `Ok(Fail2BanStructuredLog)` on success or `Err(ParseError)` on failure.
///
/// # Examples
///
/// Parse a single line:
/// ```ignore
/// let log = parse("2024-01-01 12:00:00,123 fail2ban.filter: INFO [sshd] ...").next();
/// ```
///
/// Parse an entire file, skipping errors:
/// ```ignore
/// let content = std::fs::read_to_string("fail2ban.log").unwrap();
/// for log in parse(&content).flatten() {
///     println!("{:?}", log.jail());
/// }
/// ```
///
/// Collect all errors:
/// ```ignore
/// let content = std::fs::read_to_string("fail2ban.log").unwrap();
/// let (ok, err): (Vec<_>, Vec<_>) = parse(&content).partition(Result::is_ok);
/// ```
pub fn parse(
    input: &str,
) -> impl Iterator<Item = Result<Fail2BanStructuredLog<'_>, ParseError>> + '_ {
    input.lines().enumerate().map(|(i, line)| {
        parser::parse_log_line(&mut &*line).map_err(|_| ParseError {
            line_number: i + 1,
            line: line.to_string(),
        })
    })
}
