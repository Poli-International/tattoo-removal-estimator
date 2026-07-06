# Tattoo Removal Sessions Estimator - Technical Documentation

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
11. [Support and Contact](#support-and-contact)

## Architecture Overview

### Technology Stack

- **HTML5** - Semantic markup with ARIA-compatible form controls
- **CSS3** - Single stylesheet (`/tools/tattoo-removal-estimator/css/style.css`)
- **Vanilla JavaScript (ES5+)** - No frameworks, libraries, or dependencies
- **InputGuards** - Internal utility library (`/js/input-guards.js`) for input sanitization and error formatting

### File Structure

```
/tools/tattoo-removal-estimator/
├── index.html          # Main tool page (standalone)
├── css/
│   └── style.css       # All tool styling
└── js/
    └── app.js          # Core application logic
/js/
└── input-guards.js     # Shared input validation utility
```

### Component Breakdown

The tool consists of three logical components:

1. **Form Input Layer** - Six `<select>` elements collecting tattoo and patient characteristics
2. **Calculation Engine** - Kirby-Desai-inspired scoring algorithm in `app.js`
3. **Results Display Layer** - Dynamic DOM elements showing session estimates, difficulty score, duration, factor breakdown, and clinical notes

## Data Schemas

### RANGES Array

Defines scoring thresholds and corresponding session estimates:

```javascript
var RANGES = [
  { max: 4,        sessions: [1, 3],   label: 'Easy',           cls: 'diff-easy' },
  { max: 7,        sessions: [4, 6],   label: 'Moderate',       cls: 'diff-moderate' },
  { max: 10,       sessions: [6, 8],   label: 'Challenging',    cls: 'diff-challenging' },
  { max: 13,       sessions: [8, 10],  label: 'Difficult',      cls: 'diff-difficult' },
  { max: 17,       sessions: [10, 13], label: 'Very Difficult',  cls: 'diff-very-difficult' },
  { max: Infinity, sessions: [13, 18], label: 'Extreme',         cls: 'diff-extreme' }
];
```

**Properties:**
- `max` (Number): Maximum score for this range tier
- `sessions` (Array[Number, Number]): Minimum and maximum estimated sessions
- `label` (String): Human-readable difficulty description
- `cls` (String): CSS class for styling the difficulty indicator

### FACTORS Array

Defines the six input factors and their clinical notes:

```javascript
var FACTORS = [
  { id: 'skin-type',    label: 'Fitzpatrick Skin Type',    note: '...' },
  { id: 'location',     label: 'Tattoo Location',          note: '...' },
  { id: 'ink-color',    label: 'Ink Colours',              note: '...' },
  { id: 'ink-density',  label: 'Ink Density',              note: '...' },
  { id: 'scarring',     label: 'Scarring / Tissue Change', note: '...' },
  { id: 'cover-up',     label: 'Cover-up Tattoo?',         note: '...' }
];
```

**Properties:**
- `id` (String): Matches the HTML element `id` attribute
- `label` (String): Display name for the factor
- `note` (String): Clinical explanation shown in results when factor score >= 2

### Input Values and Scoring

| Factor | Option | Score |
|--------|--------|-------|
| **Fitzpatrick Skin Type** | I-II | 1 |
| | III | 2 |
| | IV | 3 |
| | V | 4 |
| | VI | 5 |
| **Tattoo Location** | Head/Neck/Face | 0 |
| | Upper trunk | 1 |
| | Lower trunk | 2 |
| | Upper extremity | 3 |
| | Lower extremity/Hands/Feet | 4 |
| **Ink Colours** | Black only | 1 |
| | Black and grey | 1.5 |
| | Coloured (no fluorescent) | 2 |
| | Includes fluorescent/neon | 4 |
| **Ink Density** | Minimal | 1 |
| | Light | 2 |
| | Moderate | 3 |
| | Heavy | 4 |
| **Scarring** | None | 0 |
| | Mild | 1 |
| | Moderate | 2 |
| | Severe | 3 |
| **Cover-up** | No | 0 |
| | Yes | 4 |

## Calculation / Logic Algorithms

### Main Calculation Flow

The calculation is triggered by the `click` event on the "Estimate Sessions" button (`#calc-btn`).

#### Step 1: Input Validation

```javascript
calcBtn.addEventListener('click', function () {
  var vals = {};
  var allFilled = true;
  FACTORS.forEach(function (f) {
    var el = document.getElementById(f.id);
    if (!el.value) allFilled = false;
    vals[f.id] = G.safeFloat(el.value, 0);
  });
```

- Iterates over all six `FACTORS`
- Checks each `<select>` element for a non-empty value
- Parses values to floats using `InputGuards.safeFloat()`
- If any field is empty, displays an error message and exits

#### Step 2: Safety Warnings

Two safety-critical checks are performed:

1. **Fitzpatrick Type VI detection**: Checks if the selected skin type label contains "Type VI", "type 6", or "type vi"
2. **White/light ink detection**: Checks if the ink color label contains "white", "light", or "titanium"

These generate warning messages displayed above the results.

#### Step 3: Score Calculation

```javascript
var score = FACTORS.reduce(function (s, f) { return s + vals[f.id]; }, 0);
```

- Sums all six factor scores
- Returns a total between 0 and 20 (theoretical maximum: 5+4+4+4+3+4 = 24, but practical maximum is 20 based on option values)

#### Step 4: Session Range Determination

```javascript
var range = RANGES.find(function (r) { return score <= r.max; });
var minS = range.sessions[0];
var maxS = range.sessions[1];
var isExtreme = maxS === 18;
```

- Finds the first `RANGES` entry where `score <= max`
- Extracts session range from the matched entry
- Special case: if `maxS === 18` (Extreme tier), displays "13+" instead of "13-18"

#### Step 5: Duration Calculation

```javascript
function formatDuration(minS, maxS) {
  var minW = (minS - 1) * 6;
  var maxW = (maxS - 1) * 6;
  if (maxW === 0) return '< 6 weeks';
  if (maxW < 13) return minW + '–' + maxW + ' wks';
  var mn = Math.round(minW / 4.33);
  var mx = Math.round(maxW / 4.33);
  return mn + '–' + mx + ' months';
}
```

- Assumes 6-week intervals between sessions
- Subtracts 1 from session count (first session starts at week 0)
- Converts weeks to months using 4.33 weeks/month for durations over 12 weeks

#### Step 6: Factor Breakdown Generation

Builds an HTML table showing each factor, the user's selection, and the point value. Includes a total score row.

#### Step 7: Clinical Notes Generation

Filters `FACTORS` to only those with score >= 2 and displays their clinical notes. If no factors score >= 2, displays a default message about straightforward removal cases.

## API Reference

### Public Functions

#### `formatDuration(minS, maxS)`

**Parameters:**
- `minS` (Number): Minimum session count
- `maxS` (Number): Maximum session count

**Returns:** String (e.g., "6-12 wks", "3-5 months")

**Behavior:** Calculates total treatment duration based on 6-week intervals between sessions. Converts to months for durations exceeding 12 weeks.

#### Event Handler: `calcBtn.addEventListener('click', callback)`

**Trigger:** Click on "Estimate Sessions" button

**Behavior:**
1. Validates all six form fields are filled
2. Parses values using `InputGuards.safeFloat()`
3. Calculates total score
4. Determines session range from `RANGES` lookup
5. Generates safety warnings for Type VI skin and white ink
6. Populates all result fields (session range, score, difficulty, duration)
7. Builds factor breakdown table
8. Generates clinical notes for high-scoring factors
9. Scrolls results into view

### External Dependencies

#### `InputGuards` (from `/js/input-guards.js`)

| Method | Usage |
|--------|-------|
| `G.safeFloat(value, fallback)` | Parses string to float, returns fallback on failure |
| `G.esc(string)` | HTML-escapes user-generated text for safe DOM insertion |
| `G.formatError(message)` | Returns HTML string for error display |
| `G.formatWarning(message)` | Returns HTML string for warning display |

## Integration Guide

### Standalone Embedding

The tool is fully self-contained in three files:

1. `/tools/tattoo-removal-estimator/index.html`
2. `/tools/tattoo-removal-estimator/css/style.css`
3. `/tools/tattoo-removal-estimator/js/app.js`

Plus one shared dependency:
4. `/js/input-guards.js`

### Iframe Embedding

The tool supports iframe embedding with automatic dark/light theme detection:

```html
<iframe 
  src="https://poliinternational.com/tools/tattoo-removal-estimator/"
  width="100%" 
  height="800px"
  frameborder="0"
  allow="clipboard-write"
></iframe>
```

**Theme Communication:** The tool listens for `postMessage` events with `{ type: 'poli-theme', light: true/false }` to switch between dark and light themes when embedded.

### Requirements

- No build tools, package managers, or server-side processing required
- All calculation happens client-side in the browser
- No cookies, localStorage, or external API calls

## Customization

### Modifying Session Ranges

Edit the `RANGES` array in `app.js`:

```javascript
// Example: Change "Moderate" tier to 3-5 sessions
{ max: 7, sessions: [3, 5], label: 'Moderate', cls: 'diff-moderate' }
```

### Adding New Factors

1. Add a new `<select>` element in `index.html` with a unique `id`
2. Add a corresponding entry to the `FACTORS` array in `app.js`
3. Add the scoring option values to the `<option>` elements

### Changing Session Spacing

Modify the multiplier in `formatDuration()`:

```javascript
// Change from 6-week to 8-week intervals
var minW = (minS - 1) * 8;
var maxW = (maxS - 1) * 8;
```

## Performance

- **Zero network requests** after initial page load (no external fonts, analytics, or CDN resources)
- **DOM manipulation only on calculation** - no virtual DOM or reactive framework overhead
- **No animation or transition effects** that could cause layout thrashing
- **Total JavaScript footprint:** Approximately 3KB (minified) for `app.js` plus shared `input-guards.js`

## Browser Compatibility

The tool uses:
- `Array.prototype.find()` (ES6) - Not supported in Internet Explorer
- `Array.prototype.forEach()` (ES5) - Supported in IE9+
- `Array.prototype.map()` (ES5) - Supported in IE9+
- `Array.prototype.reduce()` (ES5) - Supported in IE9+
- `String.prototype.includes()` (ES6) - Not supported in Internet Explorer
- `insertAdjacentHTML()` (DOM Level 2) - Supported in IE4+

**Supported browsers:** Chrome 45+, Firefox 25+, Safari 7+, Edge 12+, Opera 32+

**Not supported:** Internet Explorer (any version)

## Security

### Input Handling

All user input is processed through `InputGuards.safeFloat()` which:
- Returns a fallback value (0) for non-numeric input
- Prevents NaN propagation through calculations

### XSS Prevention

User-facing text from `<select>` elements is HTML-escaped using `InputGuards.esc()` before DOM insertion:

```javascript
G.esc(selText)  // Escapes HTML entities in option text
```

### Content Security

- The tool sets `noindex, nofollow` meta tags to prevent search engine indexing
- No user data is stored, transmitted, or logged
- No third-party scripts or resources are loaded

## Version History

### Version 1.0.0 (Current)

- Initial release of the Tattoo Removal Sessions Estimator
- Six-factor Kirby-Desai-inspired scoring model
- Safety warnings for Fitzpatrick Type VI skin and white/light inks
- Iframe embedding support with theme detection
- Clinical notes for high-scoring factors
- Factor breakdown table with point values

## Support and Contact

For technical issues, feature requests, or integration support:

- **Email:** support@poliinternational.com
- **Website:** https://poliinternational.com/tools/tattoo-removal-estimator/

---

*This documentation reflects the tool as of its initial release. The tool is provided as a reference guide and should not replace professional medical consultation.*
