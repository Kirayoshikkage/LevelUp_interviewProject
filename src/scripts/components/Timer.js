export default class Timer {
  // HH:mm:ss
  constructor(container, initialTimestamp) {
    this._container = document.querySelector(container);
    this._initialTimestamp = initialTimestamp;

    this.init();
  }

  _timestamp;

  _interval;

  init() {
    this._initTimestamp();

    this._start();
  }

  _initTimestamp() {
    const formatsTimestamp = this._formatsInitialTimestamp(
      this._initialTimestamp
    );
    const validatesTimestamp =
      this._validatesInitialTimestamp(formatsTimestamp);
    const timestampInSeconds =
      this._convertsInitialTimestampInSeconds(validatesTimestamp);

    this._timestamp = timestampInSeconds;
  }

  _formatsInitialTimestamp(timestamp) {
    return timestamp.split(':').map((item) => Number(item));
  }

  _validatesInitialTimestamp(timestamp) {
    return timestamp.map((item) => (Number.isNaN(item) || item < 0 ? 0 : item));
  }

  _convertsInitialTimestampInSeconds(timestamp) {
    const [hours, minutes, seconds] = timestamp;
    const hoursConverted = hours * 60 * 60;
    const minutesConverted = minutes * 60;

    return hoursConverted + minutesConverted + seconds;
  }

  _start() {
    this._interval = setInterval(() => {
      this._displaysTimestampInContainer();

      if (!this._timestamp) {
        clearInterval(this._interval);

        return;
      }

      this._timestamp -= 1;
    }, 1000);
  }

  _displaysTimestampInContainer() {
    const { hours, minutes, seconds } = this._convertsTimestampFromSeconds(
      this._timestamp
    );
    const hoursFormatted = this._addsZeroTime(hours);
    const minutesFormatted = this._addsZeroTime(minutes);
    const secondsFormatted = this._addsZeroTime(seconds);

    this._container.textContent = `
      ${hoursFormatted} 
      :
      ${minutesFormatted} 
      :
      ${secondsFormatted}
    `;

    this._container.setAttribute(
      'aria-label',
      `
      ${hoursFormatted} 
      :
      ${minutesFormatted} 
      :
      ${secondsFormatted}
    `
    );
  }

  _convertsTimestampFromSeconds(timestamp) {
    return {
      hours: Math.floor(timestamp / 60 / 60),
      minutes: Math.floor((timestamp / 60) % 60),
      seconds: Math.floor(timestamp % 60),
    };
  }

  _addsZeroTime(time) {
    return `${time >= 10 ? time : `0${time}`}`;
  }
}
