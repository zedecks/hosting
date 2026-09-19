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

  // ========== MOBILE MENU SYSTEM ==========
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const DESKTOP_BREAKPOINT = 1080;

  function isMobile() {
    return window.innerWidth < DESKTOP_BREAKPOINT;
  }

  function toggleMobileMenu() {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    navLinks.classList.add('open');
    mobileMenuBtn?.classList.add('active');
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    navLinks.classList.remove('open');
    mobileMenuBtn?.classList.remove('active');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    // Close mobile dropdowns
    document.querySelectorAll('.nav-item.dropdown-open').forEach(item => {
      item.classList.remove('dropdown-open');
    });
  }

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close menu when clicking on navigation links on mobile
  navLinks?.querySelectorAll('a.nav-link, a.dropdown-item').forEach(link => {
    link.addEventListener('click', () => {
      if (isMobile()) {
        closeMobileMenu();
      }
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      closeMobileMenu();
    }
  });

  // ========== NAVIGATION DROPDOWNS ==========
  document.querySelectorAll('.nav-item').forEach(item => {
    const btn = item.querySelector('button.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');
    if (btn && dropdown) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (isMobile()) {
          // Mobile: Accordion toggle
          const isOpen = item.classList.contains('dropdown-open');
          document.querySelectorAll('.nav-item.dropdown-open').forEach(sibling => {
            if (sibling !== item) sibling.classList.remove('dropdown-open');
          });
          item.classList.toggle('dropdown-open', !isOpen);
          btn.setAttribute('aria-expanded', !isOpen);
        } else {
          // Desktop: Inline styles toggle
          const isVisible = dropdown.style.visibility === 'visible';
          
          document.querySelectorAll('.dropdown-menu').forEach(d => {
            d.style.opacity = '';
            d.style.visibility = '';
            d.style.pointerEvents = '';
            d.style.transform = '';
          });
          document.querySelectorAll('.nav-item button.nav-link').forEach(b => {
            b.setAttribute('aria-expanded', 'false');
          });

          if (!isVisible) {
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.pointerEvents = 'auto';
            dropdown.style.transform = 'translateX(-50%) translateY(0)';
            btn.setAttribute('aria-expanded', 'true');
          }
        }
      });
    }
  });

  // Close desktop dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.dropdown-menu').forEach(d => {
        d.style.opacity = '';
        d.style.visibility = '';
        d.style.pointerEvents = '';
        d.style.transform = '';
      });
      document.querySelectorAll('.nav-item button.nav-link').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
      });
    }
    if (isMobile() && !e.target.closest('.site-header')) {
      closeMobileMenu();
    }
  });

  // ========== SCROLL REVEAL ANIMATIONS ==========
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
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});
