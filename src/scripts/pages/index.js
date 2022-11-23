import _common from '../common/_common.js';
import errorHandler from '../helpers/errorHandler.js';
import getFontSizeBody from '../helpers/getFontSizeBody.js';
import BurgerMenu from '../components/BurgerMenu.js';
import reviewsSlider from '../helpers/configuresSliders.js';
import FocusLock from '../components/FocusLock.js';
import Modal from '../components/Modal.js';
import Timer from '../components/Timer.js';

errorHandler(() => {
  _common();

  const focusLock = new FocusLock({
    exception: [
      '.burger-menu',
      '.header .burger-trigger',
      '.modal-successful-sending',
    ],
    mutationObserver: true,
    disableOnMobileDevice: true,
  });

  const burgerMenu = new BurgerMenu({
    container: '.burger-menu',
    trigger: '.header .burger-trigger',
    body: '.burger-menu__body',
    breakpoints: {
      // 48rem - 768px
      [getFontSizeBody() * 48]: () => {
        if (burgerMenu.isOpen()) {
          burgerMenu.close();
        }
      },
    },
    focusLock,
  });

  reviewsSlider();

  const checkoutForm = document.querySelector('.checkout__form');
  const telInputCheckoutForm = checkoutForm.querySelector('#checkout-tel');
  const sendingStatusCheckoutForm = new Modal({
    container: '.modal-successful-sending',
    body: '.modal__body',
    focusLock,
  });
  // eslint-disable-next-line no-unused-vars
  const checkoutTimer = new Timer('.checkout__timer', '00:30:00');

  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    checkoutForm.reset();

    sendingStatusCheckoutForm.open();

    setTimeout(() => {
      if (sendingStatusCheckoutForm.isOpen()) {
        sendingStatusCheckoutForm.close();
      }
    }, 1000);
  });
  telInputCheckoutForm.addEventListener('input', () => {
    const { value } = telInputCheckoutForm;

    telInputCheckoutForm.value = value.replace(/\D/g, '');
  });
});
