use std::fmt;

use winnow::{
    Parser,
    ascii::Caseless,
    combinator::{alt, opt, preceded},
    error::StrContext,
};

#[derive(Debug, PartialEq, Clone)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub enum Fail2BanHeaderType {
    Filter,
    Actions,
    Server,
}

impl fmt::Display for Fail2BanHeaderType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Filter => write!(f, "Filter"),
            Self::Actions => write!(f, "Actions"),
            Self::Server => write!(f, "Server"),
        }
    }
}

pub(super) fn parse_header(input: &mut &str) -> winnow::Result<Option<Fail2BanHeaderType>> {
    opt(preceded(Caseless("fail2ban."), parse_header_enum)).parse_next(input)
}

fn parse_header_enum(input: &mut &str) -> winnow::Result<Fail2BanHeaderType> {
    alt((
        Caseless("filter").value(Fail2BanHeaderType::Filter),
        Caseless("actions").value(Fail2BanHeaderType::Actions),
        Caseless("server").value(Fail2BanHeaderType::Server),
    ))
    .context(StrContext::Label(
        "valid fail2ban section (filter, actions, or server)",
    ))
    .parse_next(input)
}
