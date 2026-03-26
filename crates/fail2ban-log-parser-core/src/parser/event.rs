use winnow::{
    Parser,
    ascii::Caseless,
    combinator::{alt, opt},
    error::StrContext,
};

#[derive(Debug, Clone, PartialEq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub enum Fail2BanEvent {
    Found,
    Ban,
    Unban,
    Restore,
    Ignore,
    AlreadyBanned,
    Failed,
    Unknown,
}

impl std::fmt::Display for Fail2BanEvent {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Found => write!(f, "Found"),
            Self::Ban => write!(f, "Ban"),
            Self::Unban => write!(f, "Unban"),
            Self::Restore => write!(f, "Restore"),
            Self::Ignore => write!(f, "Ignore"),
            Self::AlreadyBanned => write!(f, "AlreadyBanned"),
            Self::Failed => write!(f, "Failed"),
            Self::Unknown => write!(f, "Unknown"),
        }
    }
}

pub(super) fn parse_event(input: &mut &str) -> winnow::Result<Option<Fail2BanEvent>> {
    opt(alt((
        Caseless("found").value(Fail2BanEvent::Found),
        Caseless("ban").value(Fail2BanEvent::Ban),
        Caseless("unban").value(Fail2BanEvent::Unban),
        Caseless("restore").value(Fail2BanEvent::Restore),
        Caseless("ignore").value(Fail2BanEvent::Ignore),
        Caseless("alreadybanned").value(Fail2BanEvent::AlreadyBanned),
        Caseless("failed").value(Fail2BanEvent::Failed),
        Caseless("unknown").value(Fail2BanEvent::Unknown),
    ))
    .context(StrContext::Label(
        "valid log level (info, notice, warning, error, or debug)",
    )))
    .parse_next(input)
}
