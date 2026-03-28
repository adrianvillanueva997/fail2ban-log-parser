import test from "ava";

import {
	plus100,
	parse,
	Fail2BanHeaderType,
	Fail2BanLevel,
	Fail2BanEvent,
} from "../index";

test("sync function from native code", (t) => {
	const fixture = 42;
	t.is(plus100(fixture), fixture + 100);
});

test("parse returns structured log and errors", (t) => {
	const input =
		"2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1\ninvalid line\n";

	const [logs, errors] = parse(input);

	t.is(logs.length, 1);
	t.is(errors.length, 1);

	const log = logs[0];
	t.is(log.header, Fail2BanHeaderType.Filter);
	t.is(log.pid, 12345);
	t.is(log.level, Fail2BanLevel.Info);
	t.is(log.jail, "sshd");
	t.is(log.event, Fail2BanEvent.Found);
	t.is(log.ip, "192.168.1.1");
	t.truthy(log.timestamp);

	const err = errors[0];
	t.is(err.lineNumber, 2);
	t.is(err.line, "invalid line");
});

test("parse handles multiple lines and error aggregation", (t) => {
	const lines = [
		"2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1",
		"bad line format",
		"2024-02-01 01:02:03,456 fail2ban.actions [23456] NOTICE [httpd] Ban 10.0.0.5",
		"2024-02-01 01:02:04,789 fail2ban.actions [23457] NOTICE [httpd] Unban 10.0.0.5",
	].join("\n");

	const [logs, errors] = parse(lines);

	t.is(logs.length, 3);
	t.is(errors.length, 1);

	const [first, , third] = logs;
	// first line
	t.is(first.header, Fail2BanHeaderType.Filter);
	t.is(first.level, Fail2BanLevel.Info);
	t.is(first.event, Fail2BanEvent.Found);
	// third successful line (Unban)
	t.is(third.event, Fail2BanEvent.Unban);

	t.is(errors[0].lineNumber, 2);
});

test("parse returns empty result on empty input", (t) => {
	const [logs, errors] = parse("");
	t.is(logs.length, 0);
	t.is(errors.length, 0);
});
