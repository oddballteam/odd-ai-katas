---
name: caveman
description: Create a caveman-mode variant of an existing kata. Use when the user wants to make a caveman version of a kata, says "/caveman", or mentions turning a kata into caveman language. Also trigger when they say "cave version" or "simple version" of a kata.
---

# Creating a Caveman Kata

Take an existing final kata and rewrite it in caveman voice. The caveman version lives alongside the original and swaps in when the user toggles "Caveman mode" on the site.

## Rules

- The title (`feeling`) should still clearly communicate the kata's purpose. Caveman voice goes in the content, not the title. Keep titles accessible and clear. e.g. "AI Words Made Simple" not "Cave Painting Dictionary."
- The `description` can be simplified and casual but must still make sense at a glance.
- The body content uses caveman voice throughout: short sentences, simple words, funny metaphors.
- Call the AI tool "magic box" or "tool." Call the codebase "cave" or "code cave." Call messages "grunts."
- Tables keep the same terms but rewrite definitions in caveman speak.
- Exercises should match the voice. "Grunt at it:" instead of "Ask your tool:". Keep the actual prompts useful though, the AI still needs to understand them.
- Screenshots and images stay the same as the original.
- Never use em dashes.

## File Format

Create the file at `src/content/katas/<original-slug>-caveman.mdx` with this frontmatter:

```yaml
---
feeling: "Clear title in simple language"
lastUpdated: "YYYY-MM-DD"
description: "Simple casual description that still makes sense."
status: done
variant: caveman
variantOf: original-slug
tags:
    - same tags as original
tools:
    - same tools as original
---
```

Key fields:
- `variant: caveman` marks this as a caveman variant
- `variantOf: original-slug` links it to the normal kata (must match the original's filename without extension)

## Process

1. Read the original kata
2. Rewrite the content in caveman voice
3. Keep the same structure (sections, exercises, images)
4. Add the slug to `src/data/kata-sequence.ts` right after its normal counterpart

## Exemplars

Read these for the established voice:
- `src/content/katas/what-does-it-already-know-caveman.mdx`
- `src/content/katas/glossary-caveman.mdx`
