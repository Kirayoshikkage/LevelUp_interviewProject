import Swiper, { Navigation, A11y, Keyboard } from 'swiper';

function blocksHiddenElementsFromScreenreader(swiper, selectorContent) {
  const { slides, activeIndex } = swiper;
  let activeSlide = slides[activeIndex];

  slides.forEach((slide) => {
    if (slide === activeSlide) return;

    slide.querySelector(selectorContent).setAttribute('aria-hidden', true);
  });

  swiper.on('slideChange', () => {
    const newActiveSlide = slides[swiper.activeIndex];

    activeSlide
      .querySelector(selectorContent)
      .setAttribute('aria-hidden', true);

    activeSlide = newActiveSlide;

    activeSlide
      .querySelector(selectorContent)
      .setAttribute('aria-hidden', false);
  });
}

export default function reviewsSlider() {
  const slider = '.reviews .swiper';
  const buttonNext = '.reviews .swiper-button-next';
  const buttonPrev = '.reviews .swiper-button-prev';
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
    a11y: {
      firstSlideMessage: 'Это первый слайд',
      lastSlideMessage: 'Это последний слайд',
      nextSlideMessage: 'Следующий слайд',
      prevSlideMessage: 'Предыдущий слайд',
    },
  });

  blocksHiddenElementsFromScreenreader(swiper, '.review');
}
