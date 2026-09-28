# Changelog

All notable user-visible changes to this site are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- LitSieve card links to the live site at www.litpilot.org.

### Changed

- Project status lines no longer show version numbers, which went out of date
  within days of each release. Each project's repository shows its current
  version.

## 2026-09-27

### Added

- FlexWeek, Clinical Evidence Assistant, Daily Scheduler, and Sales Tracker on
  the Projects page, each with its status, stack, and a source link.
- A short introduction on the home page.
- Page descriptions and link-preview tags on every page, and the current page
  is marked in the nav for screen readers.
- Visible labels on the contact form fields.

### Changed

- LitSieve card updated to version 5.5.0 and its Explain this study feature;
  ASD Insight Companion card updated to its current status.
- Project cards show status on its own line instead of in the heading, and
  project copy no longer uses em dashes.
- Profile photo resized to 400x400 with metadata removed; the home page loads
  about 6.6 MB less.
- Awards page shows an honest "in progress" state instead of a blank card.
- Higher-contrast secondary text, buttons, hover states, and messages in both
  themes.

### Fixed

- Home page mobile menu now opens on the first tap (a duplicate handler was
  toggling it closed again).
- Projects page no longer scrolls sideways on a 380px phone.
- Contact form now says clearly when a message was not sent, including when the
  email service is blocked, and failures are styled as errors.
- No favicon 404 in the browser console.

### Removed

- Hospital Supply Tracker code sample, which showed a hardcoded demo login and
  a local file path. The project is now listed under Earlier work.

## 2026-08-14

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
