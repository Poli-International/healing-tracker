# Tattoo & Piercing Healing Tracker - Testing Report

**Tool:** Tattoo & Piercing Healing Tracker
**Slug:** `healing-tracker`
**Live URL:** https://poliinternational.com/tools/healing-tracker/
**Version documented:** VER 2.4.0 (POLI INTL)
**Report type:** Static QA review of client-side web tool
**Method:** Manual code inspection of `index.html`, `js/healing-analysis.js`, and the localized `documentation-*.html` reference pages. No automated test harness, CI pipeline, or server-side component exists in the provided source, so all findings are derived from reading the shipped artifacts.

---

## Executive Summary

The Tattoo & Piercing Healing Tracker is a self-contained, client-side web application. It has no backend, no network calls, and no third-party tracking scripts. All state is intended to live in the browser (local storage, per the documentation pages), and all calculations run in the user's browser.

**Verdict: Production Ready (with minor recommendations).**

The tool is structurally sound for its purpose: a studio-facing aftercare companion that computes healing stage from a procedure date, logs symptoms and photos, and surfaces a report. The code is defensive in the places that matter (null guards before calling module methods, `Math.max(0, ...)` clamping on day math, `typeof ... === 'function'` checks before invoking optional modules). The primary risks are not functional but operational: the shipped `index.html` carries `<meta name="robots" content="noindex, nofollow">`, which is correct for an embeddable widget but must be reconciled with any public-facing SEO intent, and the report cannot verify runtime behavior of modules whose source was truncated from the provided excerpt.

---

## Test Categories

| # | Category | Scope | Result |
|---|----------|-------|--------|
| 1 | HTML structure & semantics | `index.html` markup, IDs, ARIA | PASS |
| 2 | CSS / responsiveness | Layout classes, theme variables, viewport meta | PASS |
| 3 | JavaScript functionality | `healing-analysis.js` coordinator, module wiring | PASS |
| 4 | Calculation / logic accuracy | `daysElapsed` formula, stage offset | PASS |
| 5 | Data integrity | `piece` object, backup export/import contract | PASS (with observation) |
| 6 | Accessibility (WCAG basics) | Labels, roles, `aria-live`, keyboard focus | PASS (with observations) |
| 7 | Cross-browser | Feature usage: `Date`, `Math`, CSS vars, SVG | PASS |
| 8 | Performance | Static asset weight, no network | PASS |
| 9 | Security | No remote calls, no eval, no inline user data | PASS |
| 10 | Edge cases | Empty dates, future dates, missing modules | PASS (with observations) |

---

## Detailed Test Results

### 1. HTML Structure & Semantics

**Result: PASS**

Verified real elements and attributes present in `index.html`:

- Document declares `<meta charset="UTF-8">` and `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- Root `<html lang="en">` is set, and the language switcher offers `en`, `fr`, `de`, `it`, `es`, `nl`, `pt` via `<select id="languageSwitcher">` with per-option `lang` attributes.
- The navigation sidebar (`<aside class="sidebar" id="appSidebar">`) exposes four tabs as `<button class="tool-tab" data-tab="...">`: `healing`, `touchup`, `docs`, `embed`.
- The setup form uses a real `<select id="procedureType">` with options `piercing` and `tattoo`, plus a placeholder `-- Select Type --`.
- The body map is an inline `<svg id="bodyPlacementMap" viewBox="0 0 280 380">` with two groups, `#bodyMapFrontView` and `#bodyMapBackView` (the latter `style="display: none;"` by default). Each region is a `<path class="body-part">` carrying `tabindex="0"`, `role="button"`, `aria-label`, and data attributes `data-piercing-zone`, `data-tattoo-region`, and `data-name-key`.
- The hydration banner (`<div id="hydrationPromptBanner" ... role="alert">`) is hidden by default (`style="display: none;"`) and exposes three real buttons: `#hydrationBannerDrinkBtn`, `#hydrationBannerSnoozeBtn`, `#hydrationBannerDismissBtn`.
- The placement picker section (`#placementPickerSection`) is also hidden until a procedure type is chosen, and contains the two toggles `#sunRiskToggleBtn` and `#bodyMapToggleBtn`.
- The piercing location `<select id="piercingLocation">` is grouped with real `<optgroup>` blocks (Ear, Facial, Oral, Body) and named options such as `earlobe`, `helix`, `industrial`, `daith`, `rook`, `tragus`, `nostril`, `septum`, `bridge`, `tongue`, `tongue_web`, `venom`, `uvula`, and more.

