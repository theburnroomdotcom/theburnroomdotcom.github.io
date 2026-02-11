/* ============================================
   THE BURN ROOM — Scrollytelling Engine
   GSAP + ScrollTrigger + Lenis
   ============================================ */

(function () {
  'use strict';

  /* ---------- Globals ---------- */
  const isMobile = () => window.innerWidth <= 768;
  let lenis;
  let scrollTriggers = [];

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initNavbar();
    initMobileNav();
    initHeroSlideshow();
    initChefSlideshow();
    initScrollAnimations();
  });

  /* ============================================
     LENIS — Smooth scrolling
     ============================================ */
  function initLenis() {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Sync Lenis with GSAP ticker
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  /* ============================================
     NAVBAR
     ============================================ */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      toggleClass: { className: 'scrolled', targets: navbar },
    });
  }

  /* ============================================
     MOBILE NAV
     ============================================ */
  function initMobileNav() {
    const toggle = document.querySelector('.navbar__toggle');
    const links = document.querySelector('.navbar__links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      links.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    links.querySelectorAll('.navbar__link').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('active');
        toggle.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('active');
        toggle.classList.remove('active');
      }
    });
  }

  /* ============================================
     HERO SLIDESHOW
     ============================================ */
  function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero__slide');
    if (!slides || slides.length < 2) return;

    let idx = 0;
    setInterval(() => {
      slides[idx].classList.remove('is-active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('is-active');
    }, 6500);

    // Autoplay videos and pause when not visible
    slides.forEach((slide) => {
      const video = slide.querySelector('video');
      if (video) {
        video.play().catch(() => {});
      }
    });
  }

  /* ============================================
     CHEF IMAGE SLIDESHOW
     ============================================ */
  function initChefSlideshow() {
    const slides = document.querySelectorAll('.chef__slide');
    if (!slides || slides.length < 2) return;

    let idx = 0;
    setInterval(() => {
      slides[idx].classList.remove('chef__slide--active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('chef__slide--active');
    }, 4200);
  }

  /* ============================================
     SCROLL ANIMATIONS — Master orchestrator
     ============================================ */
  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Kill existing on resize
    killScrollTriggers();

    animateHero();
    animateMission();
    animateTestimonials();
    animateGallery();
    animateChef();
    animateStory();
    animateFAQ();
    animateCTA();

    // Refresh after images load
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        killScrollTriggers();
        animateHero();
        animateMission();
        animateTestimonials();
        animateGallery();
        animateChef();
        animateStory();
        animateFAQ();
        animateCTA();
        ScrollTrigger.refresh();
      }, 300);
    });
  }

  function killScrollTriggers() {
    scrollTriggers.forEach((st) => st.kill());
    scrollTriggers = [];
  }

  function trackST(st) {
    if (st) scrollTriggers.push(st);
    return st;
  }

  /* ============================================
     1. HERO — Parallax + fade out
     ============================================ */
  function animateHero() {
    const hero = document.querySelector('.hero');
    const slideshow = document.querySelector('.hero__slideshow');
    const content = document.querySelector('.hero__content');
    const indicator = document.querySelector('.hero__scroll-indicator');

    if (!hero || !slideshow || !content) return;

    const parallaxAmount = isMobile() ? 80 : 200;

    // Parallax on slideshow
    const heroTl = gsap.timeline({
      scrollTrigger: trackST(ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      })),
    });

    heroTl
      .to(slideshow, {
        y: parallaxAmount,
        scale: 1.08,
        ease: 'none',
      }, 0)
      .to(content, {
        y: -120,
        opacity: 0,
        ease: 'none',
      }, 0);

    // Fade out scroll indicator
    if (indicator) {
      trackST(ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: '20% top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(indicator, { opacity: 1 - self.progress * 3 });
        },
      }));
    }
  }

  /* ============================================
     2. MISSION — Staggered card + bullet reveals
     ============================================ */
  function animateMission() {
    const cards = document.querySelectorAll('.mission__card');
    if (!cards.length) return;

    cards.forEach((card, i) => {
      // Card entrance
      const cardAnim = gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.3,
        ease: 'power2.out',
        scrollTrigger: trackST(ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        })),
      });

      // Stagger list items inside
      const items = card.querySelectorAll('[data-reveal-item]');
      if (items.length) {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          delay: i * 0.3 + 0.4,
          ease: 'power2.out',
          scrollTrigger: trackST(ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          })),
        });
      }
    });
  }

  /* ============================================
     3. TESTIMONIALS — Pinned, stacked card transitions
     ============================================ */
  function animateTestimonials() {
    const section = document.querySelector('.testimonials-section');
    const pinWrap = document.querySelector('.testimonials__pin-wrap');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonials__progress-dot');

    if (!section || !pinWrap || cards.length < 2) return;

    const numCards = cards.length;

    // Pin the section for (numCards) * 100vh
    const testimTl = gsap.timeline({
      scrollTrigger: trackST(ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${numCards * 100}vh`,
        pin: pinWrap,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress * numCards;
          const activeIdx = Math.min(Math.floor(progress), numCards - 1);

          dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIdx);
          });
        },
      })),
    });

    // Animate cards: each gets a portion of the timeline
    cards.forEach((card, i) => {
      if (i === 0) {
        // First card: visible at start, fade out
        testimTl
          .to(card, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.01,
          }, 0);

        if (i < numCards - 1) {
          testimTl.to(card, {
            opacity: 0,
            scale: 0.8,
            y: -60,
            duration: 1,
            ease: 'power2.inOut',
          }, 1);
        }
      } else {
        // Subsequent cards: appear then disappear
        const enterAt = i;

        testimTl.fromTo(card,
          { opacity: 0, scale: 0.85, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power2.inOut',
          },
          enterAt
        );

        if (i < numCards - 1) {
          testimTl.to(card, {
            opacity: 0,
            scale: 0.8,
            y: -60,
            duration: 1,
            ease: 'power2.inOut',
          }, enterAt + 1);
        }
      }
    });
  }

  /* ============================================
     4. GALLERY — Horizontal scroll (desktop) / vertical (mobile)
     ============================================ */
  function animateGallery() {
    const section = document.querySelector('.gallery-section');
    const pinWrap = document.querySelector('.gallery__pin-wrap');
    const strip = document.querySelector('.gallery__strip');
    const items = document.querySelectorAll('.gallery__item');

    if (!section || !strip || !items.length) return;

    if (isMobile()) {
      // Mobile: simple fade-in for each item
      items.forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: trackST(ScrollTrigger.create({
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            })),
          }
        );
      });
      return;
    }

    // Desktop: horizontal scroll
    const totalWidth = () => strip.scrollWidth - window.innerWidth;

    trackST(ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${totalWidth() + window.innerHeight}`,
      pin: pinWrap,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.set(strip, { x: -self.progress * totalWidth() });
      },
    }));

    // Scale-up items on entry
    items.forEach((item) => {
      gsap.fromTo(item,
        { scale: 0.9, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: trackST(ScrollTrigger.create({
            trigger: item,
            containerAnimation: null,
            start: 'left 80%',
            toggleActions: 'play none none none',
            scroller: strip,
          })),
        }
      );
    });
  }

  /* ============================================
     5. CHEF — Pinned image with text reveals
     ============================================ */
  function animateChef() {
    const section = document.querySelector('.chef-section');
    const pinWrap = document.querySelector('.chef__pin-wrap');
    const textBlocks = document.querySelectorAll('[data-chef-text]');

    if (!section || !pinWrap || !textBlocks.length) return;

    // Pin the chef section
    trackST(ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${textBlocks.length * 60}vh`,
      pin: pinWrap,
      scrub: false,
    }));

    // Reveal text blocks
    textBlocks.forEach((block, i) => {
      gsap.to(block, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power2.out',
        scrollTrigger: trackST(ScrollTrigger.create({
          trigger: section,
          start: () => `top+=${i * 60}vh top`,
          toggleActions: 'play none none none',
        })),
      });
    });
  }

  /* ============================================
     6. STORY — Sticky image crossfade + text reveals
     ============================================ */
  function animateStory() {
    const textBlocks = document.querySelectorAll('.story__text-block');
    const images = document.querySelectorAll('.story__img');
    const quoteBlock = document.querySelector('[data-story-quote]');

    if (!textBlocks.length) return;

    // Fade in text blocks
    textBlocks.forEach((block) => {
      gsap.to(block, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: trackST(ScrollTrigger.create({
          trigger: block,
          start: 'top 80%',
          toggleActions: 'play none none none',
        })),
      });
    });

    // Crossfade images based on text triggers
    if (images.length > 1 && !isMobile()) {
      const triggers = document.querySelectorAll('[data-story-trigger]');

      triggers.forEach((trigger) => {
        const idx = parseInt(trigger.getAttribute('data-story-trigger'));
        const targetImg = images[idx];
        if (!targetImg) return;

        ScrollTrigger.create({
          trigger: trigger,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => activateStoryImage(idx, images),
          onEnterBack: () => activateStoryImage(idx, images),
        });
      });
    }

    // Dramatic quote reveal
    if (quoteBlock) {
      gsap.fromTo(quoteBlock,
        { opacity: 0, x: -40, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: trackST(ScrollTrigger.create({
            trigger: quoteBlock,
            start: 'top 80%',
            toggleActions: 'play none none none',
          })),
        }
      );
    }
  }

  function activateStoryImage(activeIdx, images) {
    images.forEach((img, i) => {
      img.classList.toggle('story__img--active', i === activeIdx);
    });
  }

  /* ============================================
     7. FAQ — Staggered fade-ins
     ============================================ */
  function animateFAQ() {
    const items = document.querySelectorAll('[data-faq]');
    if (!items.length) return;

    items.forEach((item, i) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: trackST(ScrollTrigger.create({
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none none',
        })),
      });
    });
  }

  /* ============================================
     8. CTA — Fade from dark, pin, pulse
     ============================================ */
  function animateCTA() {
    const section = document.querySelector('.cta-section');
    const reveals = document.querySelectorAll('[data-cta-reveal]');

    if (!section || !reveals.length) return;

    // Pin briefly
    trackST(ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=50vh',
      pin: true,
      scrub: false,
    }));

    // Staggered reveal
    gsap.to(reveals, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: trackST(ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none none',
      })),
    });
  }

  /* ============================================
     SMOOTH ANCHOR SCROLL (via Lenis)
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target && lenis) {
        lenis.scrollTo(target, { offset: 0, duration: 1.2 });
      }
    });
  });

})();
