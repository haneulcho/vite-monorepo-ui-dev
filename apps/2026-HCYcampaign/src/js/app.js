
(() => {
  'use strict';

  // -------------------------
  // Utils
  // -------------------------
  const $doc = $(document);
  const $win = $(window);

  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  // rAF 기반 스로틀
  const withRaf = (fn) => {
    let ticking = false;
    return (...args) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          fn(...args);
          ticking = false;
        });
        ticking = true;
      }
    };
  };

  // -------------------------
  // Swiper
  // -------------------------
  const initSwiperSlider = () => {
    const sec07Elpc = document.querySelector('.swiperSec07pc');
    if (sec07Elpc) {
      new Swiper(sec07Elpc, {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 40,
      });
    }

    const sec07Elmo = document.querySelector('.swiperSec07mo');
    if (sec07Elmo) {
      const sec07MoSwiper = new Swiper(sec07Elmo, {
        spaceBetween: 20,
        allowTouchMove: true,
        autoplay: { delay: 2000 },
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: false,
        speed: 500,
        touchRatio: 0.2,
        resistanceRatio: 5,
      });

      sec07Elmo.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (!target.closest('.swiper-slide')) return;
        sec07MoSwiper.autoplay?.stop();
      });

      document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (target.closest('.swiperSec07mo')) return;
        sec07MoSwiper.autoplay?.start();
      });
    }
  };




  // -------------------------
  // Responsive Image Switch
  // -------------------------
  const switchImages = () => {
    $('.responsive').each(function () {
      const $img = $(this);
      const src = $img.attr('src') ?? '';
      const isMo = src.endsWith('-mo.png') || src.endsWith('-mo.jpg');

      if (window.innerWidth <= 720) {
        if (!isMo) {
          const next = src.replace('.png', '-mo.png').replace('.jpg', '-mo.jpg');
          $img.attr('src', next);
        }
      } else {
        const next = src.replace('-mo.png', '.png').replace('-mo.jpg', '.jpg');
        if (next !== src) $img.attr('src', next);
      }
    });
  };

  // -------------------------
  // Section8 Progress Animation
  // -------------------------
  const initSection8ProgressAnimation = () => {
    const chart = document.querySelector('.section8 .infographic-chart');
    if (!chart) return;

    const progressEls = [...chart.querySelectorAll('.progress-bar .progress')];
    if (!progressEls.length) return;

    progressEls.forEach((el) => {
      const targetWidth = el.style.width || '0%';
      el.dataset.targetWidth = targetWidth;
      el.style.width = '0%';
    });

    const fillProgress = () => {
      progressEls.forEach((el) => {
        el.style.width = el.dataset.targetWidth || '0%';
      });
    };

    if (!('IntersectionObserver' in window)) {
      fillProgress();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          fillProgress();
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(chart);
  };

  // -------------------------
  // Section1 Scroll Down
  // -------------------------
  const initScrollDownButton = () => {
    const scrollDownBtn = document.querySelector('.section1 .scroll-down');
    const targetSection = document.querySelector('.section2');
    if (!scrollDownBtn || !targetSection) return;

    scrollDownBtn.addEventListener('click', (event) => {
      event.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };


  // -------------------------
  // Boot
  // -------------------------
  document.addEventListener('DOMContentLoaded', () => {
    // 외부 라이브러리 안전 호출
    window.AOS?.init?.();

    // 초기 스타일
    const wrap = document.getElementById('wrap');
    if (wrap) wrap.style.overflow = 'inherit';

    // 초기화
    initSwiperSlider();
    initSection8ProgressAnimation();
    initScrollDownButton();

    // 약간의 지연 후 이미지 스위치(초기 렌더 보정)
    setTimeout(switchImages, 300);
  });
})();

