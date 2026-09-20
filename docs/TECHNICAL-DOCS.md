# Tattoo Removal Sessions Estimator - Technical Documentation (V2)

Published by **Poli International** • Software Architecture & Clinical Implementation

---

## 1. Clinical Algorithm: The Kirby-Desai Scale & Lifestyle Modifiers

The application implements the six-parameter predictive algorithm published by William Kirby, DO and Alpesh Desai, DO (*The Journal of Clinical and Aesthetic Dermatology*, March 2009; 2(3): 32-37), augmented with physiological lifestyle modifiers based on microvascular and lymphatic clearance literature.

### Parameter Scoring Vectors

```typescript
// 1. Fitzpatrick Skin Phototype
SkinScore: {
  'Type I': 1,
  'Type II': 2,
  'Type III': 3,
  'Type IV': 4,
  'Type V': 5,
  'Type VI': 6
}

// 2. Anatomical Location
LocationScore: {
  'Head / Neck (Group 1)': 1,
  'Upper Trunk (Group 2)': 2,
  'Lower Trunk (Group 3)': 3,
  'Proximal Extremity (Group 4)': 4,
  'Distal Extremity (Group 5)': 5
}

// 3. Pigment Colours
ColourScore: {
  'Black only': 1,
  'Black and Red': 2,
  'Black, Red, and Other': 3,
  'Multiple Colours (4+)': 4
}

// 4. Amount of Ink / Density
DensityScore: {
  'Amateur / Sparse': 1,
  'Minimal Outline': 2,
  'Moderate Shading': 3,
  'Significant / Dense Pack': 4
}

// 5. Scarring / Tissue Change
ScarringScore: {
  'None': 0,
  'Minimal': 1,
  'Moderate': 3,
  'Significant': 5
}

// 6. Layering / Cover-up
LayeringScore: {
  'No': 0,
  'Yes': 2
}
```

### Aggregate Scoring & Session Projection

```
TotalScore = SkinScore + LocationScore + ColourScore + DensityScore + ScarringScore + LayeringScore
Score Range: [4, 26] points

MinSessions = Math.max(1, Math.round(TotalScore - 2.5))
MaxSessions = Math.round(TotalScore + 2.5)
```

The published paper states one threshold explicitly: above 15 points, a tattoo may be difficult to remove and a physician should decide whether laser is the right method. This is a referral trigger, not a session-count rule. The UI surfaces it as `#res-referral-notice`, shown whenever `TotalScore > 15`.

### Cover-up Preparation Adjustment

When the user specifies fading for a cover-up:
```
Target Fade: 50% - 70% lightening
CoverupMinSessions = Math.max(1, Math.round(MinSessions * 0.55))
CoverupMaxSessions = Math.max(1, Math.round(MaxSessions * 0.65))
```

### Lifestyle & Circulation Modifiers

Based on clinical dermatology studies on microvascular perfusion and lymphatic clearance velocity (e.g. Bencini et al., *Dermatologic Surgery*, 2012):

```typescript
LifestyleMultiplier = 1.0;

// Active smoking causes cutaneous vasoconstriction and decreases macrophage motility
if (Smoking === 'active') LifestyleMultiplier += 0.30;

// Physical inactivity delays lymphatic return
if (Exercise === 'sedentary') LifestyleMultiplier += 0.10;
if (Exercise === 'high') LifestyleMultiplier -= 0.05;

// Suboptimal hydration impairs systemic lymphatic clearance
if (Hydration === 'low') LifestyleMultiplier += 0.05;

AdjustedMinSessions = Math.max(1, Math.round(MinSessions * LifestyleMultiplier));
AdjustedMaxSessions = Math.max(AdjustedMinSessions, Math.round(MaxSessions * LifestyleMultiplier));
```

### Timeline & Financial Formulas

