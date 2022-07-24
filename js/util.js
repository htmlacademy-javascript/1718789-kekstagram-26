const ERROR_SHOW_TIME = 3000;

const checkMaxLengthString = (string, maxLength) => string.length <= maxLength;
checkMaxLengthString('testString', 10);

const getRandomInteger = (min, max) => {
  const minNumber = Math.min(Math.abs(min), Math.abs(max));
  const maxNumber = Math.max(Math.abs(min), Math.abs(max));
  return Math.floor(minNumber + Math.random() * (maxNumber - minNumber + 1));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscKey = (evt) => evt.key === 'Escape';

const showError = () => {
  const errorSection = document.createElement('section');
  errorSection.className = 'error';
  errorSection.insertAdjacentHTML('afterbegin',
    '<div class="error__inner"><h2 class="error__title">Не удалось загрузить фотографии</h2><p>Попробуйте обновить страницу</p></div>');
  document.body.append(errorSection);
  setTimeout(() => {
    errorSection.remove();
  }, ERROR_SHOW_TIME);
};

export {getRandomArrayElement, getRandomInteger, checkMaxLengthString, isEscKey, showError};
