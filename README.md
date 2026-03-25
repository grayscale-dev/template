# Website Remodel Template

A Codex-friendly starter repository for rebuilding existing marketing
websites into cleaner, more modern versions using Vue, Vite, PrimeVue,
PrimeBlocks, Tailwind CSS, and optional Supabase.

This repository is for remodels, not clones.

---

## What changed in this template

This version is designed to reduce repetitive, same-looking outputs.

Key changes:

- config no longer asks you to hand-author style strategy fields
- Codex must infer tone, visual direction, and layout style
- optional `inspirationUrl` added to config
- defaults to local PrimeBlocks library workflow (`../components`)
- PrimeBlocks scouting is now required before major implementation
- `remodel-plan.md` now captures direction logic, PrimeBlocks picks, and
  variation commitments

---

## Creative model

This template uses objective inputs and autonomous direction inference.

You provide:

- source website URL
- optional inspiration URL
- PrimeBlocks access level and local library path
- PrimeBlocks delivery mode (`local` by default, `catalog` optional)
- site name
- brand colors
- optional Supabase toggle

Codex determines:

- tone
- visual direction
- layout style
- section pacing
- CTA emphasis pattern
- PrimeBlocks composition choices

---

## Stack

- Vite
- Vue 3
- TypeScript
- PrimeVue
- PrimeIcons
- Tailwind CSS
- Vue Router
- optional Supabase

---

## Repository workflow

### 1. Edit the config

Update `site-remodel.config.json`.

Example:

```json
{
  "sourceUrl": "https://example.com",
  "inspirationUrl": "https://inspiration-example.com",
  "primeBlocksAccess": "full",
  "primeBlocksDelivery": "local",
  "primeBlocksLocalPath": "../components",
  "siteName": "Example Company",
  "primaryColor": "#2563eb",
  "secondaryColor": "#0f172a",
  "useSupabase": false
}
```

### 2. Review agent instructions

This repository includes `AGENTS.md`, which defines the remodel rules.

### 3. Run Codex

Point Codex at this repository and instruct it to follow:

- `README.md`
- `AGENTS.md`

### 4. Review the remodel plan

Before major implementation, Codex should update `remodel-plan.md` with:

- source and inspiration analysis
- autonomous design inference
- 2-3 direction options and selected direction
- PrimeBlocks discovery log
- variation commitments

### 5. Review finished remodel

The final output should include:

- rebuilt pages
- improved structure and styling
- PrimeBlocks-informed section composition
- completed `remodel-plan.md`

---

## PrimeBlocks requirement

Each remodel run should review PrimeBlocks patterns and avoid relying
only on the starter page composition already in this repository.

Codex should:

- use the configured PrimeBlocks source:
  - `catalog`: use online PrimeBlocks catalog patterns
  - `local`: use local licensed files from `primeBlocksLocalPath`
- review a candidate set of PrimeBlocks patterns
- select patterns that fit the industry and audience
- record selected and rejected options in `remodel-plan.md`

### PrimeBlocks full-access setup

1. Set `primeBlocksAccess` to `full`.
2. Use `primeBlocksDelivery: "local"` and point
   `primeBlocksLocalPath` at the local block library (default:
   `../components`).
3. Use `primeblocks:summary` and `primeblocks:search` to scout candidate
   blocks before implementation.
4. Log the source used in `remodel-plan.md`.
5. Switch to `catalog` mode only when you intentionally want to scout
   online patterns.

Note: some PrimeBlocks accounts show downloads for Figma and legacy
resources, while current block implementation is consumed via the online
catalog.

### PrimeBlocks library tooling

Summarize available local blocks:

```bash
npm run primeblocks:summary
```

Search local block names/paths:

```bash
npm run primeblocks:search -- --query "hero"
```

List blocks under a category/subcategory:

```bash
npm run primeblocks:list -- --category Marketing --subcategory Hero
```

Refresh or rebuild the local component library:

```bash
node scripts/fetch-primeblocks-components.mjs
```

---

## Stock photo policy

Codex may use free stock photos when source imagery is missing or low
quality.

Preferred sources:

- Unsplash
- Pexels
- Pixabay

Requirements:

- confirm license terms allow website/commercial use
- choose photos that match business and audience
- avoid misleading imagery
- document image source links in `remodel-plan.md`

---

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Important files

Root files:

- `README.md` - repo-level instructions
- `AGENTS.md` - operational remodel rules
- `site-remodel.config.json` - objective project inputs
- `remodel-plan.md` - planning and direction log

App files:

- `src/content/site-content.ts` - structured content model
- `src/pages/*` - top-level pages
- `src/sections/*` - reusable marketing sections
- `src/components/layout/*` - shared layout
- `src/lib/theme.ts` - theme application
- `src/lib/supabase.ts` - optional Supabase client

---

## Master Remodel Prompt

Read this repository before making changes.

This repository is a website remodeling system, not a generic app
starter. Your task is to inspect the source website defined in
`site-remodel.config.json` and rebuild it inside this repository as a
more modern, more polished, more conversion-focused marketing site using
Vue, PrimeVue, PrimeBlocks patterns, and the repository structure
already provided.

Follow all repository instructions, especially:

- `README.md`
- `AGENTS.md`

Required process:

1. Read `site-remodel.config.json`
2. Inspect the source website at `sourceUrl`
3. Inspect `inspirationUrl` when provided
4. Inspect PrimeBlocks by configured delivery:
   - `catalog`: review online block catalog
   - `local`: review `primeBlocksLocalPath`
5. Identify:
   - business type
   - target audience
   - site structure
   - key pages
   - major sections
   - CTA patterns
   - strengths and weaknesses
6. Infer direction (tone, layout style, visual posture) from analysis
7. Propose 2-3 visual directions in `remodel-plan.md`, choose one, and
   explain why it fits
8. Log PrimeBlocks delivery/source + candidates + selected patterns
9. Update `remodel-plan.md` before major implementation
10. Rebuild with reusable sections and Prime-first composition
11. Preserve business intent and real content where possible
12. Do not blindly clone the original design
13. Do not fabricate testimonials, case studies, statistics, or business
    claims
14. Only use Supabase when genuinely needed
15. Keep the implementation responsive, accessible, and believable
