use winnow::{Parser, ascii::digit1, combinator::empty};

#[derive(Debug, PartialEq, Clone)]
pub(super) struct ParsedTime {
    pub(super) hour: u32,
    pub(super) minute: u32,
    pub(super) second: u32,
    pub(super) millisecond: u32,
}

pub(crate) fn parse_time(input: &mut &str) -> winnow::Result<ParsedTime> {
    let hour = digit1.parse_to::<u32>().parse_next(input)?;
    ':'.parse_next(input)?;
    let minute = digit1.parse_to::<u32>().parse_next(input)?;
    ':'.parse_next(input)?;
    let second = digit1.parse_to::<u32>().parse_next(input)?;

    let millisecond = winnow::combinator::alt((
        (',', digit1.parse_to::<u32>()).map(|(_, v)| v),
        ('.', digit1.parse_to::<u32>()).map(|(_, v)| v),
        empty.value(0u32),
    ))
    .parse_next(input)?;

    Ok(ParsedTime {
        hour,
        minute,
        second,
        millisecond,
    })
}
