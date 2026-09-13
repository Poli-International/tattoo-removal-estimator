/**
 * Shareable result card wiring for the Tattoo Removal Estimator (PoliShare).
 * State is the six factor selections; restore refills them and recalculates.
 */
'use strict';

(function () {
  var FIELD_IDS = ['skin-type', 'location', 'ink-color', 'ink-density', 'scarring', 'cover-up'];

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value : '';
  }

  function text(id) {
    var el = document.getElementById(id);
    return el ? el.textContent.trim() : '';
  }

  PoliShare.init({
    tool: 'tattoo-removal-estimator',
    mount: '#results',

    getState: function () {
      var s = {};
      for (var i = 0; i < FIELD_IDS.length; i++) {
        var v = val(FIELD_IDS[i]);
        if (!v) return null;
        s[FIELD_IDS[i]] = v;
      }
      return s;
    },

    applyState: function (s) {
      var complete = true;
      FIELD_IDS.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && s[id]) el.value = s[id];
        else complete = false;
      });
      if (!complete) return;
      var btn = document.getElementById('calc-btn');
      if (btn) btn.click();
    },

    getCard: function () {
      var results = document.getElementById('results');
      if (!results || results.style.display === 'none') return null;
      var sessions = text('session-range');
      if (!sessions) return null;
      return {
        t: 'My laser removal estimate: ' + sessions + ' sessions',
        d: [
          ['Sessions', sessions],
          ['Difficulty', text('difficulty-label')],
          ['Score', text('score-display')],
          ['Duration', text('duration-range')],
        ],
      };
    },
  });
})();
