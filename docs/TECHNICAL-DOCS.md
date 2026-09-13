# Tattoo & Piercing Healing Tracker, Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File Structure & Modules](#file-structure--modules)
3. [Data Schemas](#data-schemas)
4. [Calculation & Logic](#calculation--logic)
5. [Internationalization Engine](#internationalization-engine)
6. [Styling](#styling)
7. [Data Privacy](#data-privacy)
8. [Browser Support & Security](#browser-support--security)
9. [Embedding](#embedding)

---

## Architecture Overview

A client-side web application with no build step, no server and no external runtime dependencies. Open `index.html` from any static host.

### Technology Stack

- **HTML5:** one page with four tabs (Healing Tracker, Touch-Up Timeline, Documentation, Embed).
- **CSS3:** a single stylesheet driven by custom properties, dark and light themes, responsive breakpoints.
- **Vanilla JavaScript:** plain browser scripts loaded in order from `index.html`. No CDNs, fonts or tracking.
- **Client storage:** `localStorage` only.

---

## File Structure & Modules

```
/
├── index.html                 # The tool
├── embed.html                 # Embed code page
├── documentation*.html        # Technical documentation, one page per language (en, de, es, fr, it, nl, pt)
├── manifest.json
├── css/style.css              # All styles, dark and light themes, responsive rules
├── images/
└── js/
    ├── i18n.js                     # window.t(), data-i18n binding, language switch, localISODate()
    ├── locales/<lang>.js           # UI dictionaries
    ├── locales/<lang>-timeline.js  # piercingTimeline translations, loaded after <lang>.js; REPLACES its piercingTimeline
    ├── piercing-timelines.js       # 54 piercing placements: healing time, stages, symptoms, care
    ├── tattoo-timelines.js         # tattoo sizes: stages, symptoms, care
    ├── tracker.js                  # setup, timeline with current-stage marker, symptom triage, checklist
    ├── body-map.js                 # interactive SVG placement picker, sun exposure advisory
    ├── healing-log.js              # pieces, daily entries, photos, storage meter, backup/restore, escalation alert
    ├── comparison.js               # milestone gallery, lightbox, split slider, severity comparison chart
    ├── visualizer.js               # symptom trend chart, trend reversal alert, side-panel telemetry
    ├── healing-analysis.js         # coordinates comparison, visualizer, pro-tips and calendar updates
    ├── healing-calendar.js         # month calendar of entries
    ├── tension-gauge.js            # jewelry tightness streaks (piercings)
    ├── jewelry-longevity.js        # downsizing window, material lifespan, closure checks (piercings)
    ├── pro-tips.js                 # stage-specific studio tips
    ├── hydration-tracker.js        # water intake check-in and reminder
    ├── allergy-screener.js         # six-question sensitivity screener
    ├── ingredient-scanner.js       # ingredient list matching against known irritants
    ├── health-report.js            # report view, print, copy, text download
    ├── journey-snapshot.js         # canvas infographic, PNG download and copy
    ├── calculators.js              # touch-up interval and cost models, formatYears()
    ├── longevity-database.js       # pigment and placement longevity data
    ├── timeline.js                 # Touch-Up Timeline tab and reminders
    ├── common.js, share.js         # embed modal, share helpers
    └── pwa.js                      # install prompt; unregisters only this tool's own old service worker
```

---

## Data Schemas

### 1. Piercing timelines (`js/piercing-timelines.js`)

Each placement key maps to a definition. Text fields are getters that return the current language through `window.t`, falling back to the English literal:

```javascript
earlobe: {
  name: "Earlobe", category: "Ear", healing: "6-8 weeks", difficulty: "Easy",
  stages: [
    { stage: "Week 1-2: Initial Healing",
      symptoms: ["Mild redness", "Slight swelling", "Clear discharge (crusties)", "Tenderness"],
      care: ["Spray saline 2-3x daily", "Don't touch except when cleaning", "Sleep on clean pillowcase"] },
    ...
  ]
}
```

Stage names start with a range such as `Week 3-6` or `Month 2-4`. `tracker.js` reads that range from the English dictionary to mark the stage the procedure date falls in, so the marker is the same in every language.

### 2. Tracked pieces and log entries

`localStorage["poli_healing_pieces_v1"]` holds an array of pieces; `poli_healing_active_piece_id` holds the active one.

```javascript
{
  id: "piece_1757740000000",
  type: "piercing",                  // or "tattoo"
  name: "Left helix",
  procedureDate: "2026-08-24",
  location: "helix",                 // piercings
  size: null,                        // tattoos: "small" | "medium" | "large"
  baselinePhoto: "data:image/jpeg;base64,...",   // or null
  entries: [{
    id: "entry_1757740000000",
    date: "2026-09-12",              // local calendar date, not UTC
    dayOffset: 19,
    redness: 0, swelling: 0, tenderness: 0, discharge: 0,   // each 0-3
    tension: 0,                      // 0-3, piercings
    overallScore: 0,                 // 0-12
    photo: "data:image/jpeg;base64,...",                   // or null
    notes: "",
    likelyCauses: ["slept_on_it"],
    createdAt: "2026-09-12T08:00:00.000Z"
  }],
  createdAt: "..."
}
```

Other keys: `poli_touchup_reminder` (saved touch-up reminder), `poli_healing_hydration_v1` (hydration), `preferred_language`.

---

## Calculation & Logic

### 1. Elapsed days

```javascript
const daysElapsed = Math.max(0, Math.floor((new Date() - new Date(procedureDate)) / 86400000));
```

### 2. Symptom triage

The 15 symptoms are grouped into normal healing, monitor closely and concerning. Any concerning symptom (for example spreading red streaks, fever over 38.3°C / 101°F, green or foul discharge, persistent bleeding) returns the concerning result.

### 3. Trend alerts

- **Escalation** (`healing-log.js`): redness or swelling higher in each of three consecutive entries.
- **Reversal** (`visualizer.js`): an improving series followed by a sustained rise over several entries.

### 4. Touch-up and longevity

`calculators.js` combines placement, style, ink colours, sun exposure and aftercare level with the data in `longevity-database.js` to estimate the years until a touch-up, the share of longevity used, the likely fading order of colours, and 30-year session and cost totals for good versus poor care. The results are estimates from typical fading patterns, not measurements.

---

## Internationalization Engine

- `window.t("key.path", { param: "value" })` returns the current language, then English, then **the key itself**. Any wrapper that supplies its own fallback must treat a returned key as a miss.
- Elements with `data-i18n`, `data-i18n-placeholder`, `data-i18n-aria` or `data-i18n-title` update on language change; scripts listen for the `languageChanged` event to re-render.
- Every language defines the same keys as English.
- `<lang>-timeline.js` assigns the whole `piercingTimeline` object, so piercing timeline strings must be edited there, not in `<lang>.js`.

---

## Styling

- One stylesheet, `css/style.css`, with theme tokens as custom properties and dark and light themes.
- Interactive controls aim for 44px touch targets.
- Headings use Oswald with Impact and system fallbacks; faux bold is disabled because the fallback has a single weight.

---

## Data Privacy

- No network requests are made with user data. Entries, photos and reminders stay in `localStorage` on the device.
- Photos are re-encoded through a canvas before saving, which drops their EXIF metadata including location.
- Clearing browser data deletes everything; the backup export is the only copy mechanism.

---

## Browser Support & Security

- Current Chrome, Edge, Firefox and Safari.
- No external scripts, fonts or tracking. `index.html` contains a few inline scripts (theme bridge, tab switching), so a Content-Security-Policy that forbids inline scripts needs those moved to files.

---

## Embedding

Use the code in the Embed tab. It loads the tool from `https://poliinternational.com/tools/healing-tracker/index.html` in an iframe; each visitor's data stays in their own browser.
