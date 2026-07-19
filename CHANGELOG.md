# Changelog

All notable changes to Cove are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [SemVer](https://semver.org/spec/v2.0.0.html).

## [1.0.8] — 2026-07-19

Link-health data-integrity fixes.

### Fixed
- A link-health check that runs while the machine is offline no longer marks every bookmark as broken. When every single check fails, Cove now assumes the network is down, leaves all statuses untouched, and retries on the next opportunity instead of stamping "broken" across the collection.
- A bookmark whose link recovers now returns to the status it had before it went broken (reading, done, archive, and so on) instead of always being reset to inbox. The prior status is remembered in the bookmark's frontmatter while the link is down.

### Added
- Continuous integration on every push: syntax-checks `main.js`, validates `manifest.json` against `versions.json`, and verifies the plugin class loads under a stubbed Obsidian API. The repository previously only ran checks at release time.

## [1.0.7] — 2026-07-08

Nested tag support.

### Added
- The **Tags** sidebar is now a collapsible tree that understands Obsidian-style nested tags (`parent/child`). Tags sharing a prefix nest under a common parent — which appears even when nothing is tagged with the bare parent — and every parent has a collapse toggle.
- Selecting a parent tag filters every bookmark beneath it (the parent itself and all descendants); selecting a leaf still matches exactly, and multiple selected tags continue to narrow results together.

### Changed
- Sidebar tag counts are now per-branch: a parent shows the number of distinct bookmarks tagged with it or any descendant, counting a bookmark tagged with both a parent and its child only once.

## [1.0.6] — 2026-07-07

Maintenance release — no functional changes to the plugin (`main.js` and `styles.css` are unchanged from 1.0.5).

### Changed
- CI: bumped `actions/checkout` from v4 to v5 in the release workflow; the v4 action was being forced onto the deprecated Node 20 runner.

## [1.0.5] — 2026-07-07

Follow-up hardening from a code review.

### Fixed
- The search box now keeps focus and cursor position across *every* re-render, not only while typing. A background link check or other vault event can no longer pull focus out of the search field mid-search.

### Security
- `favicon` and `cover` image URLs read from a bookmark's frontmatter are now restricted to `http(s)` and inline `data:image/` URIs, matching the scheme validation already applied to the bookmark URL. A crafted bookmark file can no longer point them at an arbitrary scheme or host.

### Changed
- The note-body search index now caps each note at 16 KB, bounding first-search I/O and resident memory on very large vaults.

## [1.0.4] — 2026-07-07

Search overhaul.

### Added
- The search box now searches bookmark **note bodies**, not just the title/description/tags/URL metadata. Note text is indexed on demand (frontmatter stripped, read from Obsidian's cache) and refreshed as files change.

### Fixed
- The search box no longer loses focus and cursor position while typing. Searching now updates only the results list instead of rebuilding the entire view, so the input you are typing into is never torn down.
- Match highlighting is now a plain case-insensitive substring scan, fixing fragile edge cases around adjacent and mixed-case matches and treating the query literally (no regex quirks).
- Corrected the search box placeholder, which previously advertised note search that was not implemented.

### Changed
- Search re-renders are scoped to the toolbar and results rather than the whole view, eliminating the per-keystroke full-view rebuild and keeping search responsive on large collections.

## [1.0.3] — 2026-07-07

Reliability, performance, and security hardening. No user-facing feature changes.

### Fixed
- Saving notes on a bookmark whose file used Windows (CRLF) line endings could fail to detect the frontmatter block and overwrite the bookmark's metadata. Note saves are now CRLF-safe and go through an atomic read-modify-write (`vault.process`).
- Editing a bookmark's notes and changing its status/tags/pin at nearly the same moment could revert the metadata change, due to a race between the debounced notes save and the frontmatter update. Both paths are now atomic.
- Frontmatter updates that encountered malformed YAML failed silently; they now surface an error notice instead of leaving the click with no visible effect.

### Changed
- Link health checks now rewrite only the bookmarks whose status actually changes, instead of stamping every file on every run — no more needless sync churn or full re-render cascades. Checks also run with limited concurrency for faster completion.
- Bookmark data is cached per vault change rather than recomputed several times per render, keeping large collections responsive.
- Destructive confirmations now use in-app dialogs instead of the blocking `window.confirm`, which is unreliable in the mobile app.
- HTML export on mobile now writes the file into the vault (browser-style downloads fail silently there).
- The list-view column popover's outside-click handler and the view's pending render timer are now torn down with the view, preventing stray listeners after the view closes.

### Security
- Bookmark URLs are validated on read: a non-`http(s)` URL placed in a bookmark file (e.g. `javascript:`) is ignored and can no longer reach `window.open` or a rendered link.

## [1.0.2] — 2026-06-25

Compliance fixes for the Obsidian community plugin submission. No functional or behavioral changes — `main.js` is byte-identical to 1.0.0.

### Fixed
- Removed all `!important` declarations from `styles.css` (six rules across the root container, sidebar links, the title cell, and the tree layout) to comply with Obsidian community plugin guidelines and pass automated validation.

## [1.0.1] — unreleased

Intermediate version bump during the community plugin submission process. Superseded by 1.0.2 before publication and never cut as a standalone GitHub release; recorded here because the version appears in `versions.json`.

## [1.0.0] — 2026-06-20

First public release: published to GitHub and submitted to the Obsidian community plugin directory. Feature set unchanged from the initial 0.1.0 build documented below. (An early `v1.0.0` tag was replaced by the unprefixed `1.0.0` tag that Obsidian requires.)

## [0.1.0] — 2026-04-30

Initial build.

### Added
- Four switchable layouts: compact list, cards, kanban board, tree-with-preview
- Per-bookmark inline editor: title, URL, description, status, tags, folder, custom icon, notes
- Notes textarea with Edit / Preview tabs (renders full Obsidian Markdown)
- Folder system with create, rename, set-icon, delete via right-click menu
- Drag-to-folder from any layout; multi-drag when multiple rows are selected
- Drag-between-status on the kanban board
- Visual icon picker (every Lucide icon, search-filtered, lazy-rendered)
- Per-bookmark, per-tag, per-folder, and per-status icon assignment
- Smart filters: Recently added, Pinned, Untagged, Broken links
- Pinned bookmarks (sticky-top regardless of sort)
- Breadcrumb chips in the header showing all active filters with individual clear
- Bulk actions: tag, status, move-to-folder, archive, delete
- Right-click context menus on every row in every layout
- Search highlighting in title, description, and domain
- Keyboard navigation (`j`/`k`/arrows, `e` expand, `x` select, `Enter` open, `/` search, `Esc` clear)
- Auto-fetched metadata: `og:title`, `og:description`, `og:image`, favicon, author, reading time
- Refetch metadata per bookmark from the inline editor
- Duplicate URL detection on add (prompts to open existing bookmark)
- Link health checks (manual + periodic, configurable interval)
- Import from Netscape Bookmarks HTML (Chrome, Firefox, Safari, Pocket, Raindrop, Pinboard)
- Export to Netscape Bookmarks HTML (browser-importable)
- Toggleable favicon column and inline custom-icon column (independent)
- Customizable column visibility and sort field/direction
- Settings tab with all the above plus per-status / per-tag / per-folder icon overrides

[1.0.7]: https://github.com/Real-Fruit-Snacks/Cove/releases/tag/1.0.7
[1.0.6]: https://github.com/Real-Fruit-Snacks/Cove/releases/tag/1.0.6
[1.0.5]: https://github.com/Real-Fruit-Snacks/Cove/releases/tag/1.0.5
[1.0.4]: https://github.com/Real-Fruit-Snacks/Cove/releases/tag/1.0.4
[1.0.3]: https://github.com/Real-Fruit-Snacks/Cove/releases/tag/1.0.3
[1.0.2]: https://github.com/Real-Fruit-Snacks/Cove/releases/tag/1.0.2
[1.0.0]: https://github.com/Real-Fruit-Snacks/Cove/releases/tag/1.0.0
