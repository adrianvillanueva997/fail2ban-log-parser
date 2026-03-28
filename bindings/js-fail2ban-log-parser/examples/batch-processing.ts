#!/usr/bin/env node

/**
 * Example: Batch processing fail2ban logs with TypeScript
 *
 * Demonstrates parallel processing and aggregation with full type safety,
 * useful for analyzing multiple log files.
 */

import { parse, Fail2BanEvent, type Fail2BanLog } from "../index";

interface FileProcessingResult {
	filePath: string;
	logsCount: number;
	errorsCount: number;
	parseTimeNs: number;
	bans: Fail2BanLog[];
	jails: Set<string>;
}

interface BatchResults {
	totalLogs: number;
	totalErrors: number;
	totalParsingTime: number;
	jailCount: number;
	banCount: number;
	averageParseTimePerFile: number;
	batchTotalTime: number;
}

/**
 * Process a single log file
 */
async function processFile(filePath: string): Promise<FileProcessingResult> {
	return new Promise((resolve, reject) => {
		// In a real scenario, you'd read actual log files
		// This simulates processing by using a sample
		const sampleLog = `2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1
2024-01-15 14:32:10,123 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1
2024-01-15 14:33:00,456 fail2ban.filter [12345] INFO [httpd] Found 10.0.0.1
2024-01-15 14:34:30,789 fail2ban.actions [12345] NOTICE [httpd] Ban 10.0.0.1`;

		try {
			const startTime = process.hrtime.bigint();
			const [logs, errors] = parse(sampleLog);
			const endTime = process.hrtime.bigint();

			const jails = new Set(
				logs
					.filter(
						(log): log is Fail2BanLog & { jail: string } =>
							log.jail !== undefined,
					)
					.map((log) => log.jail),
			);

			resolve({
				filePath,
				logsCount: logs.length,
				errorsCount: errors.length,
				parseTimeNs: Number(endTime - startTime),
				bans: logs.filter((log) => log.event === Fail2BanEvent.Ban),
				jails,
			});
		} catch (error) {
			reject({
				filePath,
				error: error instanceof Error ? error.message : "Unknown error",
			});
		}
	});
}

/**
 * Process multiple log files in parallel
 */
async function processBatch(filePaths: string[]): Promise<BatchResults> {
	console.log("=== Batch Log Processing Example (TypeScript) ===\n");
	console.log(`Processing ${filePaths.length} files...\n`);

	const startTotal = process.hrtime.bigint();
	const results = await Promise.all(filePaths.map(processFile));
	const endTotal = process.hrtime.bigint();

	// Aggregate results
	let totalLogs = 0;
	let totalErrors = 0;
	let totalParsingTime = 0;
	const allJails = new Set<string>();
	const allBans: Fail2BanLog[] = [];

	results.forEach((result: FileProcessingResult) => {
		totalLogs += result.logsCount;
		totalErrors += result.errorsCount;
		totalParsingTime += result.parseTimeNs;
		result.jails.forEach((jail) => allJails.add(jail));
		allBans.push(...result.bans);

		console.log(`✓ ${result.filePath}`);
		console.log(`  Logs: ${result.logsCount} | Errors: ${result.errorsCount}`);
		console.log(`  Parse time: ${(result.parseTimeNs / 1000).toFixed(2)}µs`);
	});

	const batchTotalTime = Number(endTotal - startTotal);

	const summary: BatchResults = {
		totalLogs,
		totalErrors,
		totalParsingTime,
		jailCount: allJails.size,
		banCount: allBans.length,
		averageParseTimePerFile: totalParsingTime / results.length,
		batchTotalTime,
	};

	console.log("\n=== Aggregate Results ===");
	console.log(`Total log entries: ${summary.totalLogs}`);
	console.log(`Total errors: ${summary.totalErrors}`);
	console.log(
		`Total jails tracked: ${summary.jailCount} (${Array.from(allJails).join(", ")})`,
	);
	console.log(`Total ban actions: ${summary.banCount}`);
	console.log(
		`Average parse time: ${(summary.averageParseTimePerFile / 1000).toFixed(2)}µs per file`,
	);
	console.log(
		`Batch total time: ${(summary.batchTotalTime / 1000000).toFixed(2)}ms`,
	);

	return summary;
}

// Simulate processing multiple log files
const sampleFiles = [
	"/var/log/fail2ban.log.1",
	"/var/log/fail2ban.log.2",
	"/var/log/fail2ban.log.3",
];

processBatch(sampleFiles).catch((error) => {
	console.error("Batch processing failed:", error);
	process.exit(1);
});
