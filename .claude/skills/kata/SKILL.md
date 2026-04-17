---
name: kata
description: Create a new AI kata for the odd-ai-katas project. Use this skill when the user wants to add a new kata, write kata content, or says "/kata". Also trigger when they mention a kata topic they want to turn into content, like "let's write a kata about X" or "new kata for Y".
---

# Creating a Kata

A kata teaches one concept about working with AI tools. It starts with a feeling or question engineers have, explains what's going on, shows 1-2 concrete tool examples, and ends with an exercise.

## Local Development

Run the dev server in the background and share the clickable link.

- `npm run dev` serves on http://localhost:4321/odd-ai-katas
- If port 4321 is taken, pass an explicit port: `npm run dev -- --port 4322`. Always share the actual URL you started.
- **New `.mdx` files require a restart.** Astro's glob loader only scans at startup. Edits to existing files hot-reload fine; new files do not appear until you restart the server.

## Process

### Step 1: Research

Before writing anything, do deep research on the topic. For claims about current (2026) tool behavior, dispatch a general-purpose or Explore agent to gather fresh sources rather than relying on training data. Use WebSearch to understand:
- How different AI tools handle this concept
- What developers commonly struggle with or misunderstand
- Current best practices and terminology
- Concrete examples and commands for at least 2 tools

This research informs the content. Don't just write from what you already know.

### Step 2: Write 3 variations

All new katas start as drafts. Create 3 different variations so the user can compare approaches:

- `src/content/katas/<slug>-v1.mdx`
- `src/content/katas/<slug>-v2.mdx`
- `src/content/katas/<slug>-v3.mdx`

Each variation should take a meaningfully different angle on the topic. Not just rewording, but different framing, different structure, different examples, or different emphasis. All three must set `status: draft` in frontmatter.

**Always create new drafts, never edit existing ones.** If the user wants revisions, create new versions with the next number (v4, v5, v6...). This preserves the history of how the content evolved. A kata can have up to 50+ drafts. Number them in order of creation.

### Step 3: Add to sequence

Add all 3 slugs to `src/data/kata-sequence.ts` so they show up on the site for review.

### Step 4: User picks

The user reviews all 3 in the browser, picks the best (or combines elements), and you finalize it as the real kata file at `src/content/katas/<slug>.mdx` with `status: done` and **drop the `description` field** from the frontmatter (graduated katas omit it).

Do NOT delete the draft variations. Keep them in `src/content/katas/` with `status: draft`. They stay on the site but are hidden by default behind the "Show drafts" toggle on the main page. This lets the user:
- During development: toggle drafts on, compare all 3 side by side
- During delivery: show engineers the drafts alongside the final version to demonstrate how content evolves

The final kata gets `status: done`. The 3 draft variations keep `status: draft` permanently.

If a graduated kata later gets absorbed into another kata's coverage, demote it to `status: draft` rather than deleting it. Preserves history.

## Content Structure

Every kata follows this pattern:

1. **Concept section** - Explain the general idea. Tool-agnostic. This is the core of the kata. Keep it concise and practical.
2. **Tool examples** - Show 1-2 specific tools demonstrating the concept. Use screenshots or placeholder images. Bold the tool name (e.g., "In **Claude Code**..."). Don't try to cover every tool.
3. **Exercise** - 2-3 concrete steps the reader can do in whatever tool they use. Good exercises ask the reader to try a specific prompt or find something in their tool. Tip: "ask the AI itself" is often a great exercise step. Note: if the kata body is already exercise-shaped (e.g. a series of spoiler-reveal scenarios), a standalone Exercise section is redundant and should be dropped.

## Reusable patterns

- **Tabs**: `import Tabs from '../../components/Tabs.astro';` then `<Tabs labels={["Claude Code", "Cursor"]}>` wrapping `<div class="kata-tab-panel">` blocks. Script is baked into the component, don't inline your own.
- **Spoiler reveal**: native `<details><summary>Question?</summary>Answer</details>`. Site auto-styles it via `.kata-body details` (`+ / -` markers, accent border on open). Useful for quiz-style scenarios.
- **Callout**: `<div class="callout"><div class="callout-label">Label</div>Body</div>`. Variants: `callout warn`, `callout safe`.

## File Format

Create an MDX file at `src/content/katas/<slug>.mdx` with this frontmatter:

```yaml
---
feeling: "The question or feeling that triggers this kata"
lastUpdated: "YYYY-MM-DD"
description: "One sentence explaining what the kata covers."
status: draft
tags:
    - "tag1"
    - "tag2"
---
```

### Frontmatter fields

- `feeling` - The question or trigger. Phrased from the engineer's perspective.
- `lastUpdated` - Today's date.
- `description` - One sentence. Shows up on the card and in search. Drop this field when graduating to `status: done`.
- `status` - Set to `draft` for new katas. Changed to `done` when finalized.
- `tags` - Categories like "basics", "context", "trust", "verification", "automation".
- `related` (optional) - Array of other kata slugs.
- `stub` (optional) - Set to `true` if the kata is a placeholder with no content yet.

## Images

Store screenshots at `public/images/katas/<kata-slug>/`. Reference them in MDX as:

```markdown
![Alt text describing the screenshot](/odd-ai-katas/images/katas/<kata-slug>/filename.png)
```

If you don't have a screenshot yet, note where one should go with a comment:

```markdown
{/* TODO: screenshot of Claude Code showing X */}
```

MDX does not support HTML comments (`<!-- -->`). Always use JSX comments (`{/* */}`).

## Adding to the sequence

After creating the kata file, add the kata slug to `src/data/kata-sequence.ts` to control its position in the list. Katas not in the sequence appear at the end.

## Writing Style

- Never use em dashes or double hyphens (`--`). Use single hyphens or rewrite.
- Lead with the concept, not the tool.
- Keep tool-specific content to short examples, not reference docs.
- Write for engineers who are smart but may be new to AI tools.
- Be direct. No filler, no hype.
- Exercises should be things someone can do right now in 2-5 minutes.
- **Don't invent specific percentages, token counts, or benchmark numbers.** If you're tempted to write "~30% of the window" or "15-40k baseline", research and cite an actual source, or drop the precision and speak qualitatively.

## Exemplars

Read these for the current reference patterns:

- `src/content/katas/context.mdx` - **spoiler-reveal pattern**. `<details>/<summary>` scenarios with "what do you do when..." framing. Good when the concept is a set of situations with different correct answers.
- `src/content/katas/config-files.mdx` - **tabs + do/don't pattern**. Short concept section, Do/Don't list, `<Tabs>` with per-tool file trees, exercise as a docs-crawl. Good when the same idea has tool-specific implementations.
- `src/content/katas/what-tool.mdx` - **landscape overview pattern**. Categorized sections with screenshots and links. Good for "here's what exists" topics.
