# Changelog

All notable changes to Cove are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [SemVer](https://semver.org/spec/v2.0.0.html).

## [0.1.0] — 2026-04-30

Initial release.

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

[0.1.0]: https://github.com/Real-Fruit-Snacks/Cove/releases/tag/0.1.0
