'use strict';

var G = InputGuards;
var calcBtn = document.getElementById('calc-btn');
var results = document.getElementById('results');

var RANGES = [
  { max: 4,        sessions: [1, 3],   label: 'Easy',           cls: 'diff-easy' },
  { max: 7,        sessions: [4, 6],   label: 'Moderate',       cls: 'diff-moderate' },
  { max: 10,       sessions: [6, 8],   label: 'Challenging',    cls: 'diff-challenging' },
  { max: 13,       sessions: [8, 10],  label: 'Difficult',      cls: 'diff-difficult' },
  { max: 17,       sessions: [10, 13], label: 'Very Difficult',  cls: 'diff-very-difficult' },
  { max: Infinity, sessions: [13, 18], label: 'Extreme',         cls: 'diff-extreme' },
];

var FACTORS = [
  {
    id: 'skin-type', label: 'Fitzpatrick Skin Type',
    note: 'Lighter skin types respond faster: 1064 nm Nd:YAG and picosecond devices can run at higher fluence without PIH risk. Type IV–VI require lower energy per pass and longer intervals between sessions, effectively adding sessions to reach clearance.',
  },
  {
    id: 'location', label: 'Tattoo Location',
    note: 'Lymphatic drainage rate directly drives clearance of fragmented ink particles. Head and neck have dense vascular supply and fastest turnover. Fingers, feet, and lower legs have sluggish perfusion and consistently require more sessions to achieve the same clearance.',
  },
  {
    id: 'ink-color', label: 'Ink Colours',
    note: 'Black ink absorbs the 1064 nm wavelength strongly. Red responds to 532 nm. Multi-colour tattoos require different wavelengths, meaning more passes. Fluorescent pigments contain proprietary dyes that may be largely laser-resistant regardless of settings or wavelength.',
  },
  {
    id: 'ink-density', label: 'Ink Density',
    note: 'Each session can only fragment the uppermost layer of ink. Heavily packed, multi-pass work holds significantly more pigment per unit area. The laser cannot reach deeper layers until surface ink is cleared, which requires additional sessions.',
  },
  {
    id: 'scarring', label: 'Scarring / Tissue Change',
    note: 'Scar tissue reduces lymphatic flow through the treated area, slowing ink clearance after fragmentation. It also alters laser energy absorption unpredictably. Keloid-prone individuals should discuss laser safety with a dermatologist before starting treatment.',
  },
  {
    id: 'cover-up', label: 'Cover-up Tattoo',
    note: 'A cover-up contains at minimum two stacked ink layers. The interaction between layers creates complex absorption behaviour, and the combined ink load can be double or triple that of a standard tattoo — substantially extending the sessions required.',
  },
];

function formatDuration(minS, maxS) {
  var minW = (minS - 1) * 6;
  var maxW = (maxS - 1) * 6;
  if (maxW === 0) return '< 6 weeks';
  if (maxW < 13) return minW + '–' + maxW + ' wks';
  var mn = Math.round(minW / 4.33);
  var mx = Math.round(maxW / 4.33);
  return mn + '–' + mx + ' months';
}

calcBtn.addEventListener('click', function () {
  var vals = {};
  var allFilled = true;
  FACTORS.forEach(function (f) {
    var el = document.getElementById(f.id);
    if (!el.value) allFilled = false;
    vals[f.id] = G.safeFloat(el.value, 0);
  });

  if (!allFilled) {
    results.style.display = '';
    results.innerHTML = G.formatError('Complete all six fields to see your estimate.');
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  var criticalWarnings = [];

  // Safety-critical: Fitzpatrick Type VI
  var skinEl = document.getElementById('skin-type');
  if (skinEl && skinEl.selectedOptions && skinEl.selectedOptions[0]) {
    var skinLabel = skinEl.selectedOptions[0].text || '';
    if (/Type VI|type 6|type vi/i.test(skinLabel)) {
      criticalWarnings.push(
        '<strong>Fitzpatrick Type VI skin warning:</strong> Elevated risk of hypopigmentation and keloid scarring from laser removal. A dermatologist consultation and test patch are essential before proceeding.'
      );
    }
  }

  // Safety-critical: White/light ink colors
  var inkEl = document.getElementById('ink-color');
  if (inkEl && inkEl.selectedOptions && inkEl.selectedOptions[0]) {
    var inkLabel = inkEl.selectedOptions[0].text || '';
    if (/white|light|titanium/i.test(inkLabel)) {
      criticalWarnings.push(
        '<strong>White/light ink warning:</strong> White and titanium-dioxide-based inks may oxidize and darken permanently when treated with Q-switched lasers. Consult a dermatologist with laser experience before starting.'
      );
    }
  }

  var score = FACTORS.reduce(function (s, f) { return s + vals[f.id]; }, 0);
  var range = RANGES.find(function (r) { return score <= r.max; });
  var minS = range.sessions[0];
  var maxS = range.sessions[1];
  var isExtreme = maxS === 18;

  var sessionEl = document.getElementById('session-range');
  sessionEl.textContent = isExtreme ? '13+' : minS + '–' + maxS;
  sessionEl.className = 'metric-value ' + range.cls;

  var scoreEl = document.getElementById('score-display');
  scoreEl.textContent = score % 1 === 0 ? score : score.toFixed(1);
  scoreEl.className = 'metric-value ' + range.cls;

  var diffEl = document.getElementById('difficulty-label');
  diffEl.textContent = range.label;
  diffEl.className = 'metric-sub ' + range.cls;

  document.getElementById('duration-range').textContent = formatDuration(minS, maxS);

  document.getElementById('factor-breakdown').innerHTML =
    '<div class="factor-table">' +
    '<div class="factor-head"><span>Factor</span><span>Selection</span><span>Pts</span></div>' +
    FACTORS.map(function (f) {
      var el = document.getElementById(f.id);
      var selText = el.options[el.selectedIndex].text;
      var v = vals[f.id];
      return '<div class="factor-row">' +
        '<span class="factor-name">' + G.esc(f.label) + '</span>' +
        '<span class="factor-sel">' + G.esc(selText) + '</span>' +
        '<span class="factor-pts">' + (v % 1 === 0 ? v : v.toFixed(1)) + '</span>' +
        '</div>';
    }).join('') +
    '<div class="factor-row factor-total">' +
    '<span class="factor-name">Total Score</span><span></span>' +
    '<span class="factor-pts">' + (score % 1 === 0 ? score : score.toFixed(1)) + '</span>' +
    '</div>' +
    '</div>';

  var highFactors = FACTORS.filter(function (f) { return vals[f.id] >= 2; });
  document.getElementById('explanation').innerHTML = highFactors.length
    ? highFactors.map(function (f) { return '<p><strong>' + G.esc(f.label) + ':</strong> ' + f.note + '</p>'; }).join('')
    : '<p>All factors score at their minimum values. This profile represents a relatively straightforward removal case — fine-line black work on fair skin in a well-perfused location with no scarring and no cover-up involved.</p>';

  // Insert critical warnings at top of results
  var warningsHtml = criticalWarnings.length
    ? '<div style="margin-bottom:1rem">' + criticalWarnings.map(function (w) { return G.formatWarning(w); }).join('') + '</div>'
    : '';

  // Prepend warnings to the existing results container
  var existingExplanation = document.getElementById('explanation');
  if (existingExplanation && criticalWarnings.length) {
    existingExplanation.insertAdjacentHTML('beforebegin', warningsHtml);
  }

  results.style.display = '';
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
