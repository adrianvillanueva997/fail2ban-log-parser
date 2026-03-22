use chrono::{DateTime, Utc};
use winnow::{
    Parser,
    ascii::{digit0, space1},
    combinator::{dispatch, peek, seq},
    token::any,
};

use super::{
    date::{ParsedDate, parse_date},
    time::{ParsedTime, parse_time},
};

#[derive(Debug, Clone, PartialEq)]
struct FullTimestamp {
    date: ParsedDate,
    time: ParsedTime,
}

fn parse_tz_offset(input: &mut &str) -> winnow::Result<()> {
    dispatch! {
        peek(any);
        'Z' => any.value(()),
        '+' | '-' => seq!(
            _: any,
            _: digit0,
            _: ':',
            _: digit0,
        ).value(()),
        _ => winnow::combinator::empty.value(()),
    }
    .parse_next(input)
}

fn to_datetime(ts: FullTimestamp) -> Option<DateTime<Utc>> {
    chrono::NaiveDate::from_ymd_opt(ts.date.year, ts.date.month, ts.date.day)?
        .and_hms_milli_opt(
            ts.time.hour,
            ts.time.minute,
            ts.time.second,
            ts.time.millisecond,
        )?
        .and_utc()
        .into()
}
fn parse_default_time_separator(input: &mut &str) -> winnow::Result<ParsedTime> {
    space1.parse_next(input)?;
    parse_time.parse_next(input)
}

fn parse_iso8601_time_separator(input: &mut &str) -> winnow::Result<ParsedTime> {
    any.parse_next(input)?;
    let time = parse_time.parse_next(input)?;
    parse_tz_offset.parse_next(input)?;
    Ok(time)
}

pub(crate) fn parse_timestamp(input: &mut &str) -> winnow::Result<Option<DateTime<Utc>>> {
    let date = parse_date.parse_next(input)?;

    let time = dispatch! {
        peek(any);
        ' ' => parse_default_time_separator,
        'T' => parse_iso8601_time_separator,
        _ => winnow::combinator::fail,
    }
    .parse_next(input)?;

    let full_timestamp = FullTimestamp { date, time };
    Ok(to_datetime(full_timestamp))
}
