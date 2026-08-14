# Changelog

All notable user-visible changes to this site are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- **LitSieve** on the Projects page: a multi-user web app that pulls abstracts
  from 17 free public academic databases at once, ranks and de-duplicates them
  with semantic embeddings, and exports citations as RIS. Includes its stack,
  its current version, its "starting point, not a finished literature search"
  disclaimer, and a link to the repository.
- **ASD Insight Companion** on the Projects page: a research prototype that
  runs an anonymous, consent-gated study session, with on-device face tracking
  that uploads aggregate numbers only — never video frames or images. Includes
  its stack, its in-development status, its explicit non-diagnostic disclaimer,
  and a link to the repository.
- Governance files adopted so this repository matches the structure used by
  LitSieve and asd-insight-companion: `agents.md` (global coding rules, copied
  verbatim), `spec.md` (what the site is), `roadmap.md` (where it is going),
  `context.md` (where it is now), and this changelog.

### Changed

- Project cards now stack their heading, description, and links in a single
  column. They previously used a multi-column grid, which placed a card's
  description beside its own heading on wide screens.

### Removed

- The two placeholder project entries that described unstarted work with no
  code behind them (Nurse AI, Nutrition Guide). The two projects above take
  their slots.

### Fixed

- Projects page no longer scrolls sideways on a phone: long repository URLs
  wrap instead of pushing the page wider than the screen.
