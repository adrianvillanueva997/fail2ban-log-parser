use winnow::{
    Parser,
    ascii::Caseless,
    combinator::{alt, opt},
    error::StrContext,
};

#[derive(Debug, Clone, PartialEq)]
pub enum Fail2BanLogger {
    Info,
    Notice,
    Warning,
    Error,
    Debug,
}

pub(super) fn parse_level(input: &mut &str) -> winnow::Result<Option<Fail2BanLogger>> {
    opt(alt((
        Caseless("info").value(Fail2BanLogger::Info),
        Caseless("notice").value(Fail2BanLogger::Notice),
        Caseless("warning").value(Fail2BanLogger::Warning),
        Caseless("error").value(Fail2BanLogger::Error),
        Caseless("debug").value(Fail2BanLogger::Debug),
    ))
    .context(StrContext::Label(
        "valid log level (info, notice, warning, error, or debug)",
    )))
    .parse_next(input)
}
