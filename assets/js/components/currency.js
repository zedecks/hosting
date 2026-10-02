/**
 * Currency Converter & Exchange Rate Manager (PayPal / MZN-USD-BRL Engine)
 * Clean Code Standard - Dogma v0.3.0
 * Handles MZN (MT) <-> USD ($) <-> BRL (R$) conversions with live exchange rates.
 */

const DEFAULT_USD_MZN_RATE = 64.0;
const DEFAULT_USD_BRL_RATE = 5.60;
const EXCHANGE_RATE_API = 'https://open.er-api.com/v6/latest/USD';
const RATE_STORAGE_KEY = 'zedecks_usd_mzn_rate';
const BRL_RATE_STORAGE_KEY = 'zedecks_usd_brl_rate';
const RATE_TIMESTAMP_KEY = 'zedecks_rate_timestamp';
const CURRENCY_STORAGE_KEY = 'zedecks_currency';

export class CurrencyManager {
  constructor() {
    this.rateMzn = parseFloat(localStorage.getItem(RATE_STORAGE_KEY)) || DEFAULT_USD_MZN_RATE;
    this.rateBrl = parseFloat(localStorage.getItem(BRL_RATE_STORAGE_KEY)) || DEFAULT_USD_BRL_RATE;
    this.rate = this.rateMzn; // backwards-compatible alias
    this.currentCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY) || 'MZN';
    this.userExplicitlySetCurrency = !!localStorage.getItem(CURRENCY_STORAGE_KEY);
    this.init();
  }

  async init() {
    await this.fetchExchangeRate();
    this.bindCurrencyButtons();
    this.listenToLanguageChanges();
    this.applyCurrency(this.currentCurrency);
  }

  async fetchExchangeRate() {
    const lastTimestamp = parseInt(localStorage.getItem(RATE_TIMESTAMP_KEY) || '0', 10);
    const oneHour = 60 * 60 * 1000;
    const now = Date.now();

    // Cache valid for 1 hour
    if (now - lastTimestamp < oneHour && this.rateMzn > 0 && this.rateBrl > 0) {
      return;
    }

    try {
      const response = await fetch(EXCHANGE_RATE_API);
      if (response.ok) {
        const data = await response.json();
        if (data && data.rates) {
          if (data.rates.MZN) {
            this.rateMzn = parseFloat(data.rates.MZN);
            this.rate = this.rateMzn;
            localStorage.setItem(RATE_STORAGE_KEY, this.rateMzn.toString());
          }
          if (data.rates.BRL) {
            this.rateBrl = parseFloat(data.rates.BRL);
            localStorage.setItem(BRL_RATE_STORAGE_KEY, this.rateBrl.toString());
          }
          localStorage.setItem(RATE_TIMESTAMP_KEY, now.toString());
        }
      }
    } catch (e) {
      console.warn('Using fallback exchange rate for USD/MZN/BRL:', e);
    }
  }

  setCurrency(currency, isManual = true) {
    if (currency !== 'MZN' && currency !== 'USD' && currency !== 'BRL') return;
    this.currentCurrency = currency;
    if (isManual) {
      this.userExplicitlySetCurrency = true;
      localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    }
    this.applyCurrency(currency);
  }

  listenToLanguageChanges() {
    window.addEventListener('languageChanged', (e) => {
      const lang = e.detail && e.detail.lang ? e.detail.lang : 'pt';
      // If user hasn't explicitly locked a currency, sync automatically:
      // PT -> MZN, EN -> USD
      if (!this.userExplicitlySetCurrency) {
        const autoCurrency = lang === 'en' ? 'USD' : 'MZN';
        this.setCurrency(autoCurrency, false);
      } else {
        this.applyCurrency(this.currentCurrency);
      }
    });
  }

  applyCurrency(currency) {
    // 1. Update all currency toggle buttons state
    document.querySelectorAll('.currency-toggle-btn').forEach(btn => {
      const btnCur = btn.getAttribute('data-currency');
      const isActive = btnCur === currency;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // 2. Update pricing tag and subtitles if needed
    const currentLang = (window.i18nManager && window.i18nManager.currentLang) || document.documentElement.lang || 'pt';
    const isEn = currentLang === 'en';

    const pricingTagText = document.querySelector('.pricing-section .section-tag .tag-text');
    if (pricingTagText) {
      if (currency === 'USD') {
        pricingTagText.textContent = isEn ? 'Transparent Pricing in USD ($)' : 'Planos Transparentes em USD ($)';
      } else if (currency === 'BRL') {
        pricingTagText.textContent = isEn ? 'Transparent Pricing in BRL (R$)' : 'Planos Transparentes em BRL (R$)';
      } else {
        pricingTagText.textContent = isEn ? 'Transparent Pricing in MZN (MT)' : 'Planos Transparentes em MZN (MT)';
      }
    }

    // 3. Format and update all pricing elements with data-price-mzn
    document.querySelectorAll('[data-price-mzn]').forEach(el => {
      const mznValue = parseFloat(el.getAttribute('data-price-mzn'));
      if (isNaN(mznValue)) return;

      const card = el.closest('.plan-card') || el.parentElement;
      if (!card) return;

      const currencyEl = card.querySelector('.price-currency');
      const valEl = el;

      if (currency === 'USD') {
        const usdValue = mznValue / this.rateMzn;
        if (currencyEl) currencyEl.textContent = '$';
        valEl.textContent = this.formatUSD(usdValue);
      } else if (currency === 'BRL') {
        const usdValue = mznValue / this.rateMzn;
        const brlValue = usdValue * this.rateBrl;
        if (currencyEl) currencyEl.textContent = 'R$';
        valEl.textContent = this.formatBRL(brlValue);
      } else {
        if (currencyEl) currencyEl.textContent = 'MT';
        valEl.textContent = this.formatMZN(mznValue);
      }
    });

    // 4. Dispatch event for other interactive widgets (e.g. WHMCS combo selector)
    window.currencyManager = this;
    window.dispatchEvent(new CustomEvent('currencyChanged', {
      detail: { 
        currency, 
        rateMzn: this.rateMzn, 
        rateBrl: this.rateBrl,
        rate: this.rateMzn 
      }
    }));
  }

  formatMZN(value) {
    const parts = value.toFixed(2).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${integerPart},${parts[1]}`;
  }

  formatUSD(value) {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  formatBRL(value) {
    const parts = value.toFixed(2).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${integerPart},${parts[1]}`;
  }

  bindCurrencyButtons() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.currency-toggle-btn');
      if (btn) {
        const targetCurrency = btn.getAttribute('data-currency');
        if (targetCurrency) {
          this.setCurrency(targetCurrency, true);
        }
      }
    });
  }
}
