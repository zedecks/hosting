/**
 * i18n Translation Engine
 * Single Circular Flag Toggle (shows Mozambique when in English, UK when in Portuguese)
 */
export class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('zedecks_lang') || 'pt';
    this.translations = {};
    this.init();
  }

  async init() {
    await this.loadTranslations('pt');
    await this.loadTranslations('en');
    this.applyLanguage(this.currentLang);
    this.bindEvents();
  }

  async loadTranslations(lang) {
    try {
      const response = await fetch(`./assets/js/i18n/${lang}.json`);
      if (response.ok) {
        this.translations[lang] = await response.json();
      }
    } catch (e) {
      console.warn(`Could not load translations for ${lang}:`, e);
    }
  }

  toggleLanguage() {
    const nextLang = this.currentLang === 'pt' ? 'en' : 'pt';
    this.setLanguage(nextLang);
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('zedecks_lang', lang);
    this.applyLanguage(lang);
  }

  applyLanguage(lang) {
    document.documentElement.lang = lang;
    
    // Update single circular flag toggle button with Flaticon SVGs
    const toggleBtn = document.getElementById('langToggleBtn');
    if (toggleBtn) {
      const flagMoz = toggleBtn.querySelector('.flag-moz');
      const flagUk = toggleBtn.querySelector('.flag-uk');
      
      // If language is PT, show UK flag to switch to EN.
      // If language is EN, show Mozambique flag to switch to PT.
      if (lang === 'pt') {
        if (flagUk) flagUk.style.display = 'block';
        if (flagMoz) flagMoz.style.display = 'none';
        toggleBtn.setAttribute('title', 'Switch to English');
        toggleBtn.setAttribute('aria-label', 'Switch to English');
      } else {
        if (flagUk) flagUk.style.display = 'none';
        if (flagMoz) flagMoz.style.display = 'block';
        toggleBtn.setAttribute('title', 'Mudar para Português');
        toggleBtn.setAttribute('aria-label', 'Mudar para Português');
      }
    }

    const dict = this.translations[lang];
    if (!dict) return;

    // Replace text in elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.getNestedValue(dict, key);
      if (val !== undefined) {
        el.textContent = val;
      }
    });

    // Replace placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = this.getNestedValue(dict, key);
      if (val !== undefined) {
        el.setAttribute('placeholder', val);
      }
    });
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : undefined), obj);
  }

  bindEvents() {
    const toggleBtn = document.getElementById('langToggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.toggleLanguage();
      });
    }
  }
}
