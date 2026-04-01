<script>
  import { parse } from "../../pkg/wasm_fail2ban_log_parser.js";

  const SAMPLE_LOGS = `2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1
2024-01-15 14:32:10,123 fail2ban.actions [12345] NOTICE [sshd] Ban 192.168.1.1
2024-01-15 14:33:00,456 fail2ban.filter [12345] INFO [httpd] Found 10.0.0.1
this is an invalid log line
2024-01-15 14:34:30,789 fail2ban.actions [12345] NOTICE [httpd] Ban 10.0.0.1
2024-01-15 14:35:00,000 fail2ban.actions [12345] NOTICE [sshd] Unban 192.168.1.1
2024-01-15 14:36:15,222 fail2ban.filter [12346] INFO [nginx] Found 172.16.0.50
2024-01-15 14:37:00,333 fail2ban.actions [12346] NOTICE [nginx] Ban 172.16.0.50`;

  const EVENT_NAMES = ["Found", "Ban", "Unban", "Restore", "Ignore", "AlreadyBanned", "Failed", "Unknown"];
  const LEVEL_NAMES = ["Info", "Notice", "Warning", "Error", "Debug"];
  const HEADER_NAMES = ["Filter", "Actions", "Server"];

  let input = $state(SAMPLE_LOGS);
  let logs = $state([]);
  let errors = $state([]);
  let parseTimeMs = $state(null);
  let filterEvent = $state("all");

  const filteredLogs = $derived(
    filterEvent === "all" ? logs : logs.filter((l) => l.event === Number(filterEvent))
  );

  const eventCounts = $derived(
    logs.reduce((acc, log) => {
      const name = EVENT_NAMES[log.event] ?? "Unknown";
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {})
  );

  function handleParse() {
    const start = performance.now();
    const result = parse(input);
    parseTimeMs = (performance.now() - start).toFixed(2);
    logs = result.logs;
    errors = result.errors;
  }
</script>

<main>
  <h1>fail2ban-log-parser <span class="badge">WASM</span></h1>
  <p class="subtitle">Paste fail2ban logs below and parse them in the browser using WebAssembly.</p>

  <section class="input-section">
      <label for="log-input">Log input</label>
      <textarea id="log-input" bind:value={input} rows="10" spellcheck="false"></textarea>
      <div class="actions">
        <button onclick={handleParse}>Parse</button>
        {#if parseTimeMs !== null}
          <span class="timing">Parsed in {parseTimeMs}ms</span>
        {/if}
      </div>
    </section>

    {#if logs.length > 0 || errors.length > 0}
      <section class="stats">
        <div class="stat">
          <span class="stat-value">{logs.length}</span>
          <span class="stat-label">Parsed</span>
        </div>
        <div class="stat">
          <span class="stat-value">{errors.length}</span>
          <span class="stat-label">Errors</span>
        </div>
        {#each Object.entries(eventCounts) as [event, count]}
          <div class="stat">
            <span class="stat-value">{count}</span>
            <span class="stat-label">{event}</span>
          </div>
        {/each}
      </section>

      {#if logs.length > 0}
        <section>
          <div class="section-header">
            <h2>Parsed logs</h2>
            <select bind:value={filterEvent}>
              <option value="all">All events</option>
              {#each EVENT_NAMES as name, i}
                <option value={i}>{name}</option>
              {/each}
            </select>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Header</th>
                  <th>PID</th>
                  <th>Level</th>
                  <th>Jail</th>
                  <th>Event</th>
                  <th>IP</th>
                </tr>
              </thead>
              <tbody>
                {#each filteredLogs as log}
                  <tr>
                    <td class="mono">{log.timestamp ?? "—"}</td>
                    <td>{HEADER_NAMES[log.header] ?? "—"}</td>
                    <td class="mono">{log.pid ?? "—"}</td>
                    <td><span class="level level-{LEVEL_NAMES[log.level]?.toLowerCase()}">{LEVEL_NAMES[log.level] ?? "—"}</span></td>
                    <td><code>{log.jail ?? "—"}</code></td>
                    <td><span class="event event-{EVENT_NAMES[log.event]?.toLowerCase()}">{EVENT_NAMES[log.event] ?? "—"}</span></td>
                    <td class="mono">{log.ip ?? "—"}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </section>
      {/if}

      {#if errors.length > 0}
        <section>
          <h2>Errors</h2>
          <ul class="error-list">
            {#each errors as err}
              <li>
                <span class="error-line">Line {err.line_number}</span>
                <code>{err.line}</code>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, -apple-system, sans-serif;
    background: #0f1117;
    color: #e1e4e8;
  }

  main {
    max-width: 960px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  h1 {
    font-size: 1.75rem;
    margin: 0 0 0.25rem;
  }

  .badge {
    font-size: 0.65em;
    background: #238636;
    color: #fff;
    padding: 0.15em 0.5em;
    border-radius: 4px;
    vertical-align: middle;
  }

  .subtitle {
    color: #8b949e;
    margin: 0 0 1.5rem;
  }

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.4rem;
  }

  textarea {
    width: 100%;
    font-family: "SF Mono", "Fira Code", monospace;
    font-size: 0.85rem;
    background: #161b22;
    color: #e1e4e8;
    border: 1px solid #30363d;
    border-radius: 6px;
    padding: 0.75rem;
    resize: vertical;
    box-sizing: border-box;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  button {
    background: #238636;
    color: #fff;
    border: none;
    padding: 0.5rem 1.25rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
  }

  button:hover {
    background: #2ea043;
  }

  .timing {
    color: #8b949e;
    font-size: 0.85rem;
  }

  /* Stats */
  .stats {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin: 1.5rem 0;
  }

  .stat {
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 6px;
    padding: 0.6rem 1rem;
    text-align: center;
    min-width: 70px;
  }

  .stat-value {
    display: block;
    font-size: 1.4rem;
    font-weight: 700;
  }

  .stat-label {
    display: block;
    font-size: 0.75rem;
    color: #8b949e;
  }

  /* Section header with filter */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  select {
    background: #161b22;
    color: #e1e4e8;
    border: 1px solid #30363d;
    border-radius: 6px;
    padding: 0.35rem 0.6rem;
    font-size: 0.85rem;
  }

  /* Table */
  .table-wrap {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }

  th {
    text-align: left;
    padding: 0.5rem 0.6rem;
    border-bottom: 2px solid #30363d;
    color: #8b949e;
    font-weight: 600;
    white-space: nowrap;
  }

  td {
    padding: 0.45rem 0.6rem;
    border-bottom: 1px solid #21262d;
  }

  .mono {
    font-family: "SF Mono", "Fira Code", monospace;
    font-size: 0.8rem;
  }

  code {
    background: #1c2128;
    padding: 0.1em 0.4em;
    border-radius: 3px;
    font-size: 0.8rem;
  }

  /* Level badges */
  .level {
    padding: 0.15em 0.5em;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .level-info { background: #1f6feb33; color: #58a6ff; }
  .level-notice { background: #23863633; color: #3fb950; }
  .level-warning { background: #9e6a0333; color: #d29922; }
  .level-error { background: #f8514933; color: #f85149; }
  .level-debug { background: #8b949e33; color: #8b949e; }

  /* Event badges */
  .event {
    padding: 0.15em 0.5em;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .event-found { background: #1f6feb33; color: #58a6ff; }
  .event-ban { background: #f8514933; color: #f85149; }
  .event-unban { background: #23863633; color: #3fb950; }
  .event-restore { background: #9e6a0333; color: #d29922; }
  .event-ignore { background: #8b949e33; color: #8b949e; }
  .event-alreadybanned { background: #da368033; color: #db61a2; }
  .event-failed { background: #f8514933; color: #f85149; }
  .event-unknown { background: #8b949e33; color: #8b949e; }

  /* Errors */
  .error-list {
    list-style: none;
    padding: 0;
  }

  .error-list li {
    background: #f8514911;
    border: 1px solid #f8514933;
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .error-line {
    color: #f85149;
    font-weight: 600;
    white-space: nowrap;
  }

  h2 {
    font-size: 1.2rem;
    margin: 1.5rem 0 0.75rem;
  }
</style>
