Read this repository and execute a full remodel run.

Hard requirements:
- Follow AGENTS.md and README.md exactly.
- Read site-remodel.config.json first.
- Inspect sourceUrl and inspirationUrl (if provided) before coding.
- If primeBlocksAccess is `full`, follow primeBlocksDelivery:
  - `catalog`: use online PrimeBlocks catalog patterns
  - `local`: use local blocks from primeBlocksLocalPath
- In `local` mode, actively scout the local library (default `../components`) and use it as the primary PrimeBlocks source.
- Do not ask me for tone/visual/layout direction unless blocked; infer it from source + industry + inspiration.
- Do not clone the source site 1:1.
- Do not fabricate testimonials, stats, logos, awards, or claims.

Workflow:
1) Update remodel-plan.md before major implementation.
2) In remodel-plan.md include:
   - source + inspiration analysis
   - business summary, audience, sitemap
   - autonomous design inference
   - PrimeBlocks source used (local component library vs public catalog)
   - 2-3 design directions and one selected direction with rationale
   - PrimeBlocks discovery log with at least 6 candidates and at least 3 selected patterns
   - variation commitments (hero, section order, grid/card style, CTA treatment, background/surfaces, typography density)
3) Rebuild pages using reusable Vue sections, PrimeVue components, and PrimeBlocks-inspired composition.
4) Ensure this run is materially different from default template composition.
5) Keep responsive/accessibility quality high and preserve business intent.
6) Run lint and build.

Final deliverable:
- updated implementation
- updated remodel-plan.md
- concise summary of pages rebuilt, improvements, assets reused/placeholders, whether Supabase was used, and which inspiration + PrimeBlocks patterns were applied.
