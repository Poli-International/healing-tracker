# Piercing Healing Tracker - Technical Documentation

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

- **HTML5** - Semantic markup with form controls, tabs, and dynamic content containers
- **CSS3** - Custom stylesheets (`poli-standard.css`, `style.css`) with dark/light mode support
- **Vanilla JavaScript (ES6+)** - No frameworks, no libraries, no external dependencies
- **Local Storage** - Theme persistence across sessions

### File Structure

```
/tools/healing-tracker/
├── index.html              # Main tool interface with tab system
├── documentation.html      # Full documentation page (loaded in iframe)
├── embed.html              # Embed instructions and code generator
├── css/
│   ├── poli-standard.css   # Standard Poli theme styles
│   └── style.css           # Tool-specific styles
└── js/
    ├── common.js           # Theme logic, iframe resizing, modal, email form
    ├── piercing-timelines.js  # Piercing healing data (all locations)
    ├── tattoo-timelines.js    # Tattoo healing data (by size)
    └── tracker.js          # Core application logic and event handlers
```

### Component / Logic Breakdown

| Component | File | Purpose |
|-----------|------|---------|
| Tab System | `index.html` + inline script | Switches between Tool, Documentation, and Embed views |
| Setup Form | `index.html` | Procedure type, location/size, date selection |
| Timeline Generator | `tracker.js` | Generates healing timeline based on procedure data |
| Symptom Checker | `tracker.js` | Assesses selected symptoms and returns severity level |
| Aftercare Checklist | `tracker.js` | Generates daily aftercare tasks based on procedure type |
| Theme Manager | `common.js` | Dark/light mode toggle with localStorage persistence |
| Iframe Resizer | `common.js` | Auto-sends height to parent window for responsive embedding |
| Embed Modal | `common.js` | Copy-to-clipboard embed code functionality |

---

## Data Schemas

### `piercingTimelines` (defined in `piercing-timelines.js`)

A large object where each key is a piercing location identifier (e.g., `"earlobe"`, `"helix"`, `"nostril"`). Each value is a timeline object:

```javascript
{
  name: "Earlobe",                    // string - Display name
  category: "Ear",                    // string - Body region category
  healing: "6-8 weeks",              // string - Typical healing duration
  difficulty: "Easy",                // string - Difficulty rating
  healingDiscRecommended: true,      // boolean (optional) - Whether healing discs are recommended
  healingDiscBenefits: "HIGHLY...",  // string (optional) - Marketing/educational text
  stages: [                          // array - Healing phases
    {
      stage: "Week 1-2: Initial Healing",  // string - Phase name
      symptoms: [                          // array of strings
        "Mild redness",
        "Slight swelling",
        "Clear discharge (crusties)",
        "Tenderness"
      ],
      care: [                              // array of strings
        "Spray saline 2-3x daily",
        "Don't touch except when cleaning",
        "Sleep on clean pillowcase"
      ]
    }
    // ... more stages
  ]
}
```

**Example value for `"earlobe"`:**

```javascript
{
  name: "Earlobe",
  category: "Ear",
  healing: "6-8 weeks",
  difficulty: "Easy",
  stages: [
    {
      stage: "Week 1-2: Initial Healing",
      symptoms: ["Mild redness", "Slight swelling", "Clear discharge (crusties)", "Tenderness"],
      care: ["Spray saline 2-3x daily", "Don't touch except when cleaning", "Sleep on clean pillowcase"]
    },
    {
      stage: "Week 3-6: Active Healing",
      symptoms: ["Decreasing redness", "Minimal crusties", "Less tender"],
      care: ["Continue saline 2x daily", "Can start to sleep on it if comfortable", "Avoid changing jewelry yet"]
    },
    {
      stage: "Week 6-8: Fully Healed",
      symptoms: ["No redness", "No discharge", "Can change jewelry"],
      care: ["Clean jewelry regularly", "Continue good hygiene"]
    }
  ]
}
```

### `tattooTimelines` (defined in `tattoo-timelines.js`)

```javascript
{
  small: {                          // key: "small" | "medium" | "large"
    healing: "1-2 weeks surface",   // string - Healing duration
    stages: [                       // array - Same structure as piercing stages
      {
        stage: "Day 1-3: Open Wound",
        symptoms: ["Bright and vibrant", "Redness around tattoo", "Mild swelling", "Oozing plasma/ink", "Feels like sunburn"],
        care: ["Wash gently 2-3x daily", "Apply thin layer fragrance-free lotion", "No soaking/swimming", "Loose clean clothing"]
      }
      // ... more stages
    ]
  }
}
```

### Symptom Data (inline in `index.html`)

