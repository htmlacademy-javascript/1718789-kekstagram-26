import { isEscKey } from './util.js';

const body = document.querySelector('body');
const photoContainer = document.querySelector('.big-picture');
const cancelPhotoButton = photoContainer.querySelector('#picture-cancel');
const photoImg = photoContainer.querySelector('.big-picture__img img');
const photoLikesCount = photoContainer.querySelector('.likes-count');
const photoDescription = photoContainer.querySelector('.social__caption');
const commentCount = photoContainer.querySelector('.social__comment-count');
const commentLoader = photoContainer.querySelector('.comments-loader');
const commentContainer = photoContainer.querySelector('.social__comments');
const commentItem = photoContainer.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();

const onPhotoEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    cancelPhotoContainer();
  }
};

function cancelPhotoContainer () {
  photoContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEscKeydown);
}

cancelPhotoButton.addEventListener('click', cancelPhotoContainer);

const renderFullSizePhoto = ({ url, likes, description, comments }) => {

  photoContainer.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  body.classList.add('modal-open');

  photoImg.src = url;
  photoLikesCount.textContent = likes;
  photoDescription.textContent = description;

  comments.forEach(({ message, avatar, name }) => {
    const commentClone = commentItem.cloneNode(true);
    const commentCloneAvatar = commentClone.querySelector('img');
    commentCloneAvatar.src = avatar;
    commentCloneAvatar.alt = name;
    commentClone.querySelector('.social__text').textContent = message;
    commentFragment.append(commentClone);
  });
  commentContainer.innerHTML = '';
  commentContainer.append(commentFragment);

  document.addEventListener('keydown', onPhotoEscKeydown);
};

export { renderFullSizePhoto };
