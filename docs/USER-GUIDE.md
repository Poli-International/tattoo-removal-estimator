# Tattoo Removal Sessions Estimator: user guide

The Tattoo Removal Sessions Estimator calculates estimated laser session ranges, clinical timelines, and budget requirements based on the published Kirby-Desai scale for tattoo clients, tattoo artists, and laser specialists.

## What it is for

The Tattoo Removal Sessions Estimator applies the clinical scoring scale published by Dr. William Kirby and Dr. Alpesh Desai (Journal of Clinical and Aesthetic Dermatology, March 2009). It evaluates six physical tattoo characteristics, adjusts for circulation and lifestyle factors, projects healing timelines from clinic intervals, models biological clearance curves, calculates estimated costs, evaluates cover-up pigment feasibility, structures recovery aftercare, and exports clinical records.

## Who it is for

This tool serves three groups:
* **Tattoo clients**: Anyone planning laser removal seeking objective session, timeline, and cost estimates.
* **Tattoo artists**: Artists advising clients on fading requirements and pigment feasibility before cover-up tattooing.
* **Laser removal practitioners**: Clinicians needing a transparent reference tool to explain clearance speeds and post-treatment care.

## How to use it

### 1. Managing multiple tattoo profiles

Locate `Active Tattoo Profile:` at the very top of the calculator.
Click `+ New Assessment` to create an independent assessment profile for a new tattoo (e.g. "Forearm Raven").
Use `Rename` to update the name of the active tattoo assessment.
Click `Delete` to remove the current profile. Each profile maintains its own clinical factors, lifestyle settings, aftercare checklists, and photo logs.

### 2. Selecting the interface language

Open the `Language` menu in the header.
Select English, Español, Deutsch, Français, Italiano, Português, or Nederlands.
All interface labels, units, and guides update instantly.

### 3. Setting your treatment goal

Review `Treatment Goal` at the top of the form.
Select `Complete Removal` for full clearance (95 percent or higher).
Select `Fade for a Cover-up` for partial lightening (50 to 70 percent fade), requiring roughly 55 to 65 percent of full removal sessions.

### 4. Scoring the six clinical Kirby-Desai factors

Under the clinical assessment section, enter each characteristic:
* `Fitzpatrick Skin Phototype`: Select your phototype directly (1 to 6 points) or use the sunburn and tanning helper.
* `Tattoo Location`: Select body region (1 to 5 points), from head and neck to hands and feet.
* `Ink Colour(s)`: Select pigment grouping (1 to 4 points), from monochromatic black to multicoloured ink.
* `Amount of Ink / Density`: Select saturation (1 to 4 points), from amateur lines to solid tribal saturation.
* `Scarring or Dermal Tissue Change`: Select dermal texture (0 to 5 points), from normal skin to pronounced hypertrophic scarring.
* `Layering / Cover-up Tattoo`: Indicate if ink covers older work (0 points for original tattoos, 2 points for cover-ups).

### 5. Accounting for circulation and lifestyle factors

Under `Circulation & Lifestyle Modifiers`, select your physiological parameters:
* `Smoking Status:`: Active smoking causes cutaneous vasoconstriction, adding roughly 30 percent more sessions.
* `Physical Activity Level:`: Physical activity promotes lymphatic drainage and macrophage transit.
* `Daily Water Hydration:`: Adequate daily water intake assists immune clearance of fragmented pigment particles.

### 6. Customizing clinic spacing, price, and treatment progress

Enter appointment spacing in `Clinic session interval (weeks):` (clinical standard is 6 to 10 weeks).
Enter clinic fee in `Price per session (optional, enter your currency):` and pick your currency symbol. The calculator dynamically computes and displays the **Projected Total Cost** range based on your estimated session minimum and maximum, updating automatically in real time whenever the estimated session range or price inputs change.
If treatments have started, check `I have already started laser treatments`.
Enter past visits in `Sessions completed so far:` and recorded visual progress in `Estimated fading achieved so far (0 to 10):`.

### 7. Calculating your estimate and reviewing results

Click `Calculate Kirby-Desai Estimate`.
Review estimated metrics: `Total Kirby-Desai Score`, `Estimated Sessions`, `Projected Timeline`, `Remaining Sessions`, `Projected Total Cost` (calculated dynamically from your price per session), and `Dominant Factor: `.
Inspect the clinical point breakdown table showing exact parameter scores and mathematical formulas.

### 8. Interpreting the biological clearance trajectory curve

