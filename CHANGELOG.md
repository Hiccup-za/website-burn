# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] — 2026-06-26

### Fixed
- The site favicon now ships as a real image file served at a stable URL, so Google and other crawlers can index it. It was previously defined only as an inline data URI, which search engines ignore — leaving no icon next to the search result.

## [1.1.0] — 2026-06-21

### Added
- "Plans" section on the landing page presenting the free plan (paid Pro and Lifetime tiers are built but hidden until launch).
- Final call-to-action section above the footer inviting visitors to join the waitlist.
- Signup-source tracking: the waitlist now records which button a visitor signed up from, stored in a new `signup_source` column on the user table.

## [1.0.4] — 2026-06-01

### Added
- "Notifications" feature section on the landing page, showing native macOS notification examples (session and weekly usage alerts) alongside explanatory copy.

### Changed
- Waitlist count on the hero is now hidden until the real number loads, instead of briefly showing an em-dash placeholder.

## [1.0.3] — 2026-05-31

### Added
- Open Graph image (`opengraph-image.tsx`) rendered dynamically at the edge, displaying the flame logo, "Burn" title, and tagline on the brand dark background.
- `openGraph` and `twitter` metadata blocks in the root layout, enabling rich link previews when sharing the URL.

## [1.0.2] — 2026-05-31

### Added
- Databuddy analytics widget embedded in the root layout via a client-side wrapper component.

## [1.0.1] — 2026-05-31

### Added
- Integration test suite for the waitlist signup flow (`apps/web/__tests__/`).
- `bun test` script in `apps/web/package.json`.
- GitHub Actions release workflow that creates a GitHub release from the CHANGELOG on every push to main.

### Changed
- Waitlist modal copy rewritten with a personal introduction: heading is now "Join the waitlist", subheading "Hello and thank you for your interest!", and body introduces Chris (linked to X) followed by the backstory and CTA across separate paragraphs.
- `README.md` updated with a horizontal rule separator and a `bun run test` entry in the commands table.

## [1.0.0] — 2026-05-31

### Added
- X (Twitter) logo in the nav linking to [@BurnUsage](https://x.com/BurnUsage).
- "Built by Chris" attribution in the footer, linked to [@chriszeuch](https://x.com/chriszeuch) in the brand orange colour.
- `CLAUDE.md` with project-specific guidance for Claude Code.

### Changed
- Footer layout updated to flex with the attribution centred and the copyright left-aligned.
- `README.md` expanded with stack overview, app table, and common commands.
