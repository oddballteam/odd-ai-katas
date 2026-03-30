# AI Katas

Practice the middle part between prompt and result.

Each kata starts with a feeling -- something that trips people up when working with AI tools. The kata walks you through what's happening, why it matters, and gives you a concrete exercise to build the skill.

40 katas covering trust, context, verification, automation, and more.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:4321

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

When the repo is public (or on a GitHub Enterprise Cloud org with private Pages), you can deploy with GitHub Actions.

1. Go to **Settings > Pages** and set the source to **GitHub Actions**.

2. Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          ASTRO_SITE: https://${{ github.repository_owner }}.github.io
          ASTRO_BASE: /${{ github.event.repository.name }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

3. Update `astro.config.mjs` to support the base path:

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  site: process.env.ASTRO_SITE,
  base: process.env.ASTRO_BASE || '/',
});
```

The site will be available at `https://oddballteam.github.io/odd-ai-katas/`.
