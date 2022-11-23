export default class Alert {
  constructor({
    container = null,
    body = null,
    trigger = null,
    animation = null,
    focusLock = null,
  } = {}) {
    this._container = document.querySelector(container);
    this._trigger = trigger ? document.querySelector(trigger) : null;
    this._body = body;

    this._animation = animation;
    this._focusLock = focusLock;

    this.init();
  }

  _isOpen = false;

  isOpen() {
    return this._isOpen;
  }

  init() {
    this._throwsError();

    this._addsEventListenersTrigger();

    this._closesWindowOnClickOutside();

    this.close();
  }

  _throwsError() {
    if (!this._body) {
      throw new Error('Field body is required');
    }
  }

  _addsEventListenersTrigger() {
    if (!this._trigger) return;

    this._trigger.addEventListener('pointerup', () => {
      this.toggle();
    });

    this._trigger.addEventListener('keydown', (e) => {
      if (e.code !== 'Enter') return;

      this.toggle();
    });
  }

  toggle() {
    if (!this.isOpen()) {
      this.open();

      return;
    }

    this.close();
  }

  close() {
    this._isOpen = false;

    this._setsStyleHiding();

    this._switchesExpandedTrigger();

    this._changesTextForA11yAtTrigger();

    this._changesClassActiviteAtWindow();

    this._unblocksFocus();

    this._removesScrollPadding(document.body);

    this._removesScrollPadding(this._container);

    this._switchesBlockScroll();
  }

  _setsStyleHiding() {
    if (this._animation) {
      this._animation.setStyleHiding(this._container);

      return;
    }

    this._container.style.visibility = 'hidden';
    this._container.style.opacity = 0;
  }

  _changesTextForA11yAtTrigger() {
    if (!this._trigger) return;

    if (this._isOpen) {
      this._trigger.setAttribute('aria-label', 'Закрыть бургер меню');

      return;
    }

    this._trigger.setAttribute('aria-label', 'Открыть бургер меню');
  }

  _switchesExpandedTrigger() {
    if (!this._trigger) return;

    if (this._isOpen) {
      this._trigger.setAttribute('aria-expanded', true);

      return;
    }

    this._trigger.setAttribute('aria-expanded', false);
  }

  _changesClassActiviteAtWindow() {
    if (this._isOpen) {
      this._container.classList.add('active');

      return;
    }

    this._container.classList.remove('active');
  }

  _unblocksFocus() {
    if (!this._focusLock) return;

    this._focusLock.unblocksFocus();
  }

  _switchesBlockScroll() {
    if (this.isOpen()) {
      document.body.classList.add('overflow-hidden');

      return;
    }

    document.body.classList.remove('overflow-hidden');
  }

  _removesScrollPadding(element) {
    // eslint-disable-next-line no-param-reassign
    element.style.paddingRight = 0;
  }

  open() {
    this._isOpen = true;

    this._addsPaddingInsteadOfScroll(document.body);

    this._addsPaddingInsteadOfScroll(this._container);

    this._setsStyleVisibility();

    this._switchesBlockScroll();

    this._switchesExpandedTrigger();

    this._changesTextForA11yAtTrigger();

    this._changesClassActiviteAtWindow();

    this._blocksFocus();
  }

  _addsPaddingInsteadOfScroll(element) {
    const padding = `${window.innerWidth - document.body.offsetWidth}px`;

    // eslint-disable-next-line no-param-reassign
    element.style.paddingRight = padding;
  }

  _setsStyleVisibility() {
    if (this._animation) {
      this._animation.setStyleVisibility(this._container);

      return;
    }

    this._container.style.visibility = 'visible';
    this._container.style.opacity = 1;
  }

  _blocksFocus() {
    if (!this._focusLock) return;

    this._focusLock.blocksFocus();
  }

  _closesWindowOnClickOutside() {
    this._container.addEventListener('pointerdown', (e) => {
      if (e.target.closest(this._body)) return;

      this.close();
    });
  }
}
