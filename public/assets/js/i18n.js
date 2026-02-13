<<<<<<< codex/create-microsite-with-placeholders-and-dockerfile-6fnc8o
const supportedLangs = ['hu', 'en', 'de', 'fr', 'it', 'sv', 'lt'];
const i18nNodes = document.querySelectorAll('[data-i18n]');

const domainLangMap = {
  'woodestic.hu': 'hu',
  'woodesticgames.com': 'en',
  'woodesticspiele.de': 'de',
  'jeuxwoodestic.fr': 'fr',
  'giochiwoodestic.it': 'it',
  'woodesticspel.se': 'sv',
  'woodesticzaidimai.lt': 'lt'
};

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

function detectLanguage() {
  const queryLang = new URLSearchParams(window.location.search).get('lang');
  if (queryLang && supportedLangs.includes(queryLang)) return queryLang;

  const mapped = domainLangMap[window.location.hostname];
  if (mapped) return mapped;

  return 'en';
}

async function loadLocale(lang) {
  const selectedLang = supportedLangs.includes(lang) ? lang : 'en';
=======
const supportedLangs = ['hu', 'en'];
const langButtons = document.querySelectorAll('[data-lang]');
const i18nNodes = document.querySelectorAll('[data-i18n]');

async function loadLocale(lang) {
  const selectedLang = supportedLangs.includes(lang) ? lang : 'hu';
>>>>>>> main
  const response = await fetch(`locales/${selectedLang}.json`);
  const locale = await response.json();

  i18nNodes.forEach((node) => {
<<<<<<< codex/create-microsite-with-placeholders-and-dockerfile-6fnc8o
    const value = getByPath(locale, node.dataset.i18n);
=======
    const keyPath = node.dataset.i18n.split('.');
    const value = keyPath.reduce((acc, key) => (acc ? acc[key] : undefined), locale);

>>>>>>> main
    if (typeof value === 'string') {
      node.textContent = value;
    }
  });

  document.documentElement.lang = selectedLang;
<<<<<<< codex/create-microsite-with-placeholders-and-dockerfile-6fnc8o
  return locale;
}

function setConsent(value) {
  localStorage.setItem('cookieConsent', value);
}

function loadAnalyticsIfConsented() {
  const consent = localStorage.getItem('cookieConsent');
  if (consent !== 'accepted') return;

  const gaId = document.querySelector('meta[name="ga-measurement-id"]')?.content;
  if (!gaId || gaId === 'G-XXXXXXXXXX') return;

  if (window.gtag) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', gaId, { anonymize_ip: true });
}

function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  const accept = document.getElementById('cookie-accept');
  const decline = document.getElementById('cookie-decline');
  const currentConsent = localStorage.getItem('cookieConsent');

  if (!currentConsent) {
    banner.hidden = false;
  }

  accept.addEventListener('click', () => {
    setConsent('accepted');
    banner.hidden = true;
    loadAnalyticsIfConsented();
  });

  decline.addEventListener('click', () => {
    setConsent('declined');
    banner.hidden = true;
  });
}

const lang = detectLanguage();
loadLocale(lang).then(() => {
  initCookieBanner();
  loadAnalyticsIfConsented();
});
=======
  langButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === selectedLang);
  });
}

langButtons.forEach((button) => {
  button.addEventListener('click', () => loadLocale(button.dataset.lang));
});

loadLocale('hu');
>>>>>>> main
