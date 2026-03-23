use winnow::{
    Parser,
    ascii::Caseless,
    combinator::{alt, opt, preceded},
    error::StrContext,
};

#[derive(Debug, PartialEq, Clone)]
pub enum Fail2banHeaderType {
    Filter,
    Actions,
    Server,
}

pub(super) fn parse_header(input: &mut &str) -> winnow::Result<Option<Fail2banHeaderType>> {
    opt(preceded(Caseless("fail2ban."), parse_header_enum)).parse_next(input)
}

fn parse_header_enum(input: &mut &str) -> winnow::Result<Fail2banHeaderType> {
    alt((
        Caseless("filter").value(Fail2banHeaderType::Filter),
        Caseless("actions").value(Fail2banHeaderType::Actions),
        Caseless("server").value(Fail2banHeaderType::Server),
    ))
    .context(StrContext::Label(
        "valid fail2ban section (filter, actions, or server)",
    ))
    .parse_next(input)
}
