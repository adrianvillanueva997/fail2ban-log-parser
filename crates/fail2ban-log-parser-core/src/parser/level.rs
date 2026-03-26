use std::fmt;

use winnow::{
    Parser,
    ascii::Caseless,
    combinator::{alt, opt},
    error::StrContext,
};

#[derive(Debug, Clone, PartialEq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub enum Fail2BanLevel {
    Info,
    Notice,
    Warning,
    Error,
    Debug,
}

impl fmt::Display for Fail2BanLevel {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Info => write!(f, "Info"),
            Self::Notice => write!(f, "Notice"),
            Self::Warning => write!(f, "Warning"),
            Self::Error => write!(f, "Error"),
            Self::Debug => write!(f, "Debug"),
        }
    }
}

pub(super) fn parse_level(input: &mut &str) -> winnow::Result<Option<Fail2BanLevel>> {
    opt(alt((
        Caseless("info").value(Fail2BanLevel::Info),
        Caseless("notice").value(Fail2BanLevel::Notice),
        Caseless("warning").value(Fail2BanLevel::Warning),
        Caseless("error").value(Fail2BanLevel::Error),
        Caseless("debug").value(Fail2BanLevel::Debug),
    ))
    .context(StrContext::Label(
        "valid log level (info, notice, warning, error, or debug)",
    )))
    .parse_next(input)
}
