# Tattoo & Piercing Healing Tracker - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Schemas](#data-schemas)
3. [Calculation / Logic Algorithms](#calculation--logic-algorithms)
4. [API Reference](#api-reference)
5. [Integration Guide](#integration-guide)
6. [Customization](#customization)
7. [Performance](#performance)
8. [Browser Compatibility](#browser-compatibility)
9. [Security](#security)
10. [Version History](#version-history)
11. [Support / Contact](#support--contact)

---

## Architecture Overview

### Technology Stack

The Tattoo & Piercing Healing Tracker is a self-contained, client-side web application. It runs entirely in the browser with no external network dependencies, no server requirements, and no tracking scripts.

- **HTML5**: Semantic markup with accessible form controls and a tabbed layout.
- **CSS3**: Variable-driven design system with dark/light theme switching.
- **JavaScript**: Modular scripts for deterministic healing-stage calculation, symptom triage, and aftercare routines.
- **Local Storage**: Browser-local persistence for theme preferences and healing entries, with no remote transmission.

### File Structure

The tool is organized as a static asset bundle. The following files are present in the source:

| File | Purpose |
| --- | --- |
| `index.html` | Main application shell, sidebar navigation, healing tracker tab, placement picker SVG body map, and hydration prompt banner. |
| `css/style.css` | Design system, layout, and theme variables. |
| `manifest.json` | Web app manifest. |
| `js/healing-analysis.js` | Analysis coordinator that wires together the Comparison, Visualizer, ProTips, HealingCalendar, AllergyScreener, and HealthReport modules. |
| `js/i18n.js` | Internationalization runtime. |
| `js/locales/en.js`, `fr.js`, `fr-timeline.js`, `it.js`, `it-timeline.js`, `de.js`, `de-timeline.js`, `es.js`, `es-timeline.js`, `nl.js`, `nl-timeline.js`, `pt.js`, `pt-timeline.js` | Locale string bundles for English, French, Italian, German, Spanish, Dutch, and Portuguese. |
| `documentation.html` | English technical documentation page. |
| `documentation-fr.html` | French technical documentation page. |
| `documentation-de.html` | German technical documentation page. |
| `documentation-it.html` | Italian technical documentation page. |
| `documentation-es.html` | Spanish technical documentation page. |
| `documentation-nl.html` | Dutch technical documentation page. |
| `documentation-pt.html` | Portuguese technical documentation page. |

### Component Breakdown

The application shell (`index.html`) exposes four sidebar tabs:

- **Healing Tracker** (`data-tab="healing"`): the primary workflow, containing the setup form, the interactive body placement map, and the analysis modules.
- **Touch-Up Timeline** (`data-tab="touchup"`): a separate timeline view.
- **Documentation** (`data-tab="docs"`): in-app documentation.
- **Embed Code** (`data-tab="embed"`): embed snippet for studio websites.

The Healing Tracker tab is composed of the following sections:

1. **Hydration Prompt Banner** (`#hydrationPromptBanner`): a recurring check-in with three actions, "Log +1 Glass" (`#hydrationBannerDrinkBtn`), "Snooze (30m)" (`#hydrationBannerSnoozeBtn`), and a dismiss button (`#hydrationBannerDismissBtn`).
2. **Setup Your Healing Journey** (Step 01): procedure type selector (`#procedureType`) with options `piercing` and `tattoo`.
3. **Visual Placement Picker** (`#placementPickerSection`): an inline SVG body map (`#bodyPlacementMap`) with front and back views, a sun exposure risk toggle (`#sunRiskToggleBtn`), and a front/back view toggle (`#bodyMapToggleBtn`).
4. **Piercing Location Selector** (`#piercingLocation`): grouped `<optgroup>` options for Ear, Facial, Oral, and Body piercings.

The analysis coordinator (`js/healing-analysis.js`) initializes and updates six sub-modules:

- `window.Comparison` (photo slider and symptom severity bar chart)
- `window.Visualizer` (symptom trends SVG chart, sentences, and telemetry)
- `window.ProTips` (stage-aware studio tips)
- `window.HealingCalendar`
- `window.AllergyScreener`
- `window.HealthReport`

### Theme and Embed Behavior

When the tool is loaded inside an iframe (`window.self !== window.top`), the shell applies a theme bridge. It listens for `postMessage` events of type `poli-theme` and toggles `data-theme` on the root element plus `dark-mode` / `light-mode` classes on the body. The default state is dark mode (`<body class="dark-mode">`).

---

## Data Schemas

### Healing Entry Object

The analysis coordinator operates on a `piece` object passed into `updateAnalysis(piece)`. The following fields are read directly by the coordinator:

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `procedureDate` | string (date) | ISO-style date string of the procedure. Parsed via `new Date(piece.procedureDate)`. | `"2025-03-14"` |
| `procedureType` | string | Either `"piercing"` or `"tattoo"`. Passed to `ProTips.update`. | `"piercing"` |

Additional fields are consumed by the sub-modules (Comparison, Visualizer, HealingCalendar, AllergyScreener, HealthReport) when `updateAnalysis(piece)` fans out to them.

### Placement Map Region Attributes

Each clickable region in the SVG body map carries the following data attributes:

| Attribute | Purpose | Example values |
| --- | --- | --- |
| `data-piercing-zone` | Piercing zone classification | `facial`, `oral`, `ear`, `surface`, `body` |
| `data-tattoo-region` | Tattoo region classification | `head_face`, `neck`, `chest`, `ribs_stomach`, `upper_arm`, `forearm`, `hand_wrist`, `thigh`, `knee_shin`, `foot_ankle`, `upper_back`, `lower_back`, `tricep`, `calf`, `neck_nape` |
| `data-name-key` | i18n key for the region label | `healing.map.regions.headFace` |

### Piercing Location Values

The `#piercingLocation` select is grouped into four `<optgroup>` categories. Option values include:

- **Ear**: `earlobe`, `helix`, `industrial`, `daith`, `rook`, `tragus`, `anti_tragus`, `conch`, `snug`, `forward_helix`, `orbital`
- **Facial**: `nostril`, `septum`, `bridge`, `high_nostril`, `eyebrow`, `anti_eyebrow`, `cheek`, `medusa`, `monroe`, `labret`, `vertical_labret`, `snake_bites`, `angel_bites`, `smiley`, `frowny`
- **Oral**: `tongue`, `tongue_web`, `venom`, `uvula`
- **Body**: additional values (list truncated in the provided source)

### Local Storage

Theme preferences and healing entries are persisted in browser local storage. No personal data, symptom data, or photos are transmitted to external servers or stored in tracking cookies.

---

## Calculation / Logic Algorithms

### Days Elapsed Calculation

The core timeline calculation uses standardized UTC date differences:

```js
const procDate = new Date(date);
const today = new Date();
const daysElapsed = Math.max(0, Math.floor((today - procDate) / (1000 * 60 * 60 * 24)));
```

The result is clamped to a minimum of `0` so future-dated procedures do not produce negative day counts. The same formula appears in `updateAnalysis(piece)` to compute `dayOffset` for the ProTips module:

```js
const today = new Date();
const procDate = piece.procedureDate ? new Date(piece.procedureDate) : today;
const dayOffset = Math.max(0, Math.floor((today - procDate) / (1000 * 60 * 60 * 24)));
window.ProTips.update(piece.procedureType || 'piercing', dayOffset);
```

If `procedureDate` is missing, `procDate` falls back to `today`, yielding `dayOffset = 0`. If `procedureType` is missing, it defaults to `'piercing'`.

### Clinical Symptom Triage

Recorded symptoms are classified into three severity levels:

- **Concerning**: triggered by continuous bleeding, spreading red streaks, or foul-smelling discharge. Requires immediate medical or professional evaluation.
- **Monitor closely**: triggered by moderate swelling, persistent redness, or localized heat. Requires active observation within 24 to 48 hours.
- **Normal**: expected physiological healing responses, including clear or whitish lymphatic secretion (crusting), mild tenderness, and dryness.

### Healing Log and Trend Analysis

- **Photo comparison**: side-by-side comparison between Day 0 and any later entry via an interactive slider (`renderPhotoComparison()`).
- **Symptom curves**: visualization of redness, swelling, pain, and secretion trends in pure SVG (`renderSymptomTrends()`).
- **Direction change detection**: identifies sustained worsening across **3 consecutive entries** (or >= 48 hours of continuous increase) to avoid false alarms from temporary irritation (`detectDirectionChange()`).
- **Trigger evaluation**: on worsening, systematically asks about physical factors (snagged, slept on it, new jewelry, product change, swimming, gym) (`evaluateWhatChangedTrigger()`).
- **Backup and restore**: standalone JSON export and import with Base64 image data for device migration (`exportBackupData()` and `importBackupData()`).

### Analysis Fan-Out

`updateAnalysis(piece)` orchestrates the sub-modules in a fixed order:

1. `window.Comparison.update(piece)` if available.
2. `window.Visualizer.update(piece)` if available.
3. `window.ProTips.update(procedureType, dayOffset)` if available.
4. `window.HealingCalendar.render()` if available.

Each call is guarded by a `typeof ... === 'function'` check, so missing modules are silently skipped.

---

## API Reference

### `window.HealingAnalysis`

The public namespace exposed by `js/healing-analysis.js`.

#### `HealingAnalysis.init()`

Initializes all analysis sub-modules. Calls `init()` on `Comparison`, `Visualizer`, `ProTips`, `HealingCalendar`, `AllergyScreener`, and `HealthReport` when each is present. Runs automatically on `DOMContentLoaded` (or immediately if the document is already past the loading state).

- **Parameters**: none
- **Returns**: `undefined`

#### `HealingAnalysis.updateAnalysis(piece)`

Updates all analysis sub-modules for the given healing entry.

- **Parameters**:
  - `piece` (object, required): the healing entry. Reads `piece.procedureDate` and `piece.procedureType`. Returns early if `piece` is falsy.
- **Returns**: `undefined`
- **Behavior**: fans out to `Comparison.update`, `Visualizer.update`, `ProTips.update`, and `HealingCalendar.render`, each guarded by a presence check.

#### `HealingAnalysis.detectDirectionChange(entries)`

Delegates to `Visualizer.detectDirectionChange(entries)` when the Visualizer module is present.

- **Parameters**:
  - `entries` (array): the healing entries to analyze.
- **Returns**: the Visualizer's result, or `null` if the Visualizer is unavailable.

### Sub-Module Contracts

The coordinator expects the following methods on the global modules (each is optional):

| Module | Init | Update / Render |
| --- | --- | --- |
| `window.Comparison` | `Comparison.init()` | `Comparison.update(piece)` |
| `window.Visualizer` | `Visualizer.init()` | `Visualizer.update(piece)`, `Visualizer.detectDirectionChange(entries)` |
| `window.ProTips` | `ProTips.init()` | `ProTips.update(procedureType, dayOffset)` |
| `window.HealingCalendar` | `HealingCalendar.init()` | `HealingCalendar.render()` |
| `window.AllergyScreener` | `AllergyScreener.init()` | (not called by the coordinator) |
| `window.HealthReport` | `HealthReport.init()` | (not called by the coordinator) |

### Hydration Banner Handlers

The hydration prompt banner is wired to three buttons in `index.html`:

| Element ID | Action |
| --- | --- |
| `#hydrationBannerDrinkBtn` | Logs one glass of water. |
| `#hydrationBannerSnoozeBtn` | Snoozes the prompt for 30 minutes. |
| `#hydrationBannerDismissBtn` | Dismisses the banner. |

### Body Map Toggles

| Element ID | Action |
| --- | --- |
| `#sunRiskToggleBtn` | Toggles the sun exposure risk layer. Starts with `aria-pressed="true"`. |
| `#bodyMapToggleBtn` | Switches between front and back body views. |

---

## Integration Guide

### Standalone Embedding

The tool is a dependency-free static HTML/CSS/JS bundle. It can be embedded in any studio website via a standard iframe:

```html
<iframe src="/tools/healing-tracker/index.html" width="100%" height="800" frameborder="0" style="border-radius: 8px;" title="Poli International Healing Tracker"></iframe>
```

### Live URL

The hosted version is available at:

```
https://poliinternational.com/tools/healing-tracker/
```

### Theme Bridge

When embedded in an iframe, the tool listens for `postMessage` events of the form:

```js
{ type: 'poli-theme', light: true | false }
```

On receipt, it applies `data-theme="light"` or `data-theme="dark"` to the root element and toggles `light-mode` / `dark-mode` classes on the body. This lets a parent page synchronize the tool's theme with its own.

### Language Selection

The sidebar exposes a language switcher (`#languageSwitcher`) with seven options: English (`en`), French (`fr`), German (`de`), Italian (`it`), Spanish (`es`), Dutch (`nl`), and Portuguese (`pt`). Selecting a value calls `window.setLanguage(value)` when available.

---

## Customization

### Theme Variables

Colors are driven by CSS custom properties, including `--healing-purple` (default `#7c3aed`), `--calm-blue`, `--bg-tertiary`, `--border-primary`, `--text-primary`, `--text-secondary`, `--text-tertiary`, `--bg-card`, `--dark-text-primary`, and `--border-radius`. Overriding these variables restyles the tool without touching markup.

### Localization

All user-facing strings are keyed with `data-i18n`, `data-i18n-aria`, `data-i18n-title`, and `data-i18n-label` attributes and resolved from the locale bundles in `js/locales/`. Adding a new language requires a new locale file and a corresponding `<option>` in `#languageSwitcher`.

### Body Map Regions

The SVG body map is defined inline in `index.html`. Each region is a `<path class="body-part">` with `data-piercing-zone`, `data-tattoo-region`, and `data-name-key` attributes. Regions can be added or reclassified by editing these attributes directly.

---

## Performance

- **No network calls**: all logic runs client-side; there are no API requests, fonts, or CDN dependencies in the tool itself.
- **Pure SVG rendering**: symptom trends and the body map are rendered as inline SVG, avoiding canvas or image assets.
- **Guarded module calls**: every sub-module call in `updateAnalysis` is wrapped in a `typeof` check, so absent modules add no runtime cost beyond the check.
- **Local storage only**: persistence is limited to the browser, avoiding round trips.

---

## Browser Compatibility

The tool relies on the following platform features:

- `localStorage` for persistence.
- `postMessage` for the iframe theme bridge.
- Inline SVG with CSS custom properties for the body map and charts.
- `Date` arithmetic for day-offset calculation.
- ES5-compatible syntax in `healing-analysis.js` (IIFE, `var`-free but no transpilation required for the coordinator itself).

Any modern evergreen browser (Chrome, Firefox, Safari, Edge) supports these features.

---

## Security

- **No remote transmission**: all calculations and logs run exclusively in the user's local browser. No dates, symptoms, or photos are sent to external servers or shared with third parties.
- **No tracking cookies**: the tool does not set tracking cookies.
- **Iframe theme messages**: the `postMessage` listener only acts on messages whose `data.type === 'poli-theme'` and reads a boolean `data.light`; it does not evaluate message content as code.
- **Input handling**: user inputs are read into the `piece` object and passed to sub-modules; the coordinator itself performs no DOM string injection. Any rendering of user-supplied values is the responsibility of the sub-modules (Comparison, Visualizer, ProTips, HealingCalendar, AllergyScreener, HealthReport).

---

## Version History

### 1.0.0

- Initial release of the Tattoo & Piercing Healing Tracker.
- Healing timeline with day-offset calculation.
- Interactive SVG body placement map with front/back views and sun exposure risk layer.
- Piercing location selector grouped by Ear, Facial, Oral, and Body categories.
- Clinical symptom triage across three severity levels.
- Photo comparison, symptom trend charts, direction change detection, and trigger evaluation.
- JSON backup and restore with Base64 image data.
- Hydration check-in banner with log, snooze, and dismiss actions.
- Theme bridge for iframe embedding and seven-language switcher.

The application shell reports `VER 2.4.0` in the sidebar footer.

---

## Support / Contact

For technical support, integration questions, or bug reports:

**Email**: support@poliinternational.com

**Live tool**: https://poliinternational.com/tools/healing-tracker/
