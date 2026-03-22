use winnow::{
    Parser,
    ascii::{digit1, space1},
    combinator::{dispatch, fail, peek, seq},
    token::any,
};

#[derive(Debug, Clone, PartialEq)]
pub(super) struct ParsedDate {
    pub(super) year: i32,
    pub(super) month: u32,
    pub(super) day: u32,
}

// 2024-02-10
fn parse_date_iso(input: &mut &str) -> winnow::Result<ParsedDate> {
    seq! {ParsedDate{
        year: digit1.parse_to::<i32>(),
        _: '-',
        month: digit1.parse_to::<u32>(),
        _: '-',
        day: digit1.parse_to::<u32>(),
    }}
    .parse_next(input)
}

fn parse_month_abbreviation(input: &mut &str) -> winnow::Result<u32> {
    winnow::token::take(3usize)
        .verify_map(|s: &str| match s.to_ascii_lowercase().as_str() {
            "jan" => Some(1u32),
            "feb" => Some(2u32),
            "mar" => Some(3u32),
            "apr" => Some(4u32),
            "may" => Some(5u32),
            "jun" => Some(6u32),
            "jul" => Some(7u32),
            "aug" => Some(8u32),
            "sep" => Some(9u32),
            "oct" => Some(10u32),
            "nov" => Some(11u32),
            "dec" => Some(12u32),
            _ => None,
        })
        .parse_next(input)
}

// Jan 15 2024 (syslog)
fn parse_date_syslog(input: &mut &str) -> winnow::Result<ParsedDate> {
    seq! {
        ParsedDate{
            month: parse_month_abbreviation,
            _: space1,
            day: digit1.parse_to::<u32>(),
            _: space1,
            year: digit1.parse_to::<i32>(),
        }
    }
    .parse_next(input)
}

pub fn parse_date(input: &mut &str) -> winnow::Result<ParsedDate> {
    dispatch! {
        peek(any);
        '0'..='9' => parse_date_iso,
        'A'..='Z' => parse_date_syslog,
        _ => fail,
    }
    .parse_next(input)
}