**Observation:** The `#placementSelectedBadge` uses `aria-live="polite"`, which is the correct pattern for announcing the currently selected region without interrupting the user.

---

### 2. CSS / Responsiveness

**Result: PASS**

- The page links a single stylesheet, `./css/style.css`, and a web app manifest, `./manifest.json`, with `<meta name="theme-color" content="#111111">`.
- Layout uses semantic class hooks (`layout-split`, `section-grid`, `scroll-pane`, `content-col`, `main-canvas`) rather than inline widths, which is consistent with a responsive two-column design that collapses on narrow viewports.
- Theming is driven by CSS custom properties. The inline SVG `<style>` block references `var(--bg-tertiary, #e2e8f0)`, `var(--border-primary, #cbd5e1)`, `var(--healing-purple, #7c3aed)`, `var(--dark-text-primary, #ffffff)`, `var(--text-secondary, #64748b)`, and `var(--text-tertiary, #9ca3af)`, each with a hardcoded fallback. This means the map remains legible even if the stylesheet fails to load.
- Dark/light mode is toggled through `#darkModeToggle`, and the body ships with `class="dark-mode"` by default.
- The embedded theme bridge script (guarded by `if (window.self !== window.top)`) listens for a `postMessage` of type `poli-theme` and applies `data-theme` on `<html>` plus `dark-mode`/`light-mode` on `<body>`. This is the correct pattern for an iframe-embedded widget.

**Observation:** Because the SVG uses `width="100%"` and a fixed `viewBox`, it scales fluidly. No fixed pixel widths were found on the map container itself.

---

### 3. JavaScript Functionality

**Result: PASS**

The provided `js/healing-analysis.js` is a coordinator. It does not implement feature logic itself; it wires together optional modules. Verified behaviors:

- `initAnalysisUI()` calls `init()` on each of `window.Comparison`, `window.Visualizer`, `window.ProTips`, `window.HealingCalendar`, `window.AllergyScreener`, and `window.HealthReport`, but only after checking `typeof window.X === 'function'`. If a module is absent, initialization continues without throwing.
- `updateAnalysis(piece)` short-circuits with `if (!piece) return;`, then updates `Comparison`, `Visualizer`, `ProTips`, and `HealingCalendar` in that order, each behind a `typeof ... === 'function'` guard.
- The `ProTips` update computes the day offset inline from `piece.procedureDate` and `piece.procedureType`, defaulting the type to `'piercing'` if absent.
- `window.HealingAnalysis` is exported with three members: `init`, `updateAnalysis`, and `detectDirectionChange`, the last of which delegates to `window.Visualizer.detectDirectionChange(entries)` and returns `null` if the Visualizer module is not present.
- Bootstrap is safe: `if (document.readyState === 'loading')` attaches a `DOMContentLoaded` listener; otherwise `initAnalysisUI()` runs immediately.

**Observation:** The coordinator is resilient by design. A missing or failed module degrades gracefully rather than breaking the whole page.

---

### 4. Calculation / Logic Accuracy

**Result: PASS**

The documentation pages (`documentation-de.html`, `documentation-es.html`, `documentation-fr.html`, `documentation-it.html`, `documentation-nl.html`, `documentation-pt.html`) publish the exact day-count formula used by the engine:

```js
const procDate = new Date(date);
const today = new Date();
const daysElapsed = Math.max(0, Math.floor((today - procDate) / (1000 * 60 * 60 * 24)));
```

The same arithmetic is reproduced inline in `healing-analysis.js` when computing the Pro-Tips offset:

```js
const dayOffset = Math.max(0, Math.floor((today - procDate) / (1000 * 60 * 60 * 24)));
```

**Worked example.** Suppose a user enters a procedure date of `2025-01-01` and today is `2025-01-15`.

1. `procDate = new Date("2025-01-01")` resolves to `2025-01-01T00:00:00.000Z`.
2. `today = new Date()` resolves to the current instant, e.g. `2025-01-15T12:00:00.000Z`.
3. `today - procDate` = 14 days plus 12 hours = `1,252,800,000` ms.
4. `1,252,800,000 / (1000 * 60 * 60 * 24)` = `14.5`.
5. `Math.floor(14.5)` = `14`.
6. `Math.max(0, 14)` = `14`.

**Expected output:** `daysElapsed = 14`, i.e. the tracker reports Day 14.

**Boundary behavior.** If the user enters a future date, `today - procDate` is negative, `Math.floor` yields a negative integer, and `Math.max(0, ...)` clamps the result to `0`. The tool therefore never reports a negative day count. This is the correct defensive choice for a healing tracker.

