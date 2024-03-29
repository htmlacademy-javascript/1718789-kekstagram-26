import { uploadPhotoForm, inputHashtag } from './upload-form.js';
const MAX_COUNT_HASHTAGS = 5;

const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
});

const getArrayHashtags = (value) => (value.trim().toLowerCase().split(' '));

const validateHashtags = (value) => {
  const arrayHashtags = getArrayHashtags(value);
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return value === '' || arrayHashtags.every((hashtag) => re.test(hashtag));
};

const validateUniqueHashtags = (value) => {
  const arrayHashtags = getArrayHashtags(value);
  return new Set(arrayHashtags).size === arrayHashtags.length;
};

const validateCountHashtags = (value) => {
  const arrayHashtags = getArrayHashtags(value);
  return arrayHashtags.length <= MAX_COUNT_HASHTAGS;
};

pristine.addValidator(inputHashtag, validateHashtags, 'Некорректно введен хэш-тег');
pristine.addValidator(inputHashtag, validateUniqueHashtags, 'Хэш-теги не должны повторяться');
pristine.addValidator(inputHashtag, validateCountHashtags, `Число хэш-тегов не должно превышать ${MAX_COUNT_HASHTAGS}`);

const isValidForm = () => pristine.validate();

export { isValidForm };
