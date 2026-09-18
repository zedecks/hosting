/**
 * i18n Translation Engine
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

  setLanguage(lang) {
    if (lang === this.currentLang) return;
    this.currentLang = lang;
    localStorage.setItem('zedecks_lang', lang);
    this.applyLanguage(lang);
  }

  applyLanguage(lang) {
    document.documentElement.lang = lang;
    
    // Update toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

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
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setLanguage(btn.dataset.lang);
      });
    });
  }
}
