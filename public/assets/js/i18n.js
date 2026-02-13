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
  const response = await fetch(`locales/${selectedLang}.json`);
  const locale = await response.json();

  i18nNodes.forEach((node) => {
    const value = getByPath(locale, node.dataset.i18n);
    if (typeof value === 'string') {
      node.textContent = value;
    }
  });

  document.documentElement.lang = selectedLang;
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
