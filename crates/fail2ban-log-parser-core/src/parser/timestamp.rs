use chrono::{DateTime, TimeZone, Utc};
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

#[derive(Debug)]
struct FullTimestamp {
    date: ParsedDate,
    time: ParsedTime,
}

// "2024-01-15 14:32:01,847"
fn parse_timestamp_default(input: &mut &str) -> winnow::Result<FullTimestamp> {
    seq! {FullTimestamp {
        date: parse_date,
        _: space1,
        time: parse_time,
    }}
    .parse_next(input)
}

// "2024-01-15T14:32:01.847+00:00"
fn parse_timestamp_iso8601(input: &mut &str) -> winnow::Result<FullTimestamp> {
    seq! {FullTimestamp {
        date: parse_date,
        _: 'T',
        time: parse_time,
        _: parse_tz_offset,
    }}
    .parse_next(input)
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
    Utc.with_ymd_and_hms(
        ts.date.year,
        ts.date.month,
        ts.date.day,
        ts.time.hour,
        ts.time.minute,
        ts.time.second,
    )
    .single()
    .map(|dt| dt + chrono::Duration::milliseconds(ts.time.millisecond as i64))
}

pub(crate) fn parse_timestamp(input: &mut &str) -> winnow::Result<Option<DateTime<Utc>>> {
    dispatch! {
        // peek at position after YYYY-MM-DD to find the date/time separator
        peek(seq!(
            _: digit0, _: '-', _: digit0, _: '-', _: digit0,
            any
        ).map(|(c,)| c));
        ' ' => parse_timestamp_default,
        'T' => parse_timestamp_iso8601,
        _   => winnow::combinator::fail,
    }
    .map(to_datetime)
    .parse_next(input)
}
