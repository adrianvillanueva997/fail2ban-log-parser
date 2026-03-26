#![warn(clippy::pedantic)]

pub use crate::parser::{Fail2BanEvent, Fail2BanHeaderType, Fail2BanLevel, Fail2BanStructuredLog};
use std::fmt;

#[cfg(feature = "parallel")]
use rayon::prelude::*;

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

/// Parse fail2ban log input. Returns an iterator over parse results.
///
/// Each line yields `Ok(Fail2BanStructuredLog)` on success or `Err(ParseError)` on failure.
///
/// When the `parallel` feature is enabled, all lines are parsed concurrently
/// using Rayon and results are collected upfront. Without it, lines are parsed
/// lazily on demand. The API is identical in both cases.
///
/// # Examples
///
/// Parse a single line:
/// ```ignore
/// let log = parse("2024-01-01 12:00:00,123 fail2ban.filter [1] INFO [sshd] Found 1.2.3.4").next();
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
#[cfg(not(feature = "parallel"))]
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

/// Parse fail2ban log input in parallel using Rayon.
///
/// All lines are parsed concurrently, then yielded as an iterator.
/// Line order is preserved. The API is identical to the sequential version.
#[cfg(feature = "parallel")]
pub fn parse(input: &str) -> impl Iterator<Item = Result<Fail2BanStructuredLog<'_>, ParseError>> {
    let lines: Vec<&str> = input.lines().collect();
    lines
        .par_iter()
        .enumerate()
        .map(|(i, &line)| {
            parser::parse_log_line(&mut &*line).map_err(|_| ParseError {
                line_number: i + 1,
                line: line.to_string(),
            })
        })
        .collect::<Vec<_>>()
        .into_iter()
}
