# Changelog

All notable changes to Cove are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [SemVer](https://semver.org/spec/v2.0.0.html).

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

[1.0.4]: https://github.com/Real-Fruit-Snacks/Cove/releases/tag/1.0.4
[1.0.3]: https://github.com/Real-Fruit-Snacks/Cove/releases/tag/1.0.3
[1.0.2]: https://github.com/Real-Fruit-Snacks/Cove/releases/tag/1.0.2
[1.0.0]: https://github.com/Real-Fruit-Snacks/Cove/releases/tag/1.0.0
