import { isEscKey } from './util.js';
import { resetScaleValue } from './photo-scale.js';
import { resetEffects } from './photo-effects.js';
import { isValidForm } from './validation.js';
import { sendData } from './api.js';

const body = document.querySelector('body');
const uploadPhotoForm = document.querySelector('#upload-select-image');
const uploadPhotoFile = document.querySelector('#upload-file');
const photoEditContainer = document.querySelector('.img-upload__overlay');
const cancelPhotoButton = photoEditContainer.querySelector('#upload-cancel');
const inputComment = uploadPhotoForm.querySelector('.text__description');
const inputHashtag = uploadPhotoForm.querySelector('.text__hashtags');
const successContainer = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButton = successContainer.querySelector('.success__button');
const errorContainer = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorContainer.querySelector('.error__button');
const submitButton = document.querySelector('#upload-submit');

// закрытие формы редактирования изображения
const onPhotoEditContainerEscKeydown = (evt) => {
  if (isEscKey(evt) && !body.contains(errorContainer)) {
    evt.preventDefault();
    cancelPhotoEditContainer();
  }
};

function cancelPhotoEditContainer() {
  photoEditContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEditContainerEscKeydown);
  uploadPhotoForm.reset();
}
cancelPhotoButton.addEventListener('click', () => cancelPhotoEditContainer());

// предотвращение закрытия формы при фокусе на полях ввода
const onFocusInputEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.stopPropagation();
  }
};
inputHashtag.addEventListener('keydown', onFocusInputEscKeydown);
inputComment.addEventListener('keydown', onFocusInputEscKeydown);

// открытие формы редактирования изображения
const onUploadFileChange = () => {
  photoEditContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEditContainerEscKeydown);
  resetScaleValue();
  resetEffects();
};
uploadPhotoFile.addEventListener('change', onUploadFileChange);


// блокировка кнопки отправки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

// разблокировка кнопки отправки
const unblockSubmitButton = () => {
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

const onDocumentExceptSuccessContainerClick = (evt) => {
  if (evt.target === successContainer) {
    cancelSuccessMessage();
  }
};

successButton.addEventListener('click', () => cancelSuccessMessage());

// функция закрытия окна об успешной отправке
function cancelSuccessMessage() {
  successContainer.remove();
  document.removeEventListener('keydown', onSuccessContainerEscKeydown);
  document.removeEventListener('click', onDocumentExceptSuccessContainerClick);
}

// открытие окна об успешной отправке
const showSuccessMessage = () => {
  body.append(successContainer);
  document.addEventListener('keydown', onSuccessContainerEscKeydown);
  document.addEventListener('click', onDocumentExceptSuccessContainerClick);
};


// обработчики закрытия окна об ошибке при отправке формы
const onErrorContainerEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    cancelErrorMessage();
  }
};

const onDocumentExceptErrorContainerClick = (evt) => {
  if (evt.target === errorContainer) {
    cancelErrorMessage();
  }
};

errorButton.addEventListener('click', () => cancelErrorMessage());

// закрытие окна об ошибке
function cancelErrorMessage() {
  errorContainer.remove();
  document.removeEventListener('keydown', onErrorContainerEscKeydown);
  document.removeEventListener('click', onDocumentExceptErrorContainerClick);
}

// открытие окна при ошибке
const showErrorMessage = () => {
  body.append(errorContainer);
  document.addEventListener('keydown', onErrorContainerEscKeydown);
  document.addEventListener('click', onDocumentExceptErrorContainerClick);
};

const onSuccessSendForm = () => {
  cancelPhotoEditContainer();
  showSuccessMessage();
  unblockSubmitButton();
};

const onFailSendForm = () => {
  showErrorMessage();
  unblockSubmitButton();
};

const setUploadFormSubmit = () => {
  uploadPhotoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (isValidForm()) {
      blockSubmitButton();
      sendData(onSuccessSendForm, onFailSendForm, new FormData(evt.target));
    }
  });
};

export { setUploadFormSubmit };