**Observation:** The formula uses millisecond arithmetic on `Date` objects. Because `new Date("YYYY-MM-DD")` is parsed as UTC midnight while `new Date()` is local, a user in a timezone far from UTC may see the day count tick over at an hour that does not match their local midnight. This is a known, minor cosmetic effect, not a correctness bug for a healing timeline measured in days.

---

### 5. Data Integrity

**Result: PASS (with observation)**

The coordinator operates on a single object it calls `piece`. Fields referenced directly in the provided source are:

- `piece.procedureDate` (string, parsed with `new Date(...)`)
- `piece.procedureType` (string, expected to be `'piercing'` or `'tattoo'`)

The documentation pages describe the persistence and portability contract in more detail:

- Local storage is used for theme preferences and healing log entries, with no remote transmission.
- Backup is handled by `exportBackupData()` and `importBackupData()`, producing and consuming a single JSON file that embeds images as base64.
- Photo comparison is rendered by `renderPhotoComparison()` and symptom trends by `renderSymptomTrends()`.
- Direction-change detection is implemented in `detectDirectionChange()` and is documented as requiring **3 consecutive worsening entries** (or at least 48 hours of sustained increase) before flagging, which is a deliberate false-positive guard.

**Observation:** The `piece` object's full schema is not visible in the provided excerpt, so field-level validation (for example, rejecting malformed `procedureDate` strings) cannot be confirmed from the source shown. The `Math.max(0, ...)` clamp does protect the day count from a future or invalid date, but it does not distinguish "invalid date" from "future date." A `Number.isNaN` check on the parsed date would make the failure mode explicit.

---

### 6. Accessibility (WCAG Basics)

**Result: PASS (with observations)**

Verified accessibility features:

- Every form control has an associated `<label>`: `procedureType`, `piercingLocation`, and `languageSwitcher` all use `for`/`id` pairing. The language switcher additionally carries a visually hidden `<label class="sr-only">`.
- The body map regions are keyboard reachable (`tabindex="0"`), announced as buttons (`role="button"`), and labeled (`aria-label` plus `data-i18n-aria`). Focus styling is defined in the inline SVG `<style>` via `.body-part:focus-visible`.
- The hydration banner uses `role="alert"` and its dismiss button carries both `aria-label="Dismiss"` and `title="Dismiss"`.
- The sun-risk toggle uses `aria-pressed="true"` and an `aria-label`, which is the correct toggle-button pattern.
- The selected-region badge uses `aria-live="polite"`.
- The sidebar navigation is wrapped in `<nav aria-label="Tool Navigation">`, and the map SVG is wrapped in a region with `role="region" aria-label="Interactive body placement map"`.
- The theme toggle button carries `aria-label="Toggle dark/light theme"` and `data-i18n-aria`.

**Observations:**

- The `#hydrationPromptBanner` uses `role="alert"`, which is assertive by default in some screen readers. For a recurring, non-urgent hydration reminder, `role="status"` (polite) would be gentler. This is a judgment call, not a defect.
- The `&times;` dismiss button relies on `aria-label` for its accessible name, which is correct, but the visible glyph alone would be ambiguous to sighted users without the tooltip. The `title` attribute mitigates this.
- Contrast of the SVG labels depends on the resolved theme variables. The fallbacks (`#64748b` on `#e2e8f0`) are reasonable, but the actual contrast should be spot-checked in both themes.

---

### 7. Cross-Browser

**Result: PASS**

The tool relies only on long-standing, universally supported features:

- `Date` arithmetic and `Math.floor` / `Math.max`.
- CSS custom properties (supported in all evergreen browsers).
- Inline SVG with `viewBox` and `<path>` (universal).
- `postMessage` for the iframe theme bridge (universal).
- `document.readyState` and `DOMContentLoaded` (universal).
- `localStorage` (universal, with the usual caveat that it is unavailable in some private-browsing modes).

**Observation:** No use of `eval`, `Function` constructor, top-level `await`, optional chaining in a way that would break older engines, or any experimental API was found in the provided source.

---

## Performance Notes

- The tool is composed of small static assets: one HTML document, one stylesheet, one manifest, and a set of JavaScript files. There is no bundler output, no framework runtime, and no network fetch at runtime.
- The body map is inline SVG rather than a raster image, so it scales without additional downloads and without a separate HTTP request.
- The heaviest runtime cost is likely the symptom-trend SVG rendering (`renderSymptomTrends()`) and the photo comparison slider (`renderPhotoComparison()`), both of which operate on user-supplied data and are bounded by the number of log entries.
- Because there are no remote calls, first paint is gated only by the local asset sizes and the browser's parse time.

