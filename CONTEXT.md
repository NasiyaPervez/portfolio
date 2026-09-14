# CONTEXT — Portfolio Glossary & Positioning

Canonical language for the Nasiya Pervez portfolio. Keep these terms consistent across the site, blog, and job materials.

## Positioning

- **Supply chain target role** — the site positions toward logistics / planning / forecasting analyst roles. This is the through-line of Home, About, and Experience.
- **The bridge line** — "Maps to supply chain because …" a pattern used on the Experience page to connect non-supply-chain roles (recruitment, sales) to supply chain reasoning (pipelines, lead time, capacity, demand forecasting).
- **Home proving ground** — the home-page feature strip shows up to 3 Projects (auto-filled from the collection, graceful at 2); Blog moves to secondary reachable-from-nav. Projects prove more than articles for a career goal.
- **GitHub is separate** — a writeup's "code here" button renders only when the repo link exists in that writeup's frontmatter; a project page can ship without its GitHub repo being public yet.

## Canonical Terms

| Term | Meaning | Notes |
|---|---|---|
| **Logistics Analytics** | Using data to improve movement, routing, and flow of goods | Primary hero role word |
| **Demand Planning** | Forecasting future demand to align supply | Hero role word |
| **Supply Chain Optimization** | Applying OR/optimization methods to supply chain decisions | Hero role word |
| **Operations Research** | The discipline (optimization, simulation, decision support) behind the Masters program | Used as the discipline label |
| **Decision Support** | Turning data + models into decisions | Masters coursework root |
| **Reframing (bullets)** | Presenting past roles through analytical, outcome-oriented language instead of job-title-first | Used on Experience page |
| **Projects** | The site's project-writeup section, distinct from Blog (external Substack articles) | Hosted on-site as markdown content collections under `src/projects/`; not linked out |
| **Project writeup** | A career-focused on-site article about one completed project | Structure: Context → Approach → Results → Reflection → Bridge. Fenced code blocks + images render inline |
| **Cover treatment** | CSS-only gradient + title used for a writeup's card/hero in place of stock art | Photos from the internet are user-supplied per writeup when wanted |

## Avoid

- **Network engineer** — never use; not the target.
- Job-title-first summaries on Experience — entries lead with scope/value, not titles.
- GAOTek — dropped entirely from the site.
- Project content on Substack — project writeups live on-site only; avoid routing readers out.
- MSc framing in Projects — the Projects section and its writeups never reference the Masters program; they are presented as professional work.

## Writing style

- **No em dashes** — use commas instead, for a more humanized, conversational read. Applies to all project writeups and blog copy (numeric ranges keep en dashes, e.g. 50–100).
- First person (I), active voice, readable sentences.

## Language

- English C1 (professional) — default site language.
- German A1.1 (in progress) — shown on About, framed as learning.
- Do not list Arabic, French, or Urdu.

## Design

- Palette: dark bg `#0b0e0d`, accents emerald `#10b981` + blue `#3b82f6` on white/grey/black.
- Fonts: Space Grotesk (headings) + Inter (body).
- Motion: fade-in-up `.reveal` on scroll; hover transitions; no heavy animation.