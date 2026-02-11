/* ============================================
   THE BURN ROOM - Main JavaScript
   A Curated Private Dining Experience
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js-enabled');
  initNavbar();
  initScrollAnimations();
  initTestimonialSlider();
  initMobileNav();
  initHeroSlideshow();
  initChefTileSlideshow();
});

/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* ---------- Mobile Navigation ---------- */
function initMobileNav() {
  const toggle = document.querySelector('.navbar__toggle');
  const links = document.querySelector('.navbar__links');
  
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  // Close menu when clicking a link
  links.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('active');
      toggle.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('active');
      toggle.classList.remove('active');
    }
  });
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

/* ---------- Testimonial Slider ---------- */
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonials__slider');
  const dots = document.querySelectorAll('.testimonials__dot');
  
  if (!slider || dots.length === 0) return;

  let currentSlide = 0;
  const totalSlides = dots.length;

  const goToSlide = (index) => {
    currentSlide = index;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  };

  // Click handlers for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Auto-advance slides
  let autoSlide = setInterval(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, 5000);

  // Pause on hover
  const wrapper = document.querySelector('.testimonials__wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => clearInterval(autoSlide));
    wrapper.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
        goToSlide((currentSlide + 1) % totalSlides);
      }, 5000);
    });
  }
}

/* ---------- Hero Slideshow ---------- */
function syncHeroMedia(slides, activeIndex) {
  slides.forEach((slide, i) => {
    const video = slide.querySelector('video');
    if (!video) return;

    if (i === activeIndex) {
      video.preload = 'metadata';
      video.play().catch(() => {});
    } else {
      video.pause();
      video.preload = 'none';
    }
  });
}

function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero__slide');
  if (!slides || slides.length < 2) return;

  let idx = 0;
  syncHeroMedia(slides, idx);

  setInterval(() => {
    slides[idx].classList.remove('is-active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('is-active');
    syncHeroMedia(slides, idx);
  }, 6500);
}

/* ---------- Chef Tile Slideshow ---------- */
function initChefTileSlideshow() {
  const slides = document.querySelectorAll('.chef__slide');
  if (!slides || slides.length < 2) return;

  let idx = 0;
  setInterval(() => {
    slides[idx].classList.remove('chef__slide--active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('chef__slide--active');
  }, 4200);
}

/* ---------- Smooth Scroll for Anchor Links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
