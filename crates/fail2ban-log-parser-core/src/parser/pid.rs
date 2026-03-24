use winnow::{
    Parser,
    ascii::dec_uint,
    combinator::{delimited, opt},
};

pub(super) fn parse_pid(input: &mut &str) -> winnow::Result<Option<u32>> {
    opt(delimited('[', dec_uint, ']')).parse_next(input)
}