- **Elapsed Duration**:
  $$\text{Duration (Months)} = \frac{(\text{Sessions} - 1) \times \text{IntervalWeeks}}{4.33}$$
- **Total Financial Range**:
  $$\text{Total Cost} = \text{Sessions} \times \text{PricePerSession}$$
- **Remaining Sessions**:
  $$\text{Remaining} = \max(0, \text{Sessions} - \text{CompletedSessions})$$

---

## 2. Advanced Clinical Modules

### 2.1 Cover-Up Colour Feasibility Matrix
Provides an empirical reference matrix for cover-up feasibility:
- Maps existing base tattoo colors against potential cover-up pigments (Black, Navy, Deep Purple, Forest Green, Warm Brown, Vibrant Red, Yellow/White).
- Displays clearance requirements (Direct Coverage, Needs 2 to 4 laser sessions, or Infeasible without major laser clearance).

### 2.2 Non-Linear Clearance Trajectory (SVG)
Implements an inline SVG logarithmic response curve modeling macrophage ink clearance over successive sessions, charting projected fade percentage versus user-recorded milestones.

### 2.3 Photo Progress Viewer & Store (IndexedDB)
- Uses client-side IndexedDB (`PoliTattooPhotosDB`, object store `photos`).
- Downsamples and compresses images via HTML5 Canvas (`800x800` max resolution, JPEG 0.8 quality).
- Dedicated multi-mode Photo Progress Viewer modal (`#photo-modal`):
  - Dynamic session dropdowns for baseline photo and comparison photo.
  - Perspective Swap button (`#photo-swap-btn`, `⇄`).
  - Real-time visual fading progress summary (`#photo-comparison-summary`) displaying session dates, 0–10 fade ratings, and calculated percentage of pigment clearance achieved between the two sessions.
  - **Draggable Swipe Split Comparison (Slider Mode)**:
    - Allows direct visual overlay of baseline photo over current progress photo.
    - Controlled by CSS variable `--slider-split` and `clip-path: inset(0 (100-pct)% 0 0)`.
    - Interactive Pointer Events (`pointerdown`, `pointermove`, `pointerup` with `setPointerCapture`) and dual touch handlers for fluid real-time scrubbing.
    - Synchronized range input (`#photo-slider-range`) for accessible precision positioning.
    - Integrated `⚡ Blink Compare` mode alternating 0% and 100% split states to trigger optical flicker detection for subtle pigment attenuation.
  - **Optical Pigment Isolation Filters**:
    - Specialized CSS and SVG filter classes applied dynamically across side-by-side and slider views:
      - `photo-filter-normal`: Standard full-color rendering.
      - `photo-filter-grayscale`: `grayscale(100%) brightness(1.05)` removes erythema (skin redness) to evaluate pigment density objectively.
      - `photo-filter-contrast`: `contrast(175%) brightness(0.95)` accentuates optical separation between ink particles and melanin.
      - `photo-filter-edge`: SVG convolution matrix filter (`url(#svg-edge-filter)`) utilizing Sobel-style gradient operators to reveal ink boundary edges.
      - `photo-filter-thermal`: `invert(100%) hue-rotate(180deg) contrast(150%)` converts ink clusters into luminous signals against a darkened dermal field.
  - **Stubborn Ink Cluster Tracking Markers**:
    - Proportional coordinate pinning system (`xPct`, `yPct`) unaffected by display dimensions or zoom scaling.
    - Click-to-place workflow (`handlePhotoTargetClickForMarker`) prompting for clinical cluster names or assigning sequential defaults.
    - Numbered marker pins rendered with responsive tooltip tags on baseline, comparison, and slider stages.
    - Synchronized state management stored per-profile in `localStorage` (`poli_ink_markers_<profileId>`) and merged into `poli_tattoo_profiles_v2` for full backup portability.
    - Summary chip container (`#photo-markers-panel`) with count badge and individual removal handlers.
  - **Hover-to-Zoom Detail Inspector**:
    - Mouse movement tracking (`mousemove`, `mouseenter`, `mouseleave`) and mobile touch tracking (`touchstart`, `touchmove`, `touchend`).
    - Dynamic calculation of cursor percentage offset relative to image bounding box applied to `transform-origin`.
    - User-selectable magnification power pills (`2.0×`, `2.5×`, `3.5×`).
    - Immediate cursor tracking during zoom with disabled CSS transitions during active tracking to eliminate visual lag.
    - Automatically pauses hover zoom during marker placement mode to enable sub-pixel coordinate selection.
    - Floating frosted-glass "Hover to Zoom" guidance badges on active photos.
  - Completely isolated on the client device with zero network transfer.

