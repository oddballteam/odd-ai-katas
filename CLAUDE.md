# odd-ai-katas

Astro 6 site with 40+ AI practice katas. Each kata starts with a feeling (something that trips people up when working with AI tools) and walks through what's happening, why it matters, and gives a concrete exercise.

## Tech Stack
Astro 6, MDX, Node 22+.

## Claude Code Conventions

- When starting the dev server, run it in the background and always provide the clickable link: http://localhost:4321/ai-katas
- **New files require a server restart**: Astro's glob loader only scans at startup. Edits to existing MDX files hot-reload fine, but adding new `.mdx` files requires stopping and restarting the dev server.
- **Graduate a draft**: To graduate a draft (e.g. `glossary-v7`), duplicate it to the final slug (`glossary.mdx`), set `status: done`, and remove it from `kata-sequence.ts`. Keep all draft versions in place with `status: draft`. Future edits go on the final version, no more version numbers.

## Key Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server on localhost:4321 |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview built site |

## Architecture
```
src/
├── content/katas/      # 42 MDX files, one per kata
├── content.config.ts   # Zod schema for kata frontmatter
├── data/tool-content.ts # Tool definitions (Claude Code, Cowork, VS Code, Cursor, Gemini CLI, Antigravity, Codex)
├── layouts/            # Astro layouts
├── pages/              # Index + kata detail pages
└── styles/             # Site styles
```

Each kata MDX has frontmatter: `feeling` (the human trigger), `description`, `order`, `related` (linked katas), `stub` (if still in development), `tools` (which AI tools apply), and optional `toolSteps` (tool-specific instructions).

Deploys to GitHub Pages at `oddballteam.github.io/odd-ai-katas/`.
