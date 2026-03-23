# AGENTS.md

## Purpose

This repository is a Codex-operated website remodeling template.

Its job is to take an existing front-facing marketing website, analyze
it, and rebuild it inside this repository as a cleaner, more modern,
more conversion-focused version using:

- Vue 3
- Vite
- PrimeVue
- PrimeBlocks
- Tailwind CSS
- optional Supabase

This is not a literal cloning task. This is a remodel task.

---

## Core objective

Given a source website URL and repository configuration, inspect the
source site and rebuild it as an improved marketing site while
preserving:

- the business purpose
- core messaging
- information architecture
- key pages
- audience intent

Improve:

- visual hierarchy
- layout quality
- responsiveness
- CTA clarity
- readability
- consistency
- polish

---

## Non-negotiable rules

### 1. Do not blindly clone

Do not produce a line-by-line or pixel-for-pixel copy.

This repository should contain a remodeled version, not a duplicate.

### 2. Preserve business intent

The rebuilt site should still represent the same company, offer,
audience, and page purpose unless the repository instructions explicitly
say otherwise.

### 3. Do not fabricate

Do not invent:

- testimonials
- case studies
- client logos
- statistics
- awards
- certifications
- team members
- office locations
- pricing details
- legal claims

If the source site does not provide something, either omit it, simplify
it, or use a clearly neutral placeholder only where appropriate.

### 4. Prime-first implementation

Prefer:

- PrimeBlocks for section-level composition
- PrimeVue components for UI and interactions
- utility classes for spacing/layout
- minimal custom CSS

### 5. Autonomous design direction is required

Do not expect manual art-direction fields in the config.

Infer design direction from:

- source website content and structure
- source visual language and UX weaknesses
- business category and audience
- optional `inspirationUrl` visual cues

### 6. Mandatory PrimeBlocks discovery

Do not rely only on the prebuilt template sections in this repository.

For each remodel, review PrimeBlocks patterns and log:

- at least 6 candidate blocks
- at least 3 selected block patterns
- rationale for selected and rejected patterns

Document this in `remodel-plan.md`.

### 7. Creative freedom is expected

Use strong creative judgment for layout and design while staying inside
business and content constraints.

Creativity should improve communication and conversion quality.

### 8. Free stock photos are allowed

AI runs may use free stock photos when source assets are missing or low
quality. Preferred sources include Unsplash, Pexels, and Pixabay.

Rules:

- verify the image license allows commercial website usage
- keep imagery relevant to the business context
- avoid trademark-heavy or misleading visuals
- record image source links in `remodel-plan.md` under asset notes

### 9. Reusable sections

Build pages from reusable sections whenever possible. Avoid giant one-off
page files unless necessary.

### 10. Accessibility and responsiveness

Maintain:

- semantic headings
- usable contrast
- keyboard-friendly controls
- responsive layouts
- mobile-friendly navigation

### 11. Use Supabase only when needed

Supabase is optional infrastructure. Only use it when the target site
genuinely benefits from:

- form submissions
- auth
- editable content
- stored leads
- dynamic content workflows

If it is not needed, do not force it into the implementation.

---

## Required workflow

### Phase 1: inspect and plan

Before major implementation work:

1. Read `site-remodel.config.json`
2. Inspect the source website
3. Inspect `inspirationUrl` if provided
4. Identify:
   - business type
   - target audience
   - navigation structure
   - key pages
   - repeated sections
   - CTA paths
   - content strengths
   - content weaknesses
   - design weaknesses
   - visual opportunities
5. Complete `remodel-plan.md`

`remodel-plan.md` must include:

- source URL
- inspiration URL
- business summary
- target audience
- sitemap
- autonomous design inference
- 2-3 design directions
- selected direction rationale
- PrimeBlocks discovery log
- variation commitments
- page-by-page rebuild plan
- design notes
- content issues
- asset issues
- implementation checklist

Do not skip the planning step.

### Phase 2: rebuild

After planning:

1. Map source pages into repository page structure
2. Rebuild with reusable Vue sections
3. Compose sections using PrimeBlocks-inspired patterns and PrimeVue
   components
4. Improve hierarchy, spacing, visual consistency, and conversion flow
5. Preserve original message unless clearly weak or redundant
6. Rewrite copy only when needed for clarity and professionalism
7. Keep final output believable and grounded

---

## Design rules

### Use the repository configuration

Read from `site-remodel.config.json`.

Respect:

- `sourceUrl`
- `inspirationUrl`
- `siteName`
- `primaryColor`
- `secondaryColor`
- `useSupabase`

### Direction inference requirements

The model must determine tone, visual direction, and layout style on its
own. These are outputs of analysis, not config inputs.

### Variation requirements

Do not reuse a generic skeleton across projects.

Intentionally vary at least 6 of these axes and record them in
`remodel-plan.md`:

- hero composition
- section sequence
- card/grid style
- visual density/whitespace rhythm
- background/surface treatment
- CTA emphasis pattern
- imagery treatment
- iconography style

### Design priorities

Prefer:

- strong hero section
- clear CTA placement
- readable section rhythm
- concise cards/grids
- modern spacing
- clean footer
- polished mobile layout

### Avoid

Avoid:

- excessive animations
- random gradients everywhere
- novelty layouts that reduce clarity
- unnecessary dependencies
- deeply custom styling when a Prime-based solution works
- unchanged starter-template layout patterns

---

## Quality bar

Before finishing, ensure:

- the app builds successfully
- no broken imports exist
- no dead routes exist
- buttons and nav links are sensible
- content is coherent
- headings are meaningful
- the site works on mobile and desktop
- the result feels like a professional remodel, not a raw scrape
- verify card/readability contrast
- no white/light text on light card backgrounds
- body text contrast should meet WCAG AA (target >= 4.5:1)
- verify button color consistency
- filled/outlined/text PrimeVue buttons use brand palette
- headers that are left aligned and their corresponding subheader are
  aligned at start
- PrimeVue buttons account for primary and secondary colors

---

## Final deliverables for each remodel

When a remodel is complete, provide:

1. updated site implementation
2. updated `remodel-plan.md`
3. a short summary of:
   - what pages were rebuilt
   - what improved
   - what assets were reused
   - what placeholders remain
   - whether Supabase was used
   - what inspiration and PrimeBlocks patterns were applied
