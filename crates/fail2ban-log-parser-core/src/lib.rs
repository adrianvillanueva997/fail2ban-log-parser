pub use crate::parser::Fail2BanStructuredLog;

mod parser;

/// An iterator adapter that parses Fail2Ban log lines into structured data.
///
/// This iterator wraps any `Iterator` of string-like items and yields successfully parsed
/// [`Fail2BanStructuredLog`] entries, silently skipping unparseable lines.
///
/// # Example
///
/// ```ignore
/// let lines = vec!["2024-01-01 12:00:00,123 fail2ban.filter: INFO [sshd] ..."];
/// let parser = LogParser::new(lines.into_iter());
/// for log in parser {
///     println!("Parsed: {:?}", log.jail());
/// }
/// ```
pub struct LogParser<I> {
    inner: I,
}

impl<I> LogParser<I> {
    /// Creates a new `LogParser` wrapping the given iterator.
    pub fn new(inner: I) -> Self {
        Self { inner }
    }
}

impl<I, S> Iterator for LogParser<I>
where
    I: Iterator<Item = S>,
    S: AsRef<str>,
{
    type Item = Fail2BanStructuredLog;

    fn next(&mut self) -> Option<Self::Item> {
        loop {
            let line = self.inner.next()?;
            if let Some(log) = parse(line.as_ref()) {
                return Some(log);
            }
        }
    }
}

impl<I, S> std::iter::FromIterator<S> for LogParser<I>
where
    I: Iterator<Item = S> + std::iter::FromIterator<S>,
    S: AsRef<str>,
{
    fn from_iter<T: IntoIterator<Item = S>>(iter: T) -> Self {
        Self::new(I::from_iter(iter))
    }
}

/// Parses a single log line, returning `None` if parsing fails.
pub fn parse(line: &str) -> Option<Fail2BanStructuredLog> {
    parser::parse_log_line(&mut &*line).ok()
}

/// Parses a single log line with error details.
///
/// Use this when you need to debug unparseable lines. This function is only available
/// when the `FAIL2BAN_PARSER_DEBUG` environment variable is set to `true`.
///
/// # Returns
///
/// - `Ok(log)` if parsing succeeded
/// - `Err(msg)` if parsing failed, with diagnostic information
#[cfg(feature = "debug_errors")]
pub fn parse_with_errors(line: &str) -> Result<Fail2BanStructuredLog, String> {
    parser::parse_log_line(&mut &*line).map_err(|e| format!("Failed to parse line: {}", e))
}
