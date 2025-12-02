
(() => {
  'use strict';

  // -------------------------
  // Utils
  // -------------------------
  const $doc = $(document);
  const $win = $(window);

  const isMobile = () => window.matchMedia('(max-width: 720px)').matches;

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

    const sec03El = document.querySelector('.section3');
    if (sec03El) {
      let sec03Inited = false;
      const initSec03 = () => {
        if (sec03Inited) return;
        const sec03El = document.querySelector('.swiperSec03');
        if (!sec03El) return;
        sec03Inited = true;
        const swiperInstance = new Swiper(sec03El, {
          loop: false,
          effect: 'fade',
          fadeEffect: {
            crossFade: true // 페이드 전환 시 부드러운 크로스페이드 효과
          },
          slidesPerView: 1,
          spaceBetween: 0, // fade 효과를 위해서는 0이어야 함
          speed: 1000,
          autoHeight: false,
          autoplay: { delay: 5000 },
          navigation: {
            nextEl: '.swiperSec03-next',
            prevEl: '.swiperSec03-prev',
          },
          on: {
            init: function () {
              const currentEl = sec03El.querySelector('.swiperSec03-current');
              const totalEl = sec03El.querySelector('.swiperSec03-total');
              if (currentEl) currentEl.textContent = this.activeIndex + 1;
              if (totalEl) totalEl.textContent = this.slides.length;
            },
            slideChange: function () {
              const currentEl = sec03El.querySelector('.swiperSec03-current');
              if (currentEl) currentEl.textContent = this.activeIndex + 1;
            }
          }
        });
      };

      if ('IntersectionObserver' in window) {
        const observer03 = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              initSec03();
              obs.disconnect();
            }
          });
        }, { root: null, threshold: 0.2 });
        observer03.observe(sec03El);
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


    const sec07El = document.querySelector('.section7');
    if (sec07El) {
      let sec07Inited = false;
      const initSec07 = () => {
        if (sec07Inited) return;
        const sec07El = document.querySelector('.swiperSec07');
        if (!sec07El) return;
        sec07Inited = true;

        const totalSlides = 11;
        let thumbnailStartIndex = 0; // 썸네일 시작 인덱스

        // 썸네일 업데이트 함수
        const updateThumbnails = (startIndex, currentSlideIndex) => {
          const thumbnails = document.querySelectorAll('.section7 .thumbnail-item');
          const prevBtn = document.querySelector('.section7 .thumbnail-prev');
          const nextBtn = document.querySelector('.section7 .thumbnail-next');

          thumbnails.forEach((thumb, index) => {
            const thumbnailIndex = (startIndex + index) % totalSlides;
            const slideImg = sec07El.querySelectorAll('.swiper-slide')[thumbnailIndex]?.querySelector('img')?.src;

            if (slideImg) {
              thumb.querySelector('img').src = slideImg;
            }
            thumb.setAttribute('data-slide-index', thumbnailIndex);

            // 현재 슬라이드와 일치하는 썸네일에 active 클래스 추가
            thumb.classList.remove('active');
            if (thumbnailIndex === currentSlideIndex) {
              thumb.classList.add('active');
            }
          });

          // 화살표 버튼 활성/비활성 처리
          if (prevBtn) {
            prevBtn.disabled = startIndex === 0;
          }
          if (nextBtn) {
            // 마지막 그룹 체크 (11개 슬라이드, 4개씩 보여주므로 마지막은 8부터 시작)
            nextBtn.disabled = startIndex >= 8;
          }
        };

        const swiperInstance = new Swiper(sec07El, {
          loop: true,
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 1000,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          effect: 'slide',
          grabCursor: true,
          on: {
            slideChange: function () {
              // 현재 슬라이드 인덱스 가져오기 (loop 모드에서는 realIndex 사용)
              const realIndex = this.realIndex;

              // 현재 슬라이드가 썸네일 범위에 없으면 썸네일 시작 인덱스 조정
              if (realIndex < thumbnailStartIndex || realIndex >= thumbnailStartIndex + 4) {
                // 현재 슬라이드를 중심으로 썸네일 그룹 조정
                thumbnailStartIndex = Math.max(0, Math.min(realIndex - 1, totalSlides - 4));
              }

              updateThumbnails(thumbnailStartIndex, realIndex);
            }
          }
        });

        // 썸네일 클릭 이벤트
        const thumbnails = document.querySelectorAll('.section7 .thumbnail-item');
        thumbnails.forEach((thumb) => {
          thumb.addEventListener('click', function () {
            const slideIndex = parseInt(this.getAttribute('data-slide-index'));
            swiperInstance.slideToLoop(slideIndex);
          });
        });

        // 썸네일 화살표 클릭 이벤트
        const prevBtn = document.querySelector('.section7 .thumbnail-prev');
        const nextBtn = document.querySelector('.section7 .thumbnail-next');

        if (prevBtn) {
          prevBtn.addEventListener('click', function () {
            if (thumbnailStartIndex > 0) {
              thumbnailStartIndex = Math.max(0, thumbnailStartIndex - 4);
              const currentIndex = swiperInstance.realIndex;
              updateThumbnails(thumbnailStartIndex, currentIndex);
            }
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', function () {
            if (thumbnailStartIndex < totalSlides - 4) {
              thumbnailStartIndex = Math.min(totalSlides - 4, thumbnailStartIndex + 4);
              const currentIndex = swiperInstance.realIndex;
              updateThumbnails(thumbnailStartIndex, currentIndex);
            }
          });
        }

        // 초기 썸네일 업데이트
        updateThumbnails(thumbnailStartIndex, 0);
      };

      if ('IntersectionObserver' in window) {
        const observer07 = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              initSec07();
              obs.disconnect();
            }
          });
        }, { root: null, threshold: 0.2 });
        observer07.observe(sec07El);
      } else {
        const onScrollCheck07 = withRaf(() => {
          const rect = sec07El.getBoundingClientRect();
          const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          if (inView) {
            initSec07();
            window.removeEventListener('scroll', onScrollCheck07);
          }
        });
        window.addEventListener('scroll', onScrollCheck07, { passive: true });
        onScrollCheck07();
      }
    }


    const sec08El = document.querySelector('.section8');
    if (sec08El) {
      let sec08Inited = false;
      const initSec08 = () => {
        if (sec08Inited) return;
        const sec08El = document.querySelector('.swiperSec08');
        if (!sec08El) return;
        sec08Inited = true;

        const wrapper = sec08El.querySelector('.swiper-wrapper');
        if (wrapper) {
          // 기존 슬라이드 복제하여 무한 루프 효과 강화
          const originalSlides = wrapper.querySelectorAll('.swiper-slide');
          const slideCount = originalSlides.length;

          // 충분한 슬라이드 복제 (무한 루프를 자연스럽게 하기 위해)
          if (slideCount <= 18) {
            const cloneCount = Math.max(4, Math.ceil(window.innerWidth / 300)); // 화면 크기에 따라 복제 개수 조정
            for (let i = 0; i < cloneCount; i++) {
              originalSlides.forEach((slide) => {
                const clone = slide.cloneNode(true);
                wrapper.appendChild(clone);
              });
            }
          }
        }

        // marquee 스타일 흐름 (자연스러운 무한 루프)
        new Swiper(sec08El, {
          loop: true,
          slidesPerView: 'auto',
          spaceBetween: 46,
          allowTouchMove: false,
          speed: 6000, // 속도 조정 (더 자연스럽게)
          freeMode: {
            enabled: false,
            momentum: false,
          },
          autoplay: {
            delay: 0,
            disableOnInteraction: false,
          },
          watchSlidesProgress: true,
          preloadImages: true,
          loopAdditionalSlides: 6, // 루프를 위한 추가 슬라이드 수 증가
        });
      };

      if ('IntersectionObserver' in window) {
        const observer08 = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              obs.disconnect();
              // 섹션 도달 후 0.5초 후에 슬라이드 시작
              setTimeout(() => {
                initSec08();
              }, 500);
            }
          });
        }, { root: null, threshold: 0.2 });
        observer08.observe(sec08El);
      } else {
        const onScrollCheck08 = withRaf(() => {
          const rect = sec08El.getBoundingClientRect();
          const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          if (inView) {
            window.removeEventListener('scroll', onScrollCheck08);
            // 섹션 도달 후 0.5초 후에 슬라이드 시작
            setTimeout(() => {
              initSec08();
            }, 500);
          }
        });
        window.addEventListener('scroll', onScrollCheck08, { passive: true });
        onScrollCheck08();
      }
    }






    const sec10ElPC = document.querySelector('.swiperSec10-pc');
    if (sec10ElPC) {
      new Swiper(sec10ElPC, {
        slidesPerView: 'auto',
        loop: true,
        slidesPerGroup: 1,
        spaceBetween: 22,
        centeredSlides: true,
        navigation: {
          nextEl: '#sec10-slide-btn-next',
          prevEl: '#sec10-slide-btn-prev'
        },
      });
    }
    const sec10ElMO = document.querySelector('.swiperSec10-mo');
    if (sec10ElMO) {
      new Swiper(sec10ElMO, {
        slidesPerView: 'auto',
        loop: true,
        slidesPerGroup: 1,
        spaceBetween: 22,
        centeredSlides: true,
        pagination: {
          el: '#sec10-slide-pagination',
          clickable: true
        },
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
  // Typing Animation
  // -------------------------
  const initTypingAnimation = () => {
    const typingEl = document.querySelector('.typing');
    if (!typingEl) return;

    const text = typingEl.getAttribute('data-text') || '';
    if (!text) return;

    typingEl.textContent = '';
    let index = 0;

    const typeChar = () => {
      if (index < text.length) {
        typingEl.textContent += text.charAt(index);
        index++;
        setTimeout(typeChar, 100); // 각 글자마다 100ms 간격
      }
    };

    // 페이지가 완전히 로드된 후 IntersectionObserver로 화면에 보일 때 시작
    const startAnimation = () => {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              typeChar();
              observer.disconnect();
            }
          });
        }, { threshold: 0.5 });
        observer.observe(typingEl);
      } else {
        // 폴백: 바로 시작
        setTimeout(typeChar, 500);
      }
    };

    // 페이지가 완전히 로드된 후 0.5초 후 시작
    if (document.readyState === 'complete') {
      setTimeout(startAnimation, 500);
    } else {
      window.addEventListener('load', () => {
        setTimeout(startAnimation, 500);
      });
    }
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
    initTypingAnimation();



    // 약간의 지연 후 이미지 스위치(초기 렌더 보정)
    setTimeout(switchImages, 300);

    // 리사이즈 시 이미지 스위치
    const handleResize = withRaf(() => {
      switchImages();
    });
    window.addEventListener('resize', handleResize, { passive: true });

    // FAQ 탭 전환
    $('.faq-tabs .faq-tab').on('click', function (e) {
      e.preventDefault();

      const $clickedTab = $(this);
      const panelId = $clickedTab.attr('aria-controls');

      if (!panelId) {
        return;
      }

      const $targetPanel = $(`#${panelId}`);
      const $activePanel = $('.faq-panels .faq-panel.active');

      if ($clickedTab.hasClass('active')) {
        return;
      }

      // 모든 탭에서 active 제거 및 aria 속성 업데이트
      $('.faq-tabs .faq-tab').removeClass('active').attr('aria-selected', 'false').attr('tabindex', '-1');

      // 클릭한 탭 활성화
      $clickedTab.addClass('active').attr('aria-selected', 'true').removeAttr('tabindex');

      // 패널 전환
      $activePanel.removeClass('active');
      $targetPanel.addClass('active');
    });

    // FAQ 아코디언
    $(document).on('click', '.faq-list li .question', function (e) {
      e.preventDefault();

      const $button = $(this);
      const $currentLi = $button.closest('li');
      const $currentAnswer = $currentLi.find('.answer');

      const isExpanded = $button.attr('aria-expanded') === 'true';
      const nextExpanded = !isExpanded;

      const $faqList = $currentLi.closest('.faq-list');
      $faqList.find('li').each(function () {
        const $li = $(this);
        const $questionBtn = $li.find('.question');
        const $answerDiv = $li.find('.answer');
        $questionBtn.attr('aria-expanded', 'false');
        $li.removeClass('active');
        $answerDiv.attr('aria-hidden', 'true');
        $answerDiv.stop(true, true).slideUp(300);
      });

      if (nextExpanded) {
        $button.attr('aria-expanded', 'true');
        $currentLi.addClass('active');
        $currentAnswer.attr('aria-hidden', 'false');
        $currentAnswer.stop(true, true).slideDown(300);
      }
    });

    // Scrolldown 버튼 클릭 시 다음 섹션으로 부드럽게 이동
    $('#sec01-cta02').on('click', function (e) {
      e.preventDefault();
      downDevent();
    });

    let isScrollingAnimation = false; // 애니메이션 진행 중 여부

    function downDevent(appInnerEl) {
      const targetSection = document.querySelector('#section2');
      if (!targetSection || isScrollingAnimation) return; // 이미 애니메이션 진행 중이면 리턴

      const targetOffsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetOffsetTop - startPosition;
      const duration = 1500; // 애니메이션 지속 시간 (밀리초)
      let startTime = null;

      // 애니메이션 시작 - 스크롤 차단
      isScrollingAnimation = true;

      // 스크롤 차단 이벤트 핸들러
      const preventScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };

      // 키보드 스크롤 차단 핸들러 (방향키, 스페이스바, Page Up/Down 등)
      const preventKeyScroll = (e) => {
        const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // 스페이스, Page Up/Down, Home, End, 방향키
        if (scrollKeys.includes(e.keyCode)) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      // 스크롤 차단 이벤트 리스너 등록 (overflow: hidden 없이 - sticky 동작 유지)
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', preventKeyScroll, { passive: false });

      const easeInOutCubic = (t) => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          // 애니메이션 완료 - 스크롤 차단 해제
          isScrollingAnimation = false;
          window.removeEventListener('wheel', preventScroll);
          window.removeEventListener('touchmove', preventScroll);
          window.removeEventListener('keydown', preventKeyScroll);

          // .app-inner scrollTop을 0으로 초기화
          if (appInnerEl) {
            appInnerEl.scrollTop = 0;
          }
        }
      };

      requestAnimationFrame(animateScroll);
    }

    // section6 도달 시 floating-button에 bear 클래스 추가
    const section6El = document.querySelector('.section6');
    const floatingButtonEl = document.querySelector('.floating-button');

    if (section6El && floatingButtonEl && 'IntersectionObserver' in window) {
      const observerSection6 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // section6가 보이거나 이미 지나갔으면 bear 클래스 추가
          // section6가 아직 도달하지 않았으면 bear 클래스 제거
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            floatingButtonEl.classList.add('bear');
          } else {
            floatingButtonEl.classList.remove('bear');
          }
        });
      }, {
        threshold: 0.1 // section6이 10% 이상 보이면 트리거
      });

      observerSection6.observe(section6El);
    }

    // 모바일에서 section2부터 floating-button 보이기
    const section2El = document.querySelector('.section2');
    const section3El = document.querySelector('.section3');
    const section4El = document.querySelector('.section4');

    if (section2El && floatingButtonEl && 'IntersectionObserver' in window) {
      let isSection3Visible = false;

      // section3 observer: section3이 보이면 show 클래스 제거
      if (section3El) {
        const observerSection3 = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              isSection3Visible = true;
              floatingButtonEl.classList.remove('show');
            } else {
              isSection3Visible = false;
              // section3을 벗어났을 때 section2가 화면에 보이거나 이미 지나갔으면 show 클래스 추가
              if (section2El) {
                const section2Rect = section2El.getBoundingClientRect();
                // section2가 화면에 보이거나 이미 지나갔으면
                if (section2Rect.top < window.innerHeight && section2Rect.bottom > 0 || section2Rect.top < 0) {
                  floatingButtonEl.classList.add('show');
                }
              }
            }
          });
        }, {
          threshold: 0.1
        });
        observerSection3.observe(section3El);
      }

      // section4 observer: section4에 도달하면 show 클래스 추가
      if (section4El) {
        const observerSection4 = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
              floatingButtonEl.classList.add('show');
            }
          });
        }, {
          threshold: 0.1
        });
        observerSection4.observe(section4El);
      }

      const observerSection2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // section3이 보이면 show 클래스 제거하고 리턴
          if (isSection3Visible) {
            floatingButtonEl.classList.remove('show');
            return;
          }

          // section2가 보이거나 이미 지나갔으면 show 클래스 추가
          // section2가 아직 도달하지 않았으면 show 클래스 제거
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            floatingButtonEl.classList.add('show');
          } else {
            floatingButtonEl.classList.remove('show');
          }
        });
      }, {
        threshold: 0.1
      });

      observerSection2.observe(section2El);
    }



    const section1El = document.querySelector('.section1');




    // 모바일에서 .app-inner 스크롤이 맨 하단에 도달하면 section2로 부드럽게 스크롤 애니메이션 실행
    if (section1El && isMobile()) {
      const appInnerEl = section1El.querySelector('.app-inner');

      if (appInnerEl) {
        let lastAnimationTime = 0; // 마지막 애니메이션 실행 시간
        const ANIMATION_COOLDOWN = 2000; // 2초 쿨타임 (중복 실행 방지)

        const checkAppInnerScroll = () => {
          const scrollTop = appInnerEl.scrollTop;
          const scrollHeight = appInnerEl.scrollHeight;
          const clientHeight = appInnerEl.clientHeight;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
          const now = Date.now();

          // 스크롤이 하단에 도달했을 때 애니메이션 실행 (쿨타임 고려)
          if (isAtBottom && (now - lastAnimationTime) > ANIMATION_COOLDOWN) {
            lastAnimationTime = now;
            downDevent(appInnerEl);
          }
        };

        // 스크롤 이벤트 리스너 등록
        appInnerEl.addEventListener('scroll', withRaf(checkAppInnerScroll), { passive: true });

        // 초기 체크 (컨텐츠가 이미 스크롤 불필요한 경우)
        checkAppInnerScroll();
      }
    }

  });
})();

