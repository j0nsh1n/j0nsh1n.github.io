# spec.md — j0nsh1n.github.io (personal portfolio site)

## Problem
A personal portfolio site for Jonathan Shin, published on GitHub Pages at
<https://j0nsh1n.github.io>. It is the single public page to point at for
"what has he built, what has he done, how do I reach him": projects with links
to their source repositories, activities and leadership, academic transcript,
and awards. It is a **static site by design** — no server, no build step, no
database — so it stays cheap to host, fast to load, and impossible to break
with a dependency upgrade.

## Intended Users
- **Readers** — college admissions readers, teachers, mentors, and people who
  followed a link from LinkedIn or GitHub. They arrive on a phone as often as a
  laptop and read, they do not sign in.
- **Owner** — edits HTML directly and pushes to `main`; GitHub Pages publishes.

## Required Behavior
- Every page renders standalone from the filesystem or any static host, with no
  build step and no npm install.
- Five pages share one nav (`index`, `activities`, `projects`, `transcript`,
  `awards`) and one stylesheet/script pair (`pw.css`, `pw.js`).
- **Dark mode**: follows the OS preference on first visit, is togglable from the
  nav, and the explicit choice persists in `localStorage.theme` across pages and
  reloads. The toggle button is injected by `pw.js`, not hardcoded per page.
- **Mobile menu**: the hamburger toggles the nav under 768px, and closes on link
  click and on outside click.
- **Projects page** lists each project with what it does and a link to its
  source repository. Long code samples are shown in a scrollable
  `.code-container`, not dumped into the page flow at full height.
- **Contact form** (home page only) sends through EmailJS and shows an in-page
  success or failure toast. A failed send must tell the reader it failed —
  never silently swallow the error.
- Discord contact opens a popup with a copy-to-clipboard button, not a
  `mailto:`-style navigation.
- Edge cases: `pw.js` runs on pages with no contact form and no profile image
  without throwing (optional chaining / null guards on every element lookup).

## User Experience
- **Static web pages**: hand-written HTML5 + CSS custom properties + vanilla JS.
  **No npm, no framework, no bundler, no template engine.**
- Local preview: open `index.html` directly, or serve the folder:
  `python3 -m http.server 8000` → <http://localhost:8000>.
- Published: push to `main`; GitHub Pages serves the repository root.
- Example journey: land on `/` → read the intro cards → nav to Projects → open
  a project's GitHub link → back to `/` → send a message through the form.

## Architecture
- Language/runtime: **none at runtime**. Static HTML/CSS/JS served as files.
  There is no Python, no Node, no server process, and no `package.json`.
- Frameworks: none. Presentation is CSS custom properties in `pw.css`
  (`:root` light tokens + `.dark-mode` overrides).
- Storage: `localStorage.theme` only. No cookies, no accounts, no database.
- Major components:
  - `index.html` — hero, about cards, fun facts, contact form, social links
  - `projects.html` — project catalog; source links; embedded code sample
  - `activities.html` — leadership, clubs, athletics, community service
  - `transcript.html` — GPA, test scores, coursework table
  - `awards.html` — awards and certificates grid
  - `pw.css` — design tokens, layout, components, responsive rules
  - `pw.js` — dark mode, mobile menu, navbar scroll state, EmailJS submit,
    Discord popup, toast messages
  - `Face.jpg` — profile photo
- External services (all third-party, all client-side):
  - **EmailJS** (`cdn.emailjs.com`) — contact form delivery. Public key, service
    id, and template id are in client source by design; EmailJS treats the
    public key as publishable.
  - **Font Awesome** (`cdnjs.cloudflare.com`) — icons.
  - **Google Fonts** (`fonts.googleapis.com`) — Inter, imported from `pw.css`.

## Security & Privacy
- No secrets in source. There is no server and no private key in this repo. The
  EmailJS **public** key is publishable; the EmailJS **private** key must never
  appear here. Abuse protection is EmailJS's rate limiting, not ours.
- No analytics, no tracking pixels, no third-party scripts beyond the three
  services listed above.
- No visitor data is stored by this site. Messages go straight to EmailJS.
- Nothing on these pages should be information the owner would not hand to a
  stranger: no home address, no phone number, no full birthdate, no ID numbers.
- Dependencies are CDN `<script>` / `<link>` tags, not a lockfile. Dependabot is
  not installed and has nothing to watch — there is no manifest in this repo.

## Validation & Tooling
No linter, type checker, test runner, or CI workflow is configured in this
repository. Per agents.md, these Definition-of-Done items are **report-only**
until tooling is adopted; do not install tooling on your own initiative.

Manual checks before declaring a change done:
- Open every page changed and confirm the nav, the dark-mode toggle, and the
  mobile menu still work.
- Check **both themes** — light and dark — for readable contrast.
- Check **380px** width: no horizontal scroll, no overlapped controls.
- Click every link added or edited, including the external repository links.
- Open the browser console: no errors on any page (especially pages with no
  contact form, which `pw.js` must tolerate).

## Acceptance Criteria
- [ ] Every page loads from a plain static server with no build step.
- [ ] Nav, dark-mode toggle, and mobile menu work on all five pages.
- [ ] Dark-mode choice survives navigation and reload.
- [ ] Contact form reports both success and failure to the reader.
- [ ] No console errors on any page.
- [ ] Each project on `projects.html` links to its source repository.
- [ ] Both themes hold readable contrast; 380px has no horizontal scroll.
- [ ] CHANGELOG.md updated for user-visible changes.
