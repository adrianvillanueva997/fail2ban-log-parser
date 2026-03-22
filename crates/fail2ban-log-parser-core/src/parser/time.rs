use winnow::{
    Parser,
    ascii::digit0,
    combinator::{dispatch, empty, peek, seq},
};

#[derive(Debug)]
pub(super) struct ParsedTime {
    pub(super) hour: u32,
    pub(super) minute: u32,
    pub(super) second: u32,
    pub(super) millisecond: u32,
}

fn parse_time_comma(input: &mut &str) -> winnow::Result<ParsedTime> {
    seq! {ParsedTime {
        hour:        digit0.parse_to::<u32>(),
        _: ':',
        minute:      digit0.parse_to::<u32>(),
        _: ':',
        second:      digit0.parse_to::<u32>(),
        _: ',',
        millisecond: digit0.parse_to::<u32>(),
    }}
    .parse_next(input)
}

fn parse_time_dot(input: &mut &str) -> winnow::Result<ParsedTime> {
    seq! {ParsedTime {
        hour:        digit0.parse_to::<u32>(),
        _: ':',
        minute:      digit0.parse_to::<u32>(),
        _: ':',
        second:      digit0.parse_to::<u32>(),
        _: '.',
        millisecond: digit0.parse_to::<u32>(),
    }}
    .parse_next(input)
}

fn parse_time_bare(input: &mut &str) -> winnow::Result<ParsedTime> {
    seq! {ParsedTime {
        hour:        digit0.parse_to::<u32>(),
        _: ':',
        minute:      digit0.parse_to::<u32>(),
        _: ':',
        second:      digit0.parse_to::<u32>(),
        millisecond: empty.value(0u32),
    }}
    .parse_next(input)
}

fn peek_time_separator(input: &mut &str) -> winnow::Result<char> {
    peek(
        seq!(
            _: digit0,
            _: ':',
            _: digit0,
            _: ':',
            _: digit0,
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
