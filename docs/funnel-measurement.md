# Funnel measurement and ChatGPT exports

## Current status

The tracker, Pages Functions collector, protected export endpoint, SQL schema and report tools are implemented for deployment through the existing GitHub integration. Visitor recording starts only when the live `/api/funnel/status` returns `{"ready":true}`. Without the storage binding, enable flag and private export token, the tracker sends no event records. A successful GitHub push alone is not proof that collection is active.

GitHub stores and deploys the tracking code. A separate analytics service/database stores visitor events. Raw event data and credentials must not be committed to the public repository.

The first-party collector is implemented as Cloudflare Pages Functions under `functions/api/funnel/`, deployed from GitHub. Its D1 database schema is `analytics/schema.sql`. The `_routes.json` file limits Function invocation to `/api/funnel/*`, keeping site pages and assets served statically. No new npm dependencies are required.

## One-time storage connection

These are hosting settings, not code stored in GitHub:

1. Create a dedicated Cloudflare D1 database named `syfer-funnel` and execute `analytics/schema.sql` against it.
2. Bind that database to the existing Pages project as `FUNNEL_DB` in production.
3. Set the production secret `FUNNEL_EXPORT_TOKEN` to a private random value of at least 32 characters, and set the production variable `FUNNEL_ENABLED` to the exact string `true`.
4. Redeploy the existing Pages project. Verify `/api/funnel/status` returns `{"ready":true}`, then check a controlled test journey and its authenticated export.

GitHub access cannot create these Cloudflare account resources without a Cloudflare account credential. The site requires no layout changes for this connection. Private credentials and raw event exports stay outside GitHub.

## Collector behavior

- Only `syfer-media.pages.dev` and the six active funnel routes are tracked; localhost, deployment previews and the consulting archive are excluded.
- Sessions use sessionStorage, expire after 30 minutes without tracked activity, and are scoped to a browser tab. New tabs, blocked storage and privacy preferences affect coverage; these IDs are not unique people.
- Sources use predefined categories derived from `utm_source` or referrer classification; full URLs, query strings, contact addresses and IPs are not stored by this collector.
- GPC/DNT and the owner's persistent opt-out are respected. Visit the site with `?analytics=off` to exclude that browser, or `?analytics=on` to clear that opt-out.
- The backend accepts bounded, validated same-origin events; retries deduplicate by event ID. Its per-session cap limits accidental loops, not determined bot traffic.
- A SQLite trigger removes records older than 90 days when new events are inserted. No traffic means no cleanup execution until the next insertion.
- Export requires the private bearer token, validates dates, and paginates 2,500 rows at a time. It is not a public visitor log.
- Event delivery is best effort and never blocks a link. Captured clicks do not establish completed bookings or sales.

## Event contract

Required columns: `event_id,session_id,occurred_at,event,page`.

Optional columns: `destination,placement,source,device,study`.

`occurred_at` is an ISO timestamp in UTC. Event IDs support retry deduplication. Session IDs represent the collector's stated browser-session definition, not unique people. Use stable page paths with trailing slashes, except `/`. Preview, owner tests and the archived page should not count as production visitor traffic.

| Event | Meaning |
| --- | --- |
| page_view | A supported site page was viewed |
| consulting_click | Click to the consulting page |
| case_studies_click | Click to the proof library |
| offer_click | Click to the offer preview page |
| resume_click | Click to the career overview |
| fit_call_click | Click to the external Calendly event |
| pdf_open | Open a resume or offer PDF |
| pdf_download | Click an explicit PDF download |
| contact_click | Click email or LinkedIn contact |
| study_open | Open a project's contribution section |

Supported pages: `/`, `/sf-tech-week/`, `/consulting/`, `/case-studies/`, `/offer/`, `/resume/`.

The collection design should avoid names, email addresses, IP storage, full query strings and full referrer URLs. Source attribution can use predefined campaign categories such as LinkedIn, Tech Week and referrals. Private exports require authentication. Storage setup, retention and test exclusion must be settled before collection is switched on.

## Report workflow

Save a real export outside the repository, then run from the repo:

```powershell
node scripts/analyze-funnel.mjs "../analytics-private/events.csv" "../analytics-private/report"
```

Outputs:

- `funnel-summary.json`: counts, observed paths, rates and data limits.
- `funnel-report.md`: readable counts-first report.
- `daily-counts.csv`: daily event/session/page-view/Fit-Call-click counts.
- `chatgpt-analysis-prompt.txt`: copy-paste prompt for evidence-based analysis.

Upload the summary/report to ChatGPT with the supplied prompt. The analysis tool makes no network requests and does not automatically upload data. For a real authenticated export after storage is connected, set `FUNNEL_EXPORT_TOKEN` privately in the local shell, then run:

```powershell
node scripts/export-funnel.mjs "../analytics-private" "2026-10-03" "2026-10-09"
node scripts/analyze-funnel.mjs "../analytics-private/events-2026-10-03-2026-10-09.csv" "../analytics-private/report"
```

The export script downloads every page of the chosen UTC date range, saves only the CSV locally and does not write the token to the output. Use actual dates with collected traffic; the examples are not evidence of existing visits. The summary includes source cohorts and study-open counts in addition to the main funnel rates.

## Interpretation

Report profile → consulting and consulting → Fit Call click as ordered events within the supplied export window. A shared session alone is insufficient if the click happened first. Repeated clicks remain event counts; unique click sessions are reported separately. Duplicate retries with identical IDs are ignored; conflicting duplicates and malformed rows fail visibly.

Do not add daily session counts to claim total unique people. Do not treat an empty export as proof of zero traffic. Bookings and sales stay unavailable until Calendly/owner-confirmed records are added separately. A larger observed conversion rate does not prove a case study or page change caused it.

## Infrastructure references

Local verification on October 3, 2026 passes seven focused tests using a real in-memory SQLite database and browser-context mocks: storage readiness, event validation and privacy preferences, retry deduplication, export authentication/date validation/pagination, retention, link classification and ordered-path/report calculations. `npm run test:funnel` requires Node 24's built-in SQLite support. The CSV-to-report CLI also ran successfully against synthetic data outside the repository. Production storage and actual event capture remain separately verifiable through the deployed status endpoint and authenticated export.

- [Cloudflare Pages Functions deployment](https://developers.cloudflare.com/pages/functions/get-started/)
- [Cloudflare Pages database bindings](https://developers.cloudflare.com/pages/functions/bindings/)
- [Cloudflare D1 overview](https://developers.cloudflare.com/d1/)
