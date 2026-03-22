use winnow::{
    Parser,
    ascii::digit1,
    combinator::{dispatch, empty, peek, seq},
};

#[derive(Debug, PartialEq, Clone)]
pub(super) struct ParsedTime {
    pub(super) hour: u32,
    pub(super) minute: u32,
    pub(super) second: u32,
    pub(super) millisecond: u32,
}

fn parse_time_comma(input: &mut &str) -> winnow::Result<ParsedTime> {
    seq! {ParsedTime {
        hour:        digit1.parse_to::<u32>(),
        _: ':',
        minute:      digit1.parse_to::<u32>(),
        _: ':',
        second:      digit1.parse_to::<u32>(),
        _: ',',
        millisecond: digit1.parse_to::<u32>(),
    }}
    .parse_next(input)
}

fn parse_time_dot(input: &mut &str) -> winnow::Result<ParsedTime> {
    seq! {ParsedTime {
        hour:        digit1.parse_to::<u32>(),
        _: ':',
        minute:      digit1.parse_to::<u32>(),
        _: ':',
        second:      digit1.parse_to::<u32>(),
        _: '.',
        millisecond: digit1.parse_to::<u32>(),
    }}
    .parse_next(input)
}

fn parse_time_bare(input: &mut &str) -> winnow::Result<ParsedTime> {
    seq! {ParsedTime {
        hour:        digit1.parse_to::<u32>(),
        _: ':',
        minute:      digit1.parse_to::<u32>(),
        _: ':',
        second:      digit1.parse_to::<u32>(),
        millisecond: empty.value(0u32),
    }}
    .parse_next(input)
}

fn peek_time_separator(input: &mut &str) -> winnow::Result<char> {
    peek(
        seq!(
            _: digit1,
            _: ':',
            _: digit1,
            _: ':',
            _: digit1,
            winnow::token::any,
        )
        .map(|(c,)| c),
    )
    .parse_next(input)
}

pub(crate) fn parse_time(input: &mut &str) -> winnow::Result<ParsedTime> {
    dispatch! {
        peek_time_separator;
        ',' => parse_time_comma,
        '.' => parse_time_dot,
        _   => parse_time_bare,
    }
    .parse_next(input)
}