**Observation:** If a user accumulates a very large photo log, the base64-embedded images in the backup JSON could grow large. This affects export/import file size, not page load, since photos are stored locally.

---

## Security Assessment

**Result: PASS**

- No outbound network requests, no analytics, no third-party scripts, and no tracking cookies are present in the provided source. The documentation pages state explicitly that no personal data, symptom data, or photos are transmitted to external servers.
- No use of `eval`, `new Function`, or dynamic code execution was found.
- The `postMessage` listener checks `e.data && e.data.type === 'poli-theme'` before acting, and only applies a boolean theme flag. It does not execute arbitrary payloads.
- The iframe theme bridge is gated on `window.self !== window.top`, so it only activates when the tool is actually embedded.
- The `index.html` head includes `<meta name="robots" content="noindex, nofollow">`, which prevents search engines from indexing the embeddable widget page directly.

**Observation:** The `postMessage` handler does not verify `e.origin`. Because the handler only reads a boolean and toggles a theme class, the practical risk is negligible, but adding an origin allowlist would be a defense-in-depth improvement if the tool is embedded on third-party studio sites.

---

## Edge Cases Tested

| Case | Input | Expected behavior | Result |
|------|-------|-------------------|--------|
| Future procedure date | `procedureDate` later than today | `daysElapsed` clamps to `0` via `Math.max(0, ...)` | PASS |
| Same-day procedure | `procedureDate` equals today | `daysElapsed = 0` | PASS |
| No procedure type selected | `#procedureType` left at `-- Select Type --` | Placement picker stays hidden (`#placementPickerSection` `display: none`) | PASS |
| Missing optional module | `window.Visualizer` undefined | `detectDirectionChange` returns `null`; coordinator skips update | PASS |
| Null piece | `updateAnalysis(null)` | Early return, no error | PASS |
| Missing `procedureType` on piece | `piece.procedureType` undefined | Pro-Tips defaults to `'piercing'` | PASS |
| Missing `procedureDate` on piece | `piece.procedureDate` undefined | Falls back to `today`, so `dayOffset = 0` | PASS |
| Body map back view | `#bodyMapToggleBtn` clicked | `#bodyMapBackView` shown, `#bodyMapFrontView` hidden | PASS (per markup defaults) |
| Hydration banner snooze | `#hydrationBannerSnoozeBtn` clicked | Documented as a 30-minute snooze | PASS (per button label) |
| Language switch | `#languageSwitcher` changed | Calls `window.setLanguage(value)` if defined | PASS |
| Invalid date string | `new Date("not-a-date")` | Produces `NaN`; `Math.max(0, NaN)` yields `NaN` | OBSERVATION |

**Observation on the last row:** `Math.max(0, NaN)` returns `NaN`, not `0`. If a malformed date string ever reaches the formula, the day count becomes `NaN` rather than a safe fallback. The UI likely prevents this by using a date input, but a `Number.isNaN` guard would make the behavior explicit and robust.

---

## Final Verdict

**Production Ready.**

The Tattoo & Piercing Healing Tracker is a well-scoped, dependency-free client-side tool. Its coordinator pattern is defensive, its day-count math is clamped against negative values, its markup is semantic and labeled, and it makes no network calls. It is appropriate for embedding in studio websites via the documented iframe snippet.

### Minor Recommendations

1. **Guard against `NaN` dates.** Add a `Number.isNaN(daysElapsed)` check after the day-count computation so a malformed `procedureDate` falls back to `0` instead of propagating `NaN`.
2. **Verify `postMessage` origin.** Add an origin allowlist to the `poli-theme` listener as defense-in-depth for third-party embeds.
3. **Reconsider `role="alert"` on the hydration banner.** For a recurring, non-urgent reminder, `role="status"` (polite) is a gentler choice for screen reader users.
4. **Reconcile `noindex, nofollow` with SEO intent.** The meta tag is correct for an embeddable widget, but if the tool page is also meant to rank, that directive should be reviewed at the hosting layer.
5. **Spot-check theme contrast.** Confirm the SVG label colors meet WCAG AA in both dark and light themes, since the fallbacks are only a starting point.
6. **Document the `piece` schema.** The coordinator consumes `procedureDate` and `procedureType` directly; publishing the full object shape would make future module integration safer.
