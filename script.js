(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ */
  /*  Live local clock                                                   */
  /* ------------------------------------------------------------------ */

  const clockTimeEl = document.getElementById('clockTime');
  const clockAmpmEl = document.getElementById('clockAmpm');
  const clockDayEl = document.getElementById('clockDay');
  const clockDateEl = document.getElementById('clockDate');
  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;

    if (clockTimeEl) clockTimeEl.textContent = `${pad(hours)}:${minutes}:${seconds}`;
    if (clockAmpmEl) clockAmpmEl.textContent = ampm;
    if (clockDayEl) clockDayEl.textContent = DAY_NAMES[now.getDay()];
    if (clockDateEl) clockDateEl.textContent = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
  }

  updateClock();
  setInterval(updateClock, 1000);

  /* ------------------------------------------------------------------ */
  /*  Rotating UI text — typewriter effect                               */
  /*  Types a word out letter by letter, holds it, deletes it letter     */
  /*  by letter, then moves on to the next word. Loops forever.          */
  /* ------------------------------------------------------------------ */

  const rotatorEl = document.getElementById('rotatorWord');
  const ROTATOR_WORDS = [
    'Website UI',
    'App UI',
    'Software UI',
    'Web UI Design',
    'Mobile UI Design',
    'Software UI Design'
  ];

  if (rotatorEl) {
    if (reduceMotion) {
      // Respect reduced motion: swap text instantly, no letter-by-letter typing.
      let idx = 0;
      rotatorEl.textContent = ROTATOR_WORDS[0];
      setInterval(() => {
        idx = (idx + 1) % ROTATOR_WORDS.length;
        rotatorEl.textContent = ROTATOR_WORDS[idx];
      }, 2000);
    } else {
      const TYPE_SPEED = 75;    // ms per character while typing in
      const DELETE_SPEED = 40;  // ms per character while deleting
      const HOLD_TIME = 2000;   // ms to hold the full word before deleting
      const GAP_TIME = 400;     // ms pause before the next word starts typing
      let wordIndex = 0;

      function typeWord() {
        const word = ROTATOR_WORDS[wordIndex];
        let charIndex = 0;

        (function typeChar() {
          charIndex++;
          rotatorEl.textContent = word.slice(0, charIndex);
          if (charIndex < word.length) {
            setTimeout(typeChar, TYPE_SPEED);
          } else {
            setTimeout(deleteWord, HOLD_TIME);
          }
        })();
      }

      function deleteWord() {
        const word = ROTATOR_WORDS[wordIndex];
        let charIndex = word.length;

        (function deleteChar() {
          charIndex--;
          rotatorEl.textContent = word.slice(0, charIndex);
          if (charIndex > 0) {
            setTimeout(deleteChar, DELETE_SPEED);
          } else {
            wordIndex = (wordIndex + 1) % ROTATOR_WORDS.length;
            setTimeout(typeWord, GAP_TIME);
          }
        })();
      }

      typeWord();
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Footer year                                                         */
  /* ------------------------------------------------------------------ */

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------ */
  /*  Mobile navigation                                                   */
  /* ------------------------------------------------------------------ */

  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  function closeMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Active navbar indicator (desktop pill + mobile highlight)          */
  /* ------------------------------------------------------------------ */

  const navLinks = Array.from(document.querySelectorAll('.navbar__link'));
  const mobileLinks = Array.from(document.querySelectorAll('.mobile-nav__link'));
  const navIndicator = document.getElementById('navIndicator');
  const navList = document.getElementById('navList');
  const sections = ['home', 'about', 'services', 'tools', 'work', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  let currentSection = 'home';

  function setActiveNav(id) {
    currentSection = id;
    navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.nav === id));
    mobileLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.nav === id));
    positionIndicator();
  }

  function positionIndicator() {
    if (!navIndicator || !navList) return;
    const activeLink = navLinks.find((link) => link.dataset.nav === currentSection);
    if (!activeLink || activeLink.offsetParent === null) {
      navIndicator.classList.remove('is-ready');
      return;
    }
    const listRect = navList.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    navIndicator.style.width = `${linkRect.width}px`;
    navIndicator.style.transform = `translateX(${linkRect.left - listRect.left}px)`;
    navIndicator.classList.add('is-ready');
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setActiveNav(link.dataset.nav));
  });
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => setActiveNav(link.dataset.nav));
  });

  if (sections.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  window.addEventListener('load', positionIndicator);
  window.addEventListener('resize', positionIndicator);
  setActiveNav('home');

  /* ------------------------------------------------------------------ */
  /*  Repeating scroll-reveal animations                                  */
  /* ------------------------------------------------------------------ */

  const revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ------------------------------------------------------------------ */
  /*  Mouse-following green glow (desktop pointer devices only)          */
  /* ------------------------------------------------------------------ */

  const glow = document.getElementById('cursorGlow');
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (glow && hasFinePointer && !reduceMotion) {
    let active = false;

    window.addEventListener('mousemove', (e) => {
      glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!active) {
        active = true;
        glow.classList.add('is-active');
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      active = false;
      glow.classList.remove('is-active');
    });
  }

})();
