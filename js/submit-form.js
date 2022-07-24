import { isEscKey } from './util.js';
import { isValidForm } from './validation.js';
import { sendData } from './api.js';
import { cancelPhotoEditContainer, uploadPhotoForm } from './upload-form.js';

const body = document.querySelector('body');
const successContainer = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButton = successContainer.querySelector('.success__button');
const errorContainer = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorContainer.querySelector('.error__button');
const submitButton = document.querySelector('#upload-submit');

// блокировка кнопки отправки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

// разблокировка кнопки отправки
const unlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// обработчики закрытия окна об успешной отправке
const onSuccessContainerEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    cancelSuccessMessage();
  }
};

const onOutSuccessContainerClick = (evt) => {
  if (evt.target === successContainer) {
    cancelSuccessMessage();
  }
};

successButton.addEventListener('click', () => cancelSuccessMessage());

// функция закрытия окна об успешной отправке
function cancelSuccessMessage() {
  successContainer.remove();
  document.removeEventListener('keydown', onSuccessContainerEscKeydown);
  document.removeEventListener('click', onOutSuccessContainerClick);
}

// открытие окна об успешной отправке
const showSuccessMessage = () => {
  body.append(successContainer);
  document.addEventListener('keydown', onSuccessContainerEscKeydown);
  document.addEventListener('click', onOutSuccessContainerClick);
};


// обработчики закрытия окна об ошибке при отправке формы
const onErrorContainerEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    cancelErrorMessage();
  }
};

const onOutErrorContainerClick = (evt) => {
  if (evt.target === errorContainer) {
    cancelErrorMessage();
  }
};

errorButton.addEventListener('click', () => cancelErrorMessage());

// закрытие окна об ошибке
function cancelErrorMessage() {
  errorContainer.remove();
  document.removeEventListener('keydown', onErrorContainerEscKeydown);
  document.removeEventListener('click', onOutErrorContainerClick);
}

// открытие окна при ошибке
const showErrorMessage = () => {
  body.append(errorContainer);
  document.addEventListener('keydown', onErrorContainerEscKeydown);
  document.addEventListener('click', onOutErrorContainerClick);
};

const setUploadFormSubmit = () => {
  uploadPhotoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (isValidForm()) {
      blockSubmitButton();
      sendData(() => {
        cancelPhotoEditContainer();
        showSuccessMessage();
        unlockSubmitButton();
      },
      () => {
        showErrorMessage();
        unlockSubmitButton();
      },
      new FormData(evt.target));
    }
  });
};

export { setUploadFormSubmit };
