/**
 * Main Application Entry Point
 * Zedeck's IT — host.zedecks.com
 */
import { I18nManager } from './components/i18n.js';
import { initPricingTabs } from './components/tabs.js';
import { initFaqAccordion } from './components/faq.js';
import { initLeadForm } from './components/form.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize i18n
  const i18n = new I18nManager();

  // Initialize UI Components
  initPricingTabs();
  initFaqAccordion();
  initLeadForm();

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});
