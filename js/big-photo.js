import { isEscKey } from './util.js';

const COUNT_ADDED_COMMENTS = 5;
const body = document.querySelector('body');
const photoContainer = document.querySelector('.big-picture');
const photoImg = photoContainer.querySelector('.big-picture__img img');
const photoLikes = photoContainer.querySelector('.likes-count');
const photoDescription = photoContainer.querySelector('.social__caption');
const cancelPhotoButton = photoContainer.querySelector('#picture-cancel');
const commentsCount = photoContainer.querySelector('.social__comment-count');
const commentsLoaderButton = photoContainer.querySelector('.social__comments-loader');
const commentsContainer = photoContainer.querySelector('.social__comments');
const commentItem = photoContainer.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

const onPhotoEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    cancelPhotoContainer();
  }
};

cancelPhotoButton.addEventListener('click', () => cancelPhotoContainer());

function cancelPhotoContainer () {
  photoContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEscKeydown);
  commentsLoaderButton.onclick = null;
}

const renderComment = ({ avatar, name, message }) => {
  const cloneCommentItem = commentItem.cloneNode(true);
  const cloneCommentAvatar = cloneCommentItem.querySelector('img');
  cloneCommentAvatar.src = avatar;
  cloneCommentAvatar.alt = name;
  cloneCommentItem.querySelector('.social__text').textContent = message;
  commentsFragment.append(cloneCommentItem);
};

const renderFullSizePhoto = ({ url, likes, description, comments }) => {

  let countComments = 0;

  photoContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  photoImg.src = url;
  photoLikes.textContent = likes;
  photoDescription.textContent = description;

  const renderComments = () => {
    countComments += COUNT_ADDED_COMMENTS;
    comments.slice(0, countComments).forEach((comment) => renderComment(comment));
    commentsContainer.innerHTML = '';
    commentsContainer.append(commentsFragment);

    if (countComments < comments.length) {
      commentsLoaderButton.classList.remove('hidden');
      commentsCount.textContent = `${countComments} из ${comments.length} комментариев`;
    } else {
      commentsLoaderButton.classList.add('hidden');
      commentsCount.textContent = `${comments.length} из ${comments.length} комментариев`;
    }
  };

  renderComments(comments, countComments);
  commentsLoaderButton.onclick = () => {
    renderComments(comments, countComments);
  };
  document.addEventListener('keydown', onPhotoEscKeydown);
};

export { renderFullSizePhoto };
