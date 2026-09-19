/**
 * Main Application Entry Point
 * Zedeck's IT — host.zedecks.com
 */
import { I18nManager } from './components/i18n.js';
import { initPricingTabs } from './components/tabs.js';
import { initFaqAccordion } from './components/faq.js';
import { initLeadForm } from './components/form.js';
import { initDomainSearch } from './components/domain.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize i18n
  const i18n = new I18nManager();

  // Initialize UI Components
  initDomainSearch();
  initPricingTabs();
  initFaqAccordion();
  initLeadForm();

  // ========== MOBILE MODAL DRAWER SYSTEM ==========
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavModal = document.getElementById('mobileNavModal');
  const mobileModalCloseBtn = document.getElementById('mobileModalCloseBtn');
  const DESKTOP_BREAKPOINT = 1080;

  function isMobile() {
    return window.innerWidth < DESKTOP_BREAKPOINT;
  }

  function toggleMobileMenu() {
    const isOpen = mobileNavModal?.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    if (!mobileNavModal) return;
    mobileNavModal.inert = false;
    mobileNavModal.removeAttribute('aria-hidden');
    mobileNavModal.classList.add('open');
    mobileMenuBtn?.classList.add('active');
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeMobileMenu() {
    if (!mobileNavModal) return;
    
    // Release focus from inside the modal before setting inert
    if (mobileNavModal.contains(document.activeElement)) {
      if (mobileMenuBtn) {
        mobileMenuBtn.focus();
      } else if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
    }

    mobileNavModal.classList.remove('open');
    mobileNavModal.inert = true;
    mobileMenuBtn?.classList.remove('active');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Unlock background scroll
    
    // Close any open accordion inside mobile modal
    mobileNavModal.querySelectorAll('.mobile-nav-accordion.open').forEach(acc => {
      acc.classList.remove('open');
      const trigger = acc.querySelector('.mobile-accordion-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  // Hamburger button click
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Modal close button (X)
  if (mobileModalCloseBtn) {
    mobileModalCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  // Close when clicking on the backdrop overlay
  if (mobileNavModal) {
    mobileNavModal.addEventListener('click', (e) => {
      if (e.target === mobileNavModal) {
        closeMobileMenu();
      }
    });

    // Mobile Accordion Items Logic (Domínios, Produtos, Tools)
    const accordions = mobileNavModal.querySelectorAll('.mobile-nav-accordion');
    accordions.forEach(accordion => {
      const trigger = accordion.querySelector('.mobile-accordion-trigger');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = accordion.classList.contains('open');

          // Close other accordions (single-open pattern)
          accordions.forEach(otherAcc => {
            if (otherAcc !== accordion) {
              otherAcc.classList.remove('open');
              const otherTrigger = otherAcc.querySelector('.mobile-accordion-trigger');
              if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            }
          });

          // Toggle current accordion
          accordion.classList.toggle('open', !isOpen);
          trigger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
        });
      }
    });

    // Close modal when clicking on any navigation link inside
    mobileNavModal.querySelectorAll('a.mobile-nav-link, a.mobile-submenu-link, a.btn-mobile-access').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavModal?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (!isMobile() && mobileNavModal?.classList.contains('open')) {
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
