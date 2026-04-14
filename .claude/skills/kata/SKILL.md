---
name: kata
description: Create a new AI kata for the odd-ai-katas project. Use this skill when the user wants to add a new kata, write kata content, or says "/kata". Also trigger when they mention a kata topic they want to turn into content, like "let's write a kata about X" or "new kata for Y".
---

# Creating a Kata

A kata teaches one concept about working with AI tools. It starts with a feeling or question engineers have, explains what's going on, shows 1-2 concrete tool examples, and ends with an exercise.

## Process

### Step 1: Research

Before writing anything, do deep research on the topic. Use WebSearch to understand:
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

The user reviews all 3 in the browser, picks the best (or combines elements), and you finalize it as the real kata file at `src/content/katas/<slug>.mdx` with `status: done`.

Do NOT delete the draft variations. Keep them in `src/content/katas/` with `status: draft`. They stay on the site but are hidden by default behind the "Show drafts" toggle on the main page. This lets the user:
- During development: toggle drafts on, compare all 3 side by side
- During delivery: show engineers the drafts alongside the final version to demonstrate how content evolves

The final kata gets `status: done`. The 3 draft variations keep `status: draft` permanently.

## Content Structure

Every kata follows this pattern:

1. **Concept section** - Explain the general idea. Tool-agnostic. This is the core of the kata. Keep it concise and practical.
2. **Tool examples** - Show 1-2 specific tools demonstrating the concept. Use screenshots or placeholder images. Bold the tool name (e.g., "In **Claude Code**..."). Don't try to cover every tool.
3. **Exercise** - 2-3 concrete steps the reader can do in whatever tool they use. Good exercises ask the reader to try a specific prompt or find something in their tool. Tip: "ask the AI itself" is often a great exercise step.

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
tools:
    - "claude-code"
    - "vscode"
---
```

### Frontmatter fields

- `feeling` - The question or trigger. Phrased from the engineer's perspective.
- `lastUpdated` - Today's date.
- `description` - One sentence. Shows up on the card and in search.
- `status` - Set to `draft` for new katas. Changed to `done` when finalized.
- `tags` - Categories like "basics", "context", "trust", "verification", "automation".
- `tools` - Only list tools that have specific examples or screenshots in the content. Valid IDs: `claude-code`, `vscode`, `cursor`, `gemini-cli`, `codex`, `cowork`, `antigravity`.
- `related` (optional) - Array of other kata slugs.
- `stub` (optional) - Set to `true` if the kata is a placeholder with no content yet.

## Images

Store screenshots at `public/images/katas/<kata-slug>/`. Reference them in MDX as:

```markdown
![Alt text describing the screenshot](/ai-katas/images/katas/<kata-slug>/filename.png)
```

If you don't have a screenshot yet, note where one should go with a comment:

```markdown
{/* TODO: screenshot of Claude Code showing X */}
```

MDX does not support HTML comments (`<!-- -->`). Always use JSX comments (`{/* */}`).

## Adding to the sequence

After creating the kata file, add the kata slug to `src/data/kata-sequence.ts` to control its position in the list. Katas not in the sequence appear at the end.

## Writing Style

- Never use em dashes.
- Lead with the concept, not the tool.
- Keep tool-specific content to short examples, not reference docs.
- Write for engineers who are smart but may be new to AI tools.
- Be direct. No filler, no hype.
- Exercises should be things someone can do right now in 2-5 minutes.

## Exemplar

Read `src/content/katas/what-does-it-already-know.mdx` for the reference pattern. It demonstrates:
- Concept first (what gets loaded, why it matters)
- Two tool examples with screenshots (Claude Code, VS Code)
- Exercise with 2 concrete steps including prompts to try
