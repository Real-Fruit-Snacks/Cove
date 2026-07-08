<div align="center">

  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/assets/logo-dark.svg" />
    <img alt="Cove" src="docs/assets/logo-light.svg" width="480" />
  </picture>

  **A bookmark manager for Obsidian where every bookmark is a Markdown file with YAML frontmatter — no proprietary database, no lock-in.**

  [![License: MIT](https://img.shields.io/badge/License-MIT-cba6f7.svg)](LICENSE)
  [![Latest release](https://img.shields.io/github/v/release/Real-Fruit-Snacks/Cove?color=89b4fa&label=release)](https://github.com/Real-Fruit-Snacks/Cove/releases)
  [![Obsidian](https://img.shields.io/badge/Obsidian-1.5%2B-a6e3a1.svg)](https://obsidian.md)

  [Documentation](https://real-fruit-snacks.github.io/Cove/) · [Changelog](CHANGELOG.md) · [Report an issue](https://github.com/Real-Fruit-Snacks/Cove/issues)

</div>

---

## Overview

Cove stores each bookmark as a single `.md` file with YAML frontmatter, inside a folder you choose. There is no proprietary database and no cache you depend on — only your notes. If you disable Cove tomorrow, every bookmark remains a plain Markdown file in your vault: openable, searchable, versionable, and syncable like everything else Obsidian touches. The plugin keeps a lightweight in-memory index for speed, but it is derived entirely from those files and never the source of truth.

Adding a URL fetches the page's `og:title`, `og:description`, `og:image`, favicon, author, and estimated reading time, then writes them into the new note's frontmatter. Folders map one-to-one to real subfolders under your bookmarks root, and the same dataset renders through four switchable layouts:

- **List** — a dense, sortable table for fast triage.
- **Cards** — visual browsing with `og:image` heroes.
- **Board** — a Kanban view over the status workflow (Inbox → Reading → Done → Archive).
- **Tree** — a list-and-preview reading layout with an inline editor.

## Features

- **Plain-Markdown storage** — one `.md` file per bookmark; your vault is the database and your export is the backup.
- **Four switchable layouts** — List, Cards, Board, and Tree, all rendering the same underlying files.
- **Automatic metadata** — title, description, cover image, favicon, author, and reading time, fetched via Obsidian's networking API.
- **Inline editor** — edit title, URL, description, status, tags, folder, and a custom icon in place, plus a Markdown notes field with Edit/Preview tabs.
- **Full-text search** — matches across title, description, domain, URL, tags, **and each bookmark's notes**, with match highlighting.
- **Real folders** — mapped to actual vault subfolders; create, rename, set an icon, delete, and drag rows between them (nesting supported).
- **Status workflow** — Inbox, Reading, Done, Archive, and Broken, changeable from a menu, the board, or the inline editor.
- **Tags** — a pill editor with autocomplete, intersecting sidebar filters, and optional per-tag Lucide icons and colors.
- **Smart filters** — Recently added, Pinned, Untagged, and Broken links.
- **Pinned bookmarks** — kept at the top regardless of the active sort.
- **Custom icons** — per bookmark, per tag, per folder, and per status, chosen from a searchable Lucide icon picker.
- **Bulk actions** — multi-select across any layout to tag, set status, move, archive, or delete in one step.
- **Link health checks** — run on demand or periodically in the background; unreachable URLs are flagged as Broken.
- **Import & export** — read and write the Netscape Bookmarks HTML format used by Chrome, Firefox, Safari, Pocket, Raindrop, and Pinboard.
- **Desktop and mobile** — works on both; destructive actions use in-app dialogs and export adapts to the mobile app.

## Installation

**Requires Obsidian 1.5 or newer.**

### Community plugins (recommended)

1. Open **Settings → Community plugins → Browse**.
2. Search for **Cove**, then **Install** and **Enable**.

### BRAT (for the latest pre-release)

Install [BRAT](https://github.com/TfTHacker/obsidian42-brat), then add `Real-Fruit-Snacks/Cove` as a beta plugin.

### Manual

Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/Real-Fruit-Snacks/Cove/releases/latest) into `<your-vault>/.obsidian/plugins/cove/`, then enable Cove under **Settings → Community plugins**.

## Getting started

1. Click the **bookmark** ribbon icon (or run **Open Cove** from the command palette) to open the view.
2. Set your storage folder under **Settings → Cove → Bookmarks folder** (defaults to `Bookmarks`).
3. Click **+ Add** — or press `Ctrl/Cmd+P` → **Add bookmark**. The dialog pre-fills from your clipboard if it holds a URL, fetches metadata in the background, and warns you if the URL is already saved.

### Commands

| Command | Description |
| --- | --- |
| Open Cove | Open or focus the Cove view |
| Add bookmark | Add a bookmark from a URL |
| Import bookmarks (HTML) | Import a Netscape bookmarks file |
| Export bookmarks to HTML | Export all bookmarks to a browser-importable file |
| Check link health | Check every bookmark and flag unreachable links |

### Keyboard shortcuts

`j` / `k` / arrows move focus · `e` toggles the inline editor · `x` toggles selection · `Enter` opens in the browser · `/` focuses search · `Esc` clears the selection.

## How a bookmark is stored

Every bookmark is just a Markdown file. Cove reads and writes its frontmatter through Obsidian's `FileManager`, so the YAML stays valid and internal links stay intact. A typical file looks like:

```markdown
---
url: https://example.com/great-article
title: A Great Article
domain: example.com
description: A short summary pulled from the page's metadata.
status: reading
tags:
  - research
  - typescript
added: 2026-07-07T14:03:00.000Z
favicon: https://example.com/favicon.ico
cover: https://example.com/og-image.png
author: Jane Doe
reading-time: 7
pinned: true
---

Your own Markdown notes go here, below the frontmatter.
```

Most fields are optional; `pinnedAt`, `opened`, and `lastChecked` are added automatically as you pin, open, and check links.

## Architecture

```
cove/
├── manifest.json    Plugin metadata
├── versions.json    Plugin version → minimum Obsidian version map
├── main.js          Plugin code (single-file CommonJS, no build step)
├── styles.css       Scoped to .cv-* classes; themed via Obsidian CSS variables
└── docs/            Documentation site and logo assets
```

- **No build step** — a single hand-written CommonJS `main.js`, with no framework or bundler.
- **Reads** — bookmark data comes from Obsidian's `metadataCache` (frontmatter only). The parsed list is cached in memory and invalidated on vault and metadata events, so views stay fast without re-reading files. Note bodies are indexed on demand for search using `cachedRead`, keyed by modification time and capped per file.
- **Writes** — frontmatter changes go through `fileManager.processFrontMatter` (atomic, preserves YAML and links); note-body edits go through `vault.process` (atomic and line-ending-safe), so metadata is never clobbered by a concurrent edit.
- **Safety** — bookmark, favicon, and cover URLs are scheme-validated on read; the only network activity is Obsidian's `requestUrl` fetching page metadata and checking links for URLs you add. No telemetry, no third-party services.
- **Theming** — all UI uses namespaced `.cv-*` classes and Obsidian's CSS variables, so it follows your light/dark theme.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md) before opening a pull request.

## License

Released under the [MIT License](LICENSE).
