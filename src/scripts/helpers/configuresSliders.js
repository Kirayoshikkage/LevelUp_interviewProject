import Swiper, {
  Navigation, A11y, Keyboard,
} from 'swiper';

const reviewsSlider = function () {
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
  });
};

export { reviewsSlider };
