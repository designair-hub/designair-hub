const supportedLangs = ['hu', 'en'];
const langButtons = document.querySelectorAll('[data-lang]');
const i18nNodes = document.querySelectorAll('[data-i18n]');

async function loadLocale(lang) {
  const selectedLang = supportedLangs.includes(lang) ? lang : 'hu';
  const response = await fetch(`locales/${selectedLang}.json`);
  const locale = await response.json();

  i18nNodes.forEach((node) => {
    const keyPath = node.dataset.i18n.split('.');
    const value = keyPath.reduce((acc, key) => (acc ? acc[key] : undefined), locale);

    if (typeof value === 'string') {
      node.textContent = value;
    }
  });

  document.documentElement.lang = selectedLang;
  langButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === selectedLang);
  });
}

langButtons.forEach((button) => {
  button.addEventListener('click', () => loadLocale(button.dataset.lang));
});

loadLocale('hu');
