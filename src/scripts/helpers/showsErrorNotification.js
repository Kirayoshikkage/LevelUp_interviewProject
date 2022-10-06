import Modal from '../components/Modal.js';
import FocusLock from '../components/FocusLock.js';
import insertsErrorNotificationInHTML from './insertsErrorNotificationInHTML.js';

export default function showsErrorNotification() {
  insertsErrorNotificationInHTML();

  const focusLock = new FocusLock({
    exception: '.error-notification',
    disableOnMobileDevice: true,
  });
  focusLock.init();

  const errorNotification = new Modal({
    container: '.error-notification',
    body: 'modal__body',
    focusLock,
  });
  errorNotification.init();
  setTimeout(() => {
    errorNotification.open();
  });
}
