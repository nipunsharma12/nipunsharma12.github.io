/* =========================================================
   animations.js — single-page portfolio interactions
   All native JS, no dependencies.
   ========================================================= */

(function () {
  'use strict';

  /* ── Scroll progress bar ──────────────────────────────── */
  const progressBar = document.getElementById('scrollProgress');

  function updateProgress() {
    const scrolled   = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }

  /* ── Nav shrink on scroll ─────────────────────────────── */
  const header = document.getElementById('siteHeader');

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 60);
  }

  /* ── Active nav section highlight ────────────────────── */
  const sections  = Array.from(document.querySelectorAll('section[id]'));
  const navLinks  = Array.from(document.querySelectorAll('.nav-link[data-section]'));

  function updateActiveNav() {
    const scrollMid = window.scrollY + window.innerHeight * 0.4;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollMid >= top && scrollMid < bottom) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }

  /* ── Throttled rAF scroll handler ────────────────────── */
  let scrollPending = false;

  window.addEventListener('scroll', () => {
    if (scrollPending) return;
    scrollPending = true;
    requestAnimationFrame(() => {
      updateProgress();
      updateHeader();
      updateActiveNav();
      scrollPending = false;
    });
  }, { passive: true });

  /* Kick off on load */
  updateProgress();
  updateHeader();
  updateActiveNav();

  /* ── Reveal animations (Intersection Observer) ────────── */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Timeline line draw ───────────────────────────────── */
  const timelineLine = document.getElementById('timelineLine');

  if (timelineLine) {
    const tlObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            timelineLine.classList.add('drawing');
            tlObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    tlObserver.observe(document.getElementById('timeline'));
  }

  /* ── Smooth scroll for in-page anchors ───────────────── */
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href   = anchor.getAttribute('href');
    if (href.length <= 1) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  /* ── Subtle mouse parallax on hero orbs ──────────────── */
  const orbs = document.querySelectorAll('.orb');

  if (orbs.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let mx = 0, my = 0, rafId = null;

    document.addEventListener('mousemove', e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          orbs.forEach((orb, i) => {
            const factor = (i + 1) * 12;
            orb.style.transform = `translate(${mx * factor}px, ${my * factor}px)`;
          });
          rafId = null;
        });
      }
    }, { passive: true });
  }

  /* ── Card hover tilt (note cards + travel cards) ─────── */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.note-card, .travel-card, .bento-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) / (rect.width  / 2);
        const dy   = (e.clientY - cy) / (rect.height / 2);

        const rotateX =  dy * -3.5;
        const rotateY =  dx *  3.5;

        card.style.transform = `translateY(-4px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

})();
