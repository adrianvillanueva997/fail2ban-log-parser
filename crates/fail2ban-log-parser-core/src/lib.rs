pub use crate::parser::Fail2banStructuredLog;

mod parser;

pub struct LogParser<I> {
    inner: I,
}

impl<I> LogParser<I> {
    pub fn new(inner: I) -> Self {
        Self { inner }
    }
}

impl<I, S> Iterator for LogParser<I>
where
    I: Iterator<Item = S>,
    S: AsRef<str>,
{
    type Item = Fail2banStructuredLog;

    fn next(&mut self) -> Option<Self::Item> {
        loop {
            let line = self.inner.next()?;
            if let Some(log) = parse(line.as_ref()) {
                return Some(log);
            }
        }
    }
}

pub fn parse(line: &str) -> Option<Fail2banStructuredLog> {
    parser::parse_log_line(&mut &*line).ok()
}
