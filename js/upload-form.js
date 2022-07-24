import { isEscKey } from './util.js';
import { resetScaleValue } from './photo-scale.js';
import { resetEffects } from './photo-effects.js';
import { showPhotoPreview, fileChooser } from './photo-preview.js';

const body = document.querySelector('body');
const uploadPhotoForm = document.querySelector('#upload-select-image');
const photoEditContainer = document.querySelector('.img-upload__overlay');
const cancelPhotoButton = photoEditContainer.querySelector('#upload-cancel');
const inputComment = uploadPhotoForm.querySelector('.text__description');
const inputHashtag = uploadPhotoForm.querySelector('.text__hashtags');

// закрытие формы редактирования изображения
const onPhotoEditContainerEscKeydown = (evt) => {
  if (isEscKey(evt) && !body.contains(document.querySelector('.error'))) {
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

const onFileChooserChange = () => {
  photoEditContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEditContainerEscKeydown);
  resetScaleValue();
  resetEffects();
  showPhotoPreview();
};

fileChooser.addEventListener('change', onFileChooserChange);

const onFocusInputEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.stopPropagation();
  }
};

inputHashtag.addEventListener('keydown', onFocusInputEscKeydown);
inputComment.addEventListener('keydown', onFocusInputEscKeydown);

export { cancelPhotoEditContainer, uploadPhotoForm, inputHashtag };