Each symptom checkbox has:
- `value` - Machine-readable identifier (e.g., `"mild-redness"`)
- `data-severity` - Severity level: `"normal"`, `"monitor"`, or `"concerning"`
- Display text - Human-readable label (e.g., "Mild redness")

---

## Calculation / Logic Algorithms

### `generatePiercingTimeline(location, date)`

**Location:** `tracker.js`

**Purpose:** Generates and renders the healing timeline for a selected piercing.

**Algorithm:**
1. Look up `piercingTimelines[location]` to get the timeline object
2. Calculate `daysElapsed`:
   ```
   daysElapsed = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24))
   ```
3. If `timeline.healingDiscRecommended` is `true`, prepend a healing disc recommendation banner
4. Build HTML with:
   - Header showing piercing name, day count, and typical healing time
   - Optional healing disc recommendation
   - Stage cards (one per `stages[]` entry) listing symptoms and care instructions
5. Inject HTML into `#timelineResults`

### `generateTattooTimeline(size, date)`

**Location:** `tracker.js`

**Purpose:** Generates and renders the healing timeline for a selected tattoo size.

**Algorithm:**
1. Look up `tattooTimelines[size]` to get the timeline object
2. Calculate `daysElapsed` using the same formula as piercing timeline
3. Build HTML with header and stage cards
4. Inject HTML into `#timelineResults`

### Symptom Assessment (inline in `tracker.js`)

**Trigger:** Click on `#checkSymptoms` button

**Algorithm:**
1. Collect all checked `.symptom-check` checkboxes
2. Filter by `data-severity`:
   - `concerning` - Any symptom with severity "concerning"
   - `monitor` - Any symptom with severity "monitor"
   - `normal` - All remaining (no concerning or monitor symptoms)
3. Determine severity level:
   - If any `concerning` symptoms exist → severity = "Concerning"
   - Else if any `monitor` symptoms exist → severity = "Monitor Closely"
   - Else → severity = "Normal"
4. Check if any selected symptoms match `discHelpfulSymptoms` array (`["moderate-swelling", "increased-redness", "yellow-discharge", "warmth"]`)
5. Build response message with optional healing disc recommendation
6. Render result in `#symptomResults` with appropriate CSS class

### `generateChecklist(type)`

**Location:** `tracker.js`

**Purpose:** Generates a daily aftercare checklist based on procedure type.

**Algorithm:**
1. If `type === "piercing"`, use `piercingChecklist` array (8 items)
2. If `type === "tattoo"`, use `tattooChecklist` array (6 items)
3. Render each item as a checkbox label in `#aftercareChecklist`

### `sendHeight()` (in `common.js`)

**Purpose:** Auto-resizes parent iframe to fit content height.

**Algorithm:**
1. Calculate `document.body.scrollHeight + 50` (buffer)
2. Send height to parent via `window.parent.postMessage({ height: height }, '*')`
3. Triggered on: page load, window resize, click events, change events, and DOM mutations

---

## API Reference

### Public Functions

#### `generatePiercingTimeline(location, date)`
- **Parameters:**
  - `location` (string) - Piercing location key (e.g., `"earlobe"`, `"helix"`)
  - `date` (string) - Procedure date in `YYYY-MM-DD` format
- **Behavior:** Renders healing timeline in `#timelineResults`
- **Returns:** `undefined`

#### `generateTattooTimeline(size, date)`
- **Parameters:**
  - `size` (string) - Tattoo size key (`"small"`, `"medium"`, `"large"`)
  - `date` (string) - Procedure date in `YYYY-MM-DD` format
- **Behavior:** Renders healing timeline in `#timelineResults`
- **Returns:** `undefined`

#### `generateChecklist(type)`
- **Parameters:**
  - `type` (string) - Procedure type (`"piercing"` or `"tattoo"`)
- **Behavior:** Generates aftercare checklist in `#aftercareChecklist`
- **Returns:** `undefined`

#### `copyEmbedCode()`
- **Parameters:** None
- **Behavior:** Copies embed code from `#embedCodeTab` textarea to clipboard
- **Returns:** `undefined`

### Event Handlers

| Event | Element | Handler | Behavior |
|-------|---------|---------|----------|
| `change` | `#procedureType` | Inline | Shows/hides piercing location or tattoo size dropdown |
| `click` | `#startTracking` | Inline | Validates form, generates timeline, shows results |
| `click` | `#checkSymptoms` | Inline | Assesses selected symptoms and displays result |
| `click` | `#resetChecklist` | Inline | Unchecks all checklist items |
| `click` | `.tool-tab` | Inline | Switches between Tool, Documentation, and Embed tabs |
| `click` | `#darkModeToggle` | `common.js` | Toggles dark/light mode |
| `click` | `#embedBtn` | `common.js` | Opens embed modal |
| `click` | `#modalClose` | `common.js` | Closes embed modal |
| `click` | `#copyEmbedCode` | `common.js` | Copies embed code to clipboard |
| `submit` | `.email-form` | `common.js` | Simulates email subscription (no actual submission) |

