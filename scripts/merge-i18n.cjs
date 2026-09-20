const fs = require('fs');
const vm = require('vm');
const newTranslations = require('./new-translations.cjs');

const originalFile = fs.readFileSync('js/i18n.js', 'utf8');

// Parse original dict
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(originalFile, sandbox);
const dict = sandbox.window.i18n.dict;

const langs = ['en', 'fr', 'it', 'de', 'es', 'nl', 'pt'];

langs.forEach(lang => {
  if (!newTranslations[lang]) {
    throw new Error('Missing new translations for lang: ' + lang);
  }
  Object.keys(newTranslations[lang]).forEach(k => {
    dict[lang][k] = newTranslations[lang][k];
  });
});

// Verify all languages have equal keys
const enKeys = Object.keys(dict.en);
console.log('Total keys per language:', enKeys.length);
langs.forEach(lang => {
  const lKeys = Object.keys(dict[lang]);
  if (lKeys.length !== enKeys.length) {
    throw new Error('Key count mismatch in ' + lang + ': ' + lKeys.length + ' vs ' + enKeys.length);
  }
});

// Build the updated js/i18n.js
const updatedContent = `/**
 * Tattoo Removal Sessions Estimator -  Localization Module
 * Complete dictionary-driven text lookup for all user-visible strings.
 * Zero external dependencies.
 */
(function(window) {
  'use strict';

  var STORAGE_KEY = 'poli_tools_language';
  var currentLang = 'en';

  var dict = ${JSON.stringify(dict, null, 2)};

  function t(key, params) {
    var langDict = dict[currentLang] || dict.en;
    var str = langDict[key] || dict.en[key] || key;
    if (params && typeof params === 'object') {
      for (var p in params) {
        if (Object.prototype.hasOwnProperty.call(params, p)) {
          str = str.replace(new RegExp('\\\\{' + p + '\\\\}', 'g'), params[p]);
        }
      }
    }
    return str;
  }

  function getLanguage() {
    return currentLang;
  }

  function setLanguage(lang, callback) {
    if (dict[lang]) {
      currentLang = lang;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {}
    } else {
      currentLang = 'en';
    }
    if (typeof callback === 'function') {
      callback();
    }
  }

  function initLanguage(callback) {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && dict[saved]) {
        currentLang = saved;
      }
    } catch (e) {}
    if (typeof callback === 'function') {
      callback();
    }
  }

  function translatePage() {
    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = t(key);
      }
    }

    var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < placeholders.length; j++) {
      var pEl = placeholders[j];
      var pKey = pEl.getAttribute('data-i18n-placeholder');
      if (pKey) {
        pEl.setAttribute('placeholder', t(pKey));
      }
    }

    var titles = document.querySelectorAll('[data-i18n-title]');
    for (var k = 0; k < titles.length; k++) {
      var tEl = titles[k];
      var tKey = tEl.getAttribute('data-i18n-title');
      if (tKey) {
        tEl.setAttribute('title', t(tKey));
      }
    }

    var ariaLabels = document.querySelectorAll('[data-i18n-aria-label]');
    for (var m = 0; m < ariaLabels.length; m++) {
      var aEl = ariaLabels[m];
      var aKey = aEl.getAttribute('data-i18n-aria-label');
      if (aKey) {
        aEl.setAttribute('aria-label', t(aKey));
      }
    }

    if (dict[currentLang] && dict[currentLang]['app.page_title']) {
      document.title = t('app.page_title');
    }
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict[currentLang] && dict[currentLang]['app.description']) {
      metaDesc.setAttribute('content', t('app.description'));
    }
  }

  var i18n = {
    t: t,
    getLanguage: getLanguage,
    setLanguage: setLanguage,
    initLanguage: initLanguage,
    translatePage: translatePage,
    dict: dict
  };

  if (typeof window !== 'undefined') {
    window.i18n = i18n;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
  }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
`;

fs.writeFileSync('js/i18n.js', updatedContent, 'utf8');
console.log('js/i18n.js updated successfully!');