Scroll to `Non-Linear Biological Clearance Trajectory`.
Review the logarithmic response curve charting projected pigment clearance across sequential visits.
Compare your current recorded fade progress against the biological reference trajectory.

### 9. Evaluating cover-up pigment feasibility

Click `Toggle Cover-Up Feasibility Matrix` to display the `Cover-Up Colour Feasibility Matrix`.
Review cross-tabulated pigment recommendations showing which new colors can effectively cover residual base ink.
Identify whether your desired new ink requires direct application, 2 to 4 laser fading sessions, or extensive clearance.

### 10. Generating a projected appointment calendar

Scroll to `Projected Session Schedule`.
Pick your starting session date in `First / Next Session Date:`.
Review projected appointment dates spaced by your recovery interval.
Click `Download .ics Calendar Schedule` to export a standard iCalendar file.

### 11. Following the clinical aftercare stage checklist

Locate `Interactive Clinical Aftercare Checklist`.
Check off recovery actions across `Stage 1: Acute Healing (Hours 0 to 48)`, `Stage 2: Dermal Recovery (Days 3 to 14)`, and `Stage 3: Macrophage Clearance & Sun Defense (Weeks 2 to 8+)`.
Use the `Mark All Complete` button to quickly check all recovery items, or `Reset Checklist` to clear all selections. Monitor your healing progress bar as you complete acute thermal dissipation, epidermal restoration, and sun defense. All aftercare items and stages are fully localized across all 7 supported languages.

### 12. Reviewing frequently asked clinical questions (FAQ)

Locate `Frequently Asked Clinical Questions`.
Review evidence-based answers covering tattoo fading plateaus, skin preparation protocols, multicolor laser chromophores, paradoxical darkening risks, tobacco smoking factors, cover-up fading thresholds, Fitzpatrick phototype adaptations, pain management options, and biological recovery intervals.
Click any individual question header to expand or collapse its explanation.
Click `Expand All` to open all 9 clinical questions simultaneously, or `Collapse All` to close all open items.

### 13. Logging treatment history with Photo Progress Viewer

Locate `Personal Session & Fade Log`.
Enter `Session Date`, `Fade Rating (0–10)`, and observations in `Treatment Note (reaction, blister, clinic feedback)`.
Click `Select Photo` to attach a local clinical progression photograph.
Click `Add Session Entry` to commit the log.
Click `Photo Progress Viewer` (or `View Photo` on any logged session row) to open the advanced **Photo Progress Viewer** modal.

In the viewer, you can select any baseline photo and current/comparison photo from your stored session logs. Use the `Swap` button (⇄) to reverse baseline and comparison perspectives. The viewer displays session dates, fade ratings, and calculates the percentage of visual pigment lightening achieved between the two sessions.

**Comparison View Modes (Side-by-Side & Draggable Swipe Slider):**
- **Side-by-Side Mode**: Inspect baseline and comparison photographs in synchronized adjacent containers.
- **Swipe Slider Mode**: Click the `Swipe Slider` view mode button to overlay the baseline photo directly over the progress photo. Drag the divider line handle across the image (or adjust the split slider control below) to smoothly reveal clearance differences along the exact same anatomical contours.
- **⚡ Blink Compare**: Click the Blink Compare button to trigger a rapid alternating flash between baseline and comparison views, making subtle pigment lightening immediately noticeable to the human eye.

**Optical Ink Isolation Filters:**
- Use the filter toolbar to isolate ink pigment from skin redness (erythema) and surrounding epidermal melanin:
  - `Original`: Natural full-color clinical photograph.
  - `Grayscale`: Eliminates chromatic distraction, allowing pure evaluation of tonal pigment density.
  - `High Contrast`: Maximizes tonal separation between ink deposits and skin tones.
  - `Edge Detection`: Applies Sobel kernel convolution filtering to highlight the boundary edges of stubborn lines and deep pigment clusters.
  - `Inverted / Ink Focus`: Inverts tonal values so residual pigment stands out as luminous bright deposits on a dark field.

**Stubborn Ink Cluster Tracking Markers:**
- Click `+ Add Marker` to enter marker placement mode.
- Click directly on any specific stubborn ink cluster on either photo or within the slider stage.
- Enter an anatomical or descriptive label (e.g., "Deep tribal apex", "Dense outline knot", or accept the default numbered label).
- A numbered pin is affixed at that exact percentage coordinate, displaying identically across baseline, comparison, and slider views to track recalcitrant ink across multiple sessions.
- Review tracked ink clusters in the `Tracked Ink Clusters` panel below the photos. Click any individual chip's delete icon (×) or click a pin to remove it, or use `Clear All` to reset all markers.
- All cluster markers are saved automatically to your active tattoo profile and included in full JSON exports.