### 2.4 Multi-Tattoo Profile Manager
- Stores multiple independent tattoo records under `poli_tattoo_profiles_v2`.
- Each profile isolates Kirby-Desai scores, goals, lifestyle settings, notes, aftercare checklists, and photo links.

### 2.5 Interactive Clinical Aftercare Guide
- Structured across 3 comprehensive recovery stages:
  - Stage 1: Acute Healing (0–48 Hours) - Thermal dissipation, sterile non-stick dressing, ice packs.
  - Stage 2: Dermal Recovery (Days 3–14) - Gentle cleansing, thin ointment layer, intact blister protection.
  - Stage 3: Macrophage Clearance & Sun Defense (Weeks 2–8+) - Barrier restoration, SPF 50+ defense, hydration, mandatory biological interval.
- Real-time healing progress meter displaying percentage of completed protocol items.
- Bulk action controls: "Mark All Complete" and "Reset Checklist".
- Fully localized in all 7 supported languages via `data-i18n` attributes.
- Persisted in `localStorage` under `poli_aftercare_<profileId>`.

### 2.6 Data Backup & Portability
- **JSON Export**: Serializes all profiles, settings, aftercare checklists, and IndexedDB photo records into a single portable backup file.
- **JSON Import**: Validates and restores complete datasets with structural sanity checks.
- **CSV Export**: Exports session date, rating, notes, and photo status formatted for spreadsheet software.

---

## 3. Architecture & File Structure

```
├── index.html                   # Semantic markup, zero remote links, data-i18n attributes
├── metadata.json                # Application metadata
├── css/
│   ├── theme.css                # Color variables for light and dark themes (WCAG AA compliant)
│   ├── style.css                # Core application styles, layout, component definitions
│   ├── print.css                # Dedicated consultation sheet print styles
│   └── a11y.css                 # Focus rings, touch targets, reduced motion queries
└── js/
    ├── i18n.js                  # Complete 7-language translation dictionary (322 keys per language)
    ├── photo-store.js           # Client-side IndexedDB engine and canvas image compressor
    ├── features.js              # Clinical modules (Cover-up matrix, SVG Trajectory, Aftercare, Backup)
    ├── input-guards.js          # Shared validation & HTML escaping library
    ├── app.js                   # Application lifecycle, calculations, profiles, DOM bindings
    └── share.js                 # State serialization & fallback
```

---

## 4. RFC 5545 `.ics` Calendar Generation

The application compiles an in-memory iCalendar file (`text/calendar;charset=utf-8`) containing individual `VEVENT` definitions spaced at `IntervalWeeks * 7` days apart from the user-specified start date. Events are exported directly to the user's file system via an in-memory `Blob` and standard download anchor, requiring zero external libraries or network calls.

---

## 5. Zero-Leakage Privacy Model

- **Local Storage & IndexedDB Only**: Client profiles and fade logs are stored in `localStorage` (`poli_tattoo_profiles_v2`). Photos are stored in client-side IndexedDB.
- **No Network Transmission**: Zero analytics, telemetry, remote fonts, CDNs, or third-party tracking pixels.
- **Content Security Policy**: Built for `script-src 'self'`. All dependencies vendored locally.
