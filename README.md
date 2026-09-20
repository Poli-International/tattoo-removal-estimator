# Tattoo Removal Sessions Estimator -  V2

> **Clinical laser tattoo removal session estimator implementing the published Kirby-Desai scale (Kirby W, Desai A et al., 2009).**

[![License](https://img.shields.io/github/license/Poli-International/tattoo-removal-estimator)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/Poli-International/tattoo-removal-estimator)](https://github.com/Poli-International/tattoo-removal-estimator/commits/main)

**Live Tool:** [https://poliinternational.com/tools/tattoo-removal-estimator/](https://poliinternational.com/tools/tattoo-removal-estimator/)

---

## 🎯 Overview

The **Tattoo Removal Sessions Estimator** translates the published clinical six-factor scoring scale (*The Journal of Clinical and Aesthetic Dermatology*, March 2009) into a practical consultation tool for clients, tattoo artists planning cover-ups, and laser practitioners.

This tool is published by **Poli International** -  manufacturer of body jewelry and creator of BioFlex(R) body jewelry, providing free tools for tattoo artists, piercers, and studio owners.

It runs entirely in the browser: zero server-side storage, zero network transmission, zero third-party scripts.

---

## ✨ Features (V2)

1. **Faithful Kirby-Desai Scale**:
  - Fitzpatrick Skin Phototype (Types I–VI, 1 to 6 pts) with an integrated two-question guided helper (sunburn and tanning response).
  - Tattoo Location (5 published anatomical groups, 1 to 5 pts) with specific named body sites mapped to their respective groups.
  - Ink Colours (Black only, Black & Red, Black, Red & Other, Multicolour, 1 to 4 pts).
  - Amount of Ink / Density (Amateur, Minimal, Moderate, Significant, 1 to 4 pts).
  - Scarring or Dermal Tissue Change (None, Minimal, Moderate, Significant, 0, 1, 3, 5 pts).
  - Layering / Cover-up (No, Yes, 0 or 2 pts).
2. **Transparent Mathematical Working**:
  - Point-by-point table showing the reader's input, the assigned points, and the total score.
  - Plain-language explanation identifying the dominant factor that most raised the session count.
3. **Realistic, User-Defined Timelines**:
  - Reader enters their clinic's recommended interval in weeks (e.g. 6 to 10 weeks).
  - Calculates elapsed duration range in months: `(sessions - 1) * interval / 4.33`.
4. **Fading for Cover-up Preparation**:
  - Option to specify treatment goal: complete clearance vs. fading for a cover-up.
  - Adjusts session estimate to 50%–70% lightening (~55%–65% of full clearance sessions).
5. **Already Started / Remaining Sessions**:
  - Reader enters sessions already completed and current subjective fade rating (0–10) to calculate remaining sessions.
6. **Projected Total Cost Calculation**:
  - Dynamically calculates the projected total treatment cost range based on user-provided price per session and minimum/maximum estimated sessions, updating in real time with currency selection.
7. **Side-by-Side Photo Progress Viewer with Hover-to-Zoom**:
  - Client-side IndexedDB photo progression store with a dedicated comparison viewer allowing users to pick any baseline and comparison photo from their logged sessions, swap perspectives (⇄), and calculate visual fading progress percentages.
  - Interactive **hover-to-zoom detail inspection**: allows users to hover over either photo (or touch on mobile/tablet) with dynamic cursor-centered tracking and configurable magnification power (2.0×, 2.5×, 3.5×) to inspect fine pigment fragmentation and epidermal healing.
8. **Interactive Clinical Aftercare Checklist**:
  - Multi-stage recovery guide covering 0–48 hours, 3–14 days, and 2–8+ weeks with interactive completion checkboxes, healing progress indicator, and bulk action controls ("Mark All Complete" and "Reset Checklist").
9. **Projected Session Calendar & .ics Export**:
  - Generates projected session dates based on the clinic's interval with client-side downloadable RFC 5545 `.ics` calendar file for appointment planning.
10. **Evidence-Based Clinical FAQs**:
  - Nine comprehensive, readable clinical questions and answers with accordion expand/collapse and bulk expand/collapse controls across all 7 supported languages.
11. **Printable Consultation Sheet & Backup**:
  - Generates a clean consultation sheet with Kirby-Desai breakdown, timeline, notes, and clinic questions, plus complete JSON import/export and CSV log export.

---

## 🌐 Embed On Your Studio Website

Embed the estimator directly into your website or client consultation portal:

```html
<iframe
  src="https://poliinternational.com/tools/tattoo-removal-estimator/index.html"
  width="100%"
  height="920"
  frameborder="0"
  style="border-radius: 12px; border: 1px solid #30363d; overflow: hidden;"
  title="Tattoo Removal Sessions Estimator">
</iframe>
```

---

## 🚀 Running Locally

```bash
git clone https://github.com/Poli-International/tattoo-removal-estimator.git
cd tattoo-removal-estimator
# Open index.html directly in any modern web browser
```

---

## 📚 Documentation

- [User Guide](docs/USER-GUIDE.md) -  Clinical factors, scoring guidance, and consultation advice.
- [Technical Documentation](docs/TECHNICAL-DOCS.md) -  Mathematical formulas, published scale constants, and architecture.
- [Contributing Guide](CONTRIBUTING.md) -  Guidelines for contributions.
- [License](LICENSE) -  MIT License.

---

## 💬 Support & Inquiries

- 📧 **Email**: support@poliinternational.com
- 🐛 **Issue Tracker**: [GitHub Issues](https://github.com/Poli-International/tattoo-removal-estimator/issues)

---

<div align="center">
  <strong>Published by <a href="https://poliinternational.com">Poli International</a></strong><br>
  <a href="https://poliinternational.com">Website</a> • <a href="https://poliinternational.com/tools/">Tools Suite</a> • <a href="https://github.com/Poli-International">GitHub</a>
</div>
