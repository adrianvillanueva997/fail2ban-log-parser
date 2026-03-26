use std::net::IpAddr;

use winnow::{Parser, combinator::opt, error::ParserError, token::take_while};

pub(super) fn parse_ip(input: &mut &str) -> winnow::Result<Option<IpAddr>> {
    opt(parse_ip_inner).parse_next(input)
}

fn parse_ip_inner(input: &mut &str) -> winnow::Result<IpAddr> {
    let raw = take_while(1.., |c: char| c.is_ascii_hexdigit() || c == '.' || c == ':')
        .parse_next(input)?;
    raw.parse::<IpAddr>()
        .map_err(|_| ParserError::from_input(input))
}