**Hover-to-Zoom Inspection:**
- Move your mouse over either photo (or drag your finger on mobile/touch screens) to zoom into fine details.
- The zoom tracks your cursor position in real time, centering magnification on pigment clusters, ink shading, or skin texture.
- Select your preferred magnification power using the `2.0×`, `2.5×`, or `3.5×` zoom buttons in the viewer toolbar.
- All images and markers remain stored privately on your local device via IndexedDB and localStorage.
Use `Delete` on the session log table to remove any obsolete entry.

### 14. Backing up, restoring, and exporting records

Under `Data Backup & Portability`, click `Export Backup (JSON)` to save all profiles, aftercare checklists, and photos into a local file.
Click `Import Backup (JSON)` to restore saved client files.
Click `Download Fade Log (CSV)` to export your treatment history table as a CSV spreadsheet.

### 15. Preparing consultation questions and printing

Review `Questions for Your Laser Clinic` covering patch testing, interval spacing, and cover-up coordination.
Click `Print Consultation Sheet` to print or save a complete consultation brief.

### 16. Resetting the form

Click `Clear Form` to clear active inputs and restore initial defaults.

## What it does not do

* It does not assess individual keloid or hypertrophic scarring predisposition. To evaluate personal scarring predisposition before skin procedures, consult the [Keloid Scar Risk Evaluator](https://poliinternational.com/keloid-scar-risk/).
* It does not identify ink chemistry, CAS registry codes, or EU REACH compliance. To look up tattoo pigment colorants, consult the [Ink Ingredient Decoder](https://poliinternational.com/ink-ingredient-decoder/).
* It does not calibrate laser machinery or adjust energy fluences.
* It does not transmit health records or book clinical appointments.

## Where your data lives

All inputs, assessments, and images remain on your local device:
* **Browser memory**: Form inputs and calculated schedules exist in memory during your active session.
* **Local browser storage**: Tattoo profiles, treatment logs, lifestyle options, and aftercare states are saved in localStorage under `poli_tattoo_profiles_v2`.
* **IndexedDB photo storage**: Progress photos are compressed locally and stored in your browser IndexedDB database (`PoliTattooPhotosDB`).
* **No network transmission**: The tool makes zero server requests and transmits no data to Poli International or third parties.
* **Backup portability**: Complete JSON exports allow transferring records between devices without cloud synchronization.

## Printing and exporting

The tool provides multiple export formats:
1. **Print Consultation Sheet**: Formats factor scores, session projections, cost estimates, clinic questions, and treatment logs into a printable brief.
2. **Download .ics Calendar Schedule**: Exports projected treatment dates into an RFC 5545 iCalendar file compatible with calendar software.
3. **Full Backup (JSON)**: Archives complete multi-profile assessments, checklists, and progression photographs.
4. **Fade Log (CSV)**: Exports session dates, ratings, and clinical notes for spreadsheet analysis.

## Questions and answers

### How accurate is the Kirby-Desai scale for laser tattoo removal?
The Kirby-Desai scale is a statistical model based on a peer-reviewed 100-patient study published in 2009. In that group, the scale accounted for roughly 80 percent of treatment variance. Because healing, ink chemistry, and lasers vary, actual results may differ from calculated ranges.

### What happens if laser tattoo removal stops working or hits a fading plateau?
A fading plateau commonly occurs when the easily fragmented superficial ink has been cleared, leaving deeper, larger, or more stubborn pigment clusters behind. When fading stalls, your provider may re-evaluate their approach for what remains, or extend the interval between sessions to 12 to 16 weeks to give the body more time to clear the fragmented pigment without overworking the skin. What changes, if anything, is a clinical decision made in person by your provider, not something this tool can specify.

### How should I prepare my skin before a laser tattoo removal session?
Proper pre-treatment preparation minimizes the risk of adverse epidermal pigment changes. Avoid direct sun exposure, tanning beds, and self-tanning products for at least 4 to 6 weeks before each session, as epidermal melanin competes with tattoo ink for laser energy and increases hypopigmentation risks. Shave the treatment area with a clean razor 24 hours prior to prevent singeing hair shafts. Arrive with clean skin free of lotions, perfumes, makeup, or unprescribed topical numbing agents. Hydrate thoroughly and avoid alcohol or blood-thinning medications for 24 hours beforehand.

### Why do multi-colored inks (green, blue, yellow) require different lasers than black?
Laser tattoo removal works by a pigment absorbing light energy and fracturing into smaller pieces the body can clear; a given wavelength only works well if the target pigment actually absorbs it. Black ink absorbs a very broad range of light and generally responds most reliably. Red, blue, green, and purple pigments absorb more narrowly, and yellow is notoriously the hardest colour to clear because it absorbs light poorly across the range that is safe for skin. This is exactly why multi-colour work often needs more sessions than solid black. Which laser and wavelength your provider chooses for your specific ink is a clinical decision made in person, not something this tool can specify.

### Can white ink or cosmetic tattoo pigment turn black when lasered?
Yes. This phenomenon is known clinically as paradoxical darkening. White ink, flesh-toned pigments, and cosmetic makeup inks frequently contain titanium dioxide (TiO2) or ferric oxide (Fe2O3). Under high-intensity laser irradiation, these metallic oxides undergo rapid chemical reduction, permanently turning white or neutral tones into dark grey, slate, or black. Clinicians should always perform a discrete test spot on cosmetic or white pigments before broader treatment.

### How much does smoking tobacco affect the number of sessions required?
In published clinical trials (including Kirby et al. and Bencini et al.), smoking tobacco reduced the rate of complete tattoo clearance after 10 sessions by approximately 70 percent. Nicotine causes persistent cutaneous vasoconstriction, impairing microvascular perfusion. Because ink clearance relies entirely on dermal macrophages transporting shattered ink particles through lymphatic channels, reduced microcirculation significantly delays macrophage transit and increases total sessions.

### When is a tattoo faded enough for a cover-up instead of complete clearance?
Fading for a cover-up generally requires only 50 to 70 percent pigment reduction rather than 95 percent or greater full removal. This typically reduces total laser sessions by 35 to 45 percent. Have your tattoo artist inspect the faded area once dense black outlines have shifted to soft translucent greys. This allows the artist to apply new saturated colors without old linework showing through. Always allow at least 8 to 12 weeks of tissue healing after the final laser session before tattooing over the area.

### How does my Fitzpatrick skin type influence laser safety and treatment speed?
Fitzpatrick skin types I through III have less epidermal melanin, which generally gives a provider more room to work without affecting the surrounding skin colour. Types IV through VI contain more natural melanin, which competes with the tattoo pigment for the laser's energy and raises the risk of the skin itself darkening or lightening (hyperpigmentation or hypopigmentation) if the approach is not adjusted for that skin type. A provider experienced with darker skin types will adjust their approach accordingly; this is exactly why the plan is set in person, not by a website.

### Does laser tattoo removal hurt, and what pain management options are available?
Most patients describe the sensation of laser pulses as similar to a rubber band snapping forcefully against the skin accompanied by intense brief heat. Because sensation varies by anatomical location, clinics use several discomfort reduction techniques: continuous forced cold air blown over the skin before, during, and after pulses; topical prescription lidocaine/prilocaine numbing creams applied 30 to 60 minutes beforehand; and chilled ice packs. Medical practices may also administer local lidocaine nerve blocks or intradermal injections for sensitive areas.

### Why are session intervals spaced 8 to 12+ weeks apart, and can treatments be scheduled sooner?
Shortening treatment intervals does not accelerate tattoo clearance and substantially increases the risk of scarring, blister formation, and tissue trauma. Lasers do not vaporize ink; they fracture it into microscopic fragments. Your lymphatic system and tissue macrophages require 8 to 12+ weeks to engulf and clear these fragments. Treating sooner exposes traumatized dermis to additional heat before macrophage scavenging has finished, providing no additional fading benefit.

### Why do tattoos on hands and feet take longer to remove?
Ink clearance depends on regional blood circulation and lymphatic drainage. The head, neck, and trunk have dense capillary networks that remove ink quickly. Hands, wrists, ankles, and feet have lower peripheral blood flow, meaning macrophages clear ink at a substantially slower rate.

### How does the non-linear clearance curve model fading?
Ink clearance is non-linear: initial sessions break up dense superficial ink with high visual contrast changes, while deeper ink particles require progressively longer macrophage transit times. The curve illustrates this logarithmic clearance dynamic.

## Limits

The Kirby-Desai algorithm is an educational reference, not a medical diagnosis or treatment guarantee. The tool cannot evaluate individual immune health, macrophage clearing velocity, or metabolic rates. It cannot determine proprietary ink formulas, pigment depths, or operator proficiency. Decisions regarding laser settings, patch testing, interval spacing, and clinical care remain strictly between the client and a licensed medical professional or laser practitioner during an in-person consultation.
