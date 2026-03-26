use winnow::{
    Parser,
    ascii::alpha1,
    combinator::{delimited, opt},
};

pub(super) fn parse_jail<'a>(input: &mut &'a str) -> winnow::Result<Option<&'a str>> {
    opt(delimited('[', alpha1, ']')).parse_next(input)
}