---

## Integration Guide

### Standalone Embedding

The tool is a self-contained static HTML/CSS/JS application with zero external dependencies. It can be embedded on any website using an iframe:

```html
<iframe
  src="https://poliinternational.com/tools/healing-tracker/index.html"
  width="100%"
  height="800"
  frameborder="0"
  style="border: 1px solid #ddd; border-radius: 8px;"
  title="Piercing Healing Tracker by Poli International">
</iframe>
```

### Embed Options

| Version | Height | Use Case |
|---------|--------|----------|
| Standard | 800px | General purpose, recommended |
| Large | 1000px | Dedicated tool pages |
| Compact | 600px | Space-constrained layouts |

### Iframe Communication

The tool automatically sends its content height to the parent window via `postMessage`:

```javascript
window.parent.postMessage({ height: document.body.scrollHeight + 50 }, '*');
```

The parent page can listen for this message to dynamically resize the iframe:

```javascript
window.addEventListener('message', function(event) {
  if (event.data.height) {
    document.getElementById('myIframe').style.height = event.data.height + 'px';
  }
});
```

### Theme Support

The tool supports dark/light mode. When embedded, the parent page can send a theme message:

```javascript
// Set light mode
document.getElementById('myIframe').contentWindow.postMessage({
  type: 'poli-theme',
  light: true
}, '*');

// Set dark mode
document.getElementById('myIframe').contentWindow.postMessage({
  type: 'poli-theme',
  light: false
}, '*');
```

---

## Customization

### CSS Customization

The tool uses two CSS files:
- `poli-standard.css` - Base Poli theme (colors, typography, layout)
- `style.css` - Tool-specific styles

To customize appearance when embedding, override styles in the parent page or modify the CSS files directly if self-hosting.

### Data Customization

To add or modify piercing locations, edit `piercing-timelines.js`. Each location object follows the schema documented above. To add a new piercing:

1. Add a new key to the `piercingTimelines` object
2. Provide all required fields (`name`, `category`, `healing`, `difficulty`, `stages`)
3. Optionally add `healingDiscRecommended` and `healingDiscBenefits`
4. Add the corresponding `<option>` to the `#piercingLocation` select in `index.html`

### Checklist Customization

Edit the `piercingChecklist` and `tattooChecklist` arrays in `tracker.js` to modify aftercare items.

---

## Performance

- **Zero external dependencies** - No frameworks, no CDN resources, no API calls
- **Minimal DOM manipulation** - Content is generated once and injected
- **No images or heavy assets** - Pure text and CSS-based UI
- **Lightweight** - Total page weight under 50KB including all CSS and JS
- **Efficient iframe resizing** - Uses MutationObserver for intelligent height updates

---

## Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |
| iOS Safari | 14+ | Touch-optimized |
| Android Chrome | 90+ | Touch-optimized |

**Features used:**
- ES6 arrow functions, template literals, `const`/`let`
- `fetch` (not used but available)
- `MutationObserver`
- `localStorage`
- `postMessage` API
- CSS Grid/Flexbox
- CSS custom properties

---

## Security

### Input Handling

- **No user input is sent to any server** - All processing is client-side
- **No form submission** - The email form is a simulation only (no actual data transmission)
- **No cookies** - Only `localStorage` is used for theme preference
- **No external API calls** - The tool is fully self-contained

### XSS Prevention

- All dynamic content is generated using `innerHTML` with controlled, hardcoded data from the timeline objects
- User input (date, dropdown selections) is used only for calculations, not for rendering HTML
- No `eval()` or dynamic script execution
- No user-generated content is displayed

### Iframe Security

- The tool includes `noindex, nofollow` meta tag to prevent search engine indexing of the tool page
- When embedded, the tool detects if it's in an iframe and adjusts theme behavior accordingly
- Cross-origin communication is handled via `postMessage` with no sensitive data transmitted

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01 | Initial release |

---

## Support / Contact

For technical support, integration assistance, or custom development:

- **Email:** support@poliinternational.com
- **Website:** https://poliinternational.com
- **Documentation:** https://poliinternational.com/tools/healing-tracker/documentation.html

---

*Technical documentation maintained by Poli International Engineering Team*
