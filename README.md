<div align="center">

  # Cove

  **Bookmark manager for Obsidian — every bookmark is a markdown file with YAML frontmatter under a folder of your choice.**

  [![License: MIT](https://img.shields.io/badge/License-MIT-cba6f7.svg)](LICENSE)
  [![Version](https://img.shields.io/badge/version-1.0.0-89b4fa)](https://github.com/Real-Fruit-Snacks/Cove/releases)
  
  [Report Issue](https://github.com/Real-Fruit-Snacks/Cove/issues)

</div>

---

## Overview

Cove is an **Obsidian plugin** that treats each bookmark as a `.md` file with YAML frontmatter — nothing more. There is no proprietary database, no `.json` cache, no migration layer, and no sync layer. If you uninstall Cove tomorrow, every bookmark is still a plain markdown note in your vault, openable, searchable, and exportable like everything else Obsidian touches.

The same dataset renders through four switchable layouts:
- **Compact List**: For dense triage.
- **Cards**: For visual browsing with `og:image` heroes.
- **Kanban**: For status workflows (Inbox → Reading → Done → Archive).
- **Tree**: For a list-and-preview reading layout.

Adding a URL automatically fetches `og:title`, `og:description`, `og:image`, favicon, author, and reading time via Obsidian's built-in APIs. Folders map 1:1 to real filesystem subfolders inside your designated bookmarks root. Drag any row, card, or tree item onto any folder to intuitively move it.

---

## Key Features

- **No Lock-In Storage**: One `.md` per bookmark. Your export is the storage.
- **Multiple Views**: Instantly switch between Compact list, Cards, Kanban board, or Tree-with-preview.
- **Auto-Fetched Metadata**: Automatically extracts title, description, `og:image`, favicon, author, and reading time.
- **Real Folders**: Map directly to vault subfolders. Features drag-to-move and per-folder icons.
- **Workflow Status**: Track items through Inbox, Reading, Done, Archive, or Broken.
- **Tag Management**: Support for pills with autocomplete, sidebar filter intersection, and custom per-tag Lucide icons.
- **Health Checks**: Periodic background checking flags unreachable URLs as broken.
- **Bulk Operations**: Multi-select across views to batch tag, move, or archive items.
- **Netscape Import**: Easy import from Chrome, Firefox, Safari, Pocket, Raindrop, or Pinboard.

---

## Getting Started / Installation

**Prerequisites:** Obsidian 1.5+

### Manual Installation
1. Navigate to your vault's plugin folder:
```bash
cd <your-vault>/.obsidian/plugins
git clone https://github.com/Real-Fruit-Snacks/Cove.git cove
```
2. In Obsidian, go to **Settings → Community plugins → Cove → Enable**.

### Via BRAT
If you use [BRAT](https://github.com/TfTHacker/obsidian42-brat), simply add this repository URL through the BRAT settings.

---

## Usage

**Creating your first bookmark:**
1. Click the **Ribbon icon (bookmark)** to open the Cove view.
2. Go to **Settings → Cove → Bookmarks folder** to set your root folder.
3. Click the **+ Add** button (or use `Ctrl+P` → Add bookmark). The modal will automatically pre-fill with the URL from your clipboard, and metadata fetching runs in the background. If the URL is already saved, Cove will prompt you to open the existing bookmark.

**Keyboard Shortcuts:**
- `j` / `k` / `arrows`: Move focus
- `e`: Toggle inline editor
- `x`: Toggle selection (multi-select)
- `Enter`: Open in browser
- `/`: Focus search
- `Esc`: Clear selection

---

## Architecture / File Structure

```
cove/
├── manifest.json    Plugin metadata
├── versions.json    minAppVersion compatibility map
├── main.js          Plugin code (single-file CommonJS, no build step)
├── styles.css       Scoped to .cv-* classes, themes via Obsidian CSS vars
└── docs/
    └── assets/      Logo SVGs (dark + light)
```

**Technical Stack & Design:**
- **Storage**: Plain `.md` files with YAML frontmatter.
- **API**: Obsidian Plugin API (`ItemView`, `Modal`, `Setting`, `Menu`, `MarkdownRenderer`).
- **UI**: Hand-written CommonJS without a framework or bundler.
- **Drag & Drop**: Native HTML5 APIs.
- **State**: Cove holds zero state in memory beyond the current render pass. Every list rebuilds securely from Obsidian's `metadataCache`. All file interactions utilize `app.fileManager` to guarantee YAML validity and internal link integrity.

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to help improve the project. Be sure to also review our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## License

This project is licensed under the [MIT License](LICENSE).
