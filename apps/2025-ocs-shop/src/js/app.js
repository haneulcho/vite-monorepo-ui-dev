
(() => {
  'use strict';

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

    const sec01El = document.querySelector('.section1');
    if (sec01El) {
      let sec01Inited = false;
      const swiperEl = sec01El.querySelector('.swiperSec01');

      const initSec01 = () => {
        if (sec01Inited || !swiperEl) return;
        sec01Inited = true;

        const totalSlides = swiperEl.querySelectorAll('.swiper-wrapper > .swiper-slide').length;

        new Swiper(swiperEl, {
          loop: true,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 1000,
          autoplay: { delay: 3000 },
          navigation: {
            nextEl: '.swiperSec01-next',
            prevEl: '.swiperSec01-prev',
          },
          on: {
            init: function () {
              const currentEl = sec01El.querySelector('.swiperSec01-current');
              const totalEl = sec01El.querySelector('.swiperSec01-total');
              if (currentEl) currentEl.textContent = this.realIndex + 1;
              if (totalEl) totalEl.textContent = totalSlides;
            },
            slideChange: function () {
              const currentEl = sec01El.querySelector('.swiperSec01-current');
              if (currentEl) currentEl.textContent = this.realIndex + 1;
            }
          }
        });
      };

      if ('IntersectionObserver' in window) {
        const observer01 = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              initSec01();
              obs.disconnect();
            }
          });
        }, { root: null, threshold: 0.2 });
        observer01.observe(sec01El);
      } else {
        const onScrollCheck01 = withRaf(() => {
          const rect = sec01El.getBoundingClientRect();
          const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          if (inView) {
            initSec01();
            window.removeEventListener('scroll', onScrollCheck01);
          }
        });
        window.addEventListener('scroll', onScrollCheck01, { passive: true });
        onScrollCheck01();
      }
    }

    // 모바일용 section1 슬라이드
    const sec01MoEl = document.querySelector('.section1');
    if (sec01MoEl) {
      let sec01MoInited = false;
      const swiperMoEl = sec01MoEl.querySelector('.swiperSec01-mo');
      if (sec01MoInited || !swiperMoEl) return;
      sec01MoInited = true;



      new Swiper(swiperMoEl, {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        speed: 500,
        autoplay: { delay: 3000 },

      });


    }

    const sec02El = document.querySelector('.section2');
    if (sec02El) {
      let sec02Inited = false;
      const swiperEl = sec02El.querySelector('.swiperSec02');

      const initSec02 = () => {
        if (sec02Inited || !swiperEl) return;
        sec02Inited = true;

        const swiperInstance = new Swiper(swiperEl, {
          loop: true,
          slidesPerView: 'auto',
          spaceBetween: 0,
          speed: 5000,
          autoplay: {
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          },
          allowTouchMove: false,
          loopAdditionalSlides: 10,
          breakpoints: {
            720: {
              slidesPerView: 5,
            },
            0: {
              slidesPerView: 'auto',
            }
          }
        });

        // autoplay 명시적으로 시작
        if (swiperInstance.autoplay) {
          swiperInstance.autoplay.start();
        }
      };

      if ('IntersectionObserver' in window) {
        const observer02 = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              initSec02();
              obs.disconnect();
            }
          });
        }, { root: null, threshold: 0.2 });
        observer02.observe(sec02El);
      } else {
        const onScrollCheck02 = withRaf(() => {
          const rect = sec02El.getBoundingClientRect();
          const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          if (inView) {
            initSec02();
            window.removeEventListener('scroll', onScrollCheck02);
          }
        });
        window.addEventListener('scroll', onScrollCheck02, { passive: true });
        onScrollCheck02();
      }
    }

    const sec03El = document.querySelector('.section3');
    if (sec03El) {
      let sec03Inited = false;
      const swiperEl = sec03El.querySelector('.swiperSec03');

      const initSec03 = () => {
        if (sec03Inited || !swiperEl) return;
        sec03Inited = true;

        const totalSlides = swiperEl.querySelectorAll('.swiper-wrapper > .swiper-slide').length;

        new Swiper(swiperEl, {
          loop: true,
          slidesPerView: 'auto',
          spaceBetween: 20,
          speed: 300,
          autoplay: { delay: 3000 },
          navigation: {
            nextEl: '.swiperSec03-next',
            prevEl: '.swiperSec03-prev',
          },

          on: {
            init: function () {
              const currentEl = sec03El.querySelector('.swiperSec03-current');
              const totalEl = sec03El.querySelector('.swiperSec03-total');
              if (currentEl) currentEl.textContent = this.realIndex + 1;
              if (totalEl) totalEl.textContent = totalSlides;
            },
            slideChange: function () {
              const currentEl = sec03El.querySelector('.swiperSec03-current');
              if (currentEl) currentEl.textContent = this.realIndex + 1;
            }
          },
          breakpoints: {
            720: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            0: {
              slidesPerView: 'auto',
              spaceBetween: 20,
            }
          }
        });
      };

      if ('IntersectionObserver' in window) {
        const observer01 = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              initSec03();
              obs.disconnect();
            }
          });
        }, { root: null, threshold: 0.2 });
        observer01.observe(sec03El);
      } else {
        const onScrollCheck03 = withRaf(() => {
          const rect = sec03El.getBoundingClientRect();
          const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          if (inView) {
            initSec03();
            window.removeEventListener('scroll', onScrollCheck03);
          }
        });
        window.addEventListener('scroll', onScrollCheck03, { passive: true });
        onScrollCheck03();
      }
    }

    const sec05El = document.querySelector('.section5');
    if (sec05El) {
      let sec05Inited = false;
      const swiperEl = sec05El.querySelector('.swiperSec05');

      const initSec05 = () => {
        if (sec05Inited || !swiperEl) return;
        sec05Inited = true;

        const totalSlides = swiperEl.querySelectorAll('.swiper-wrapper > .swiper-slide').length;

        new Swiper(swiperEl, {
          loop: true,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 1000,
          autoplay: { delay: 3000 },
          navigation: {
            nextEl: '.swiperSec05-next',
            prevEl: '.swiperSec05-prev',
          },
          on: {
            init: function () {
              const currentEl = sec05El.querySelector('.swiperSec05-current');
              const totalEl = sec05El.querySelector('.swiperSec05-total');
              if (currentEl) currentEl.textContent = this.realIndex + 1;
              if (totalEl) totalEl.textContent = totalSlides;
            },
            slideChange: function () {
              const currentEl = sec05El.querySelector('.swiperSec05-current');
              if (currentEl) currentEl.textContent = this.realIndex + 1;
            }
          }
        });
      };

      if ('IntersectionObserver' in window) {
        const observer05 = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              initSec05();
              obs.disconnect();
            }
          });
        }, { root: null, threshold: 0.2 });
        observer05.observe(sec05El);
      } else {
        const onScrollCheck05 = withRaf(() => {
          const rect = sec05El.getBoundingClientRect();
          const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          if (inView) {
            initSec05();
            window.removeEventListener('scroll', onScrollCheck05);
          }
        });
        window.addEventListener('scroll', onScrollCheck05, { passive: true });
        onScrollCheck05();
      }
    }

    const sec06El = document.querySelector('.section6');
    if (sec06El) {
      const swiperEl = sec06El.querySelector('.swiperSec06');
      new Swiper(swiperEl, {
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 20,
        breakpoints: {
          720: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          0: {
            slidesPerView: 'auto',
            spaceBetween: 20,
          }
        }
      });
    }

    const sec07El = document.querySelector('.swiperSec07');
    if (sec07El) {
      new Swiper(sec07El, {
        direction: 'vertical',
        loop: true,
        slidesPerView: 2,
        spaceBetween: 25,
        speed: 300,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '#sec07-slide-btn-next',
          prevEl: '#sec07-slide-btn-prev',
        },
        grabCursor: true,
      });
    }

    const sec08El = document.querySelector('.swiperSec08');
    if (sec08El) {
      const totalSlides = sec08El.querySelectorAll('.swiper-wrapper > .swiper-slide').length;
      new Swiper(sec08El, {
        loop: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 1000,
        autoplay: { delay: 3000 },
        navigation: {
          nextEl: '.swiperSec08-next',
          prevEl: '.swiperSec08-prev',
        },
        on: {
          init: function () {
            const currentEl = sec08El.querySelector('.swiperSec08-current');
            const totalEl = sec08El.querySelector('.swiperSec08-total');
            if (currentEl) currentEl.textContent = this.realIndex + 1;
            if (totalEl) totalEl.textContent = totalSlides;
          },
          slideChange: function () {
            const currentEl = sec08El.querySelector('.swiperSec08-current');
            if (currentEl) currentEl.textContent = this.realIndex + 1;
          }
        }
      });
    }

    // 모바일용 section8 슬라이드
    const sec08MoEl = document.querySelector('.section8');
    if (sec08MoEl) {
      let sec08MoInited = false;
      const swiperMoEl = sec08MoEl.querySelector('.swiperSec08-mo');
      if (sec08MoInited || !swiperMoEl) return;
      sec08MoInited = true;

      new Swiper(swiperMoEl, {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        speed: 500,
        // autoplay: { delay: 3000 },
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


    // 약간의 지연 후 이미지 스위치(초기 렌더 보정)
    setTimeout(switchImages, 300);

    // 리사이즈 시 이미지 스위치
    const handleResize = withRaf(() => {
      switchImages();
    });
    window.addEventListener('resize', handleResize, { passive: true });

  });

})();

