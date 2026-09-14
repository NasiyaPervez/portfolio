# ADR-0001: Project writeups hosted on-site as content collections

- **Status:** Accepted
- **Date:** 2026-09-14

## Context

The portfolio needed a Projects section hosting career-focused writeups of completed MSc projects, with decorative images and on-site reading. The existing Blog pulls posts from an external Substack RSS feed and links readers out to Substack. Two viable paths existed: reuse the Substack/RSS mechanism for projects, or host the writeups directly in the repo.

## Decision

Project writeups are hosted **on-site** in an Astro content collection (`src/content/projects/`), rendered as static pages at `/projects/[slug]`, indexed by a card grid at `/projects`. GitHub links are optional per writeup. Blog remains external (Substack).

## Reason

- Writeups are the career showcase; keeping readers on the domain serves that goal.
- The user explicitly chose not to publish project content on Substack.
- On-site markdown has full control over layout, images, and the five-section writeup template; Substack constrains styling and routes readers off-site.
- GitHub is deliberately separate: a writeup may ship before its repo is public, so the "code here" button is optional per post.

## Alternatives considered

- **Substack + RSS (like Blog):** rejected — pushes readers off-site and constrains layout; conflicts with the career-showcase purpose.
- **Single scrolling page with no per-project pages:** rejected — the card-grid + detail-page structure gives each project room for a full narrative and clean URLs.