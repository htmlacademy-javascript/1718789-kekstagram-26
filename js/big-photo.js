import { isEscKey } from './util.js';

const COUNT_ADDED_COMMENTS = 5;
const body = document.querySelector('body');
const photoContainer = document.querySelector('.big-picture');
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

function cancelPhotoContainer () {
  photoContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEscKeydown);
}

cancelPhotoButton.addEventListener('click', cancelPhotoContainer);

const renderComment = ({ avatar, name, message }) => {
  const cloneCommentItem = commentItem.cloneNode(true);
  const cloneCommentAvatar = cloneCommentItem.querySelector('img');
  cloneCommentAvatar.src = avatar;
  cloneCommentAvatar.alt = name;
  cloneCommentItem.querySelector('.social__text').textContent = message;
  commentsFragment.append(cloneCommentItem);
};

const renderComments = (comments, countClickLoadComments) => {
  let countComment = 0;
  const countLoadComments = countClickLoadComments * COUNT_ADDED_COMMENTS;
  const countCommentsTotal = comments.length;
  if (countCommentsTotal <= countLoadComments) {
    commentsLoaderButton.classList.add('hidden');
  }  else {
    commentsLoaderButton.classList.remove('hidden');
  }
  for (let i = 0; i < (countCommentsTotal <= countLoadComments ? countCommentsTotal : countLoadComments); i++) {
    renderComment(comments[i]);
    countComment++;
  }
  commentsCount.textContent = `${countComment} из ${countCommentsTotal} комментариев`;
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);
};

const renderFullSizePhoto = ({ url, likes, description, comments }) => {

  let countClickLoadComments = 1;
  photoContainer.classList.remove('hidden');
  body.classList.add('modal-open');

  photoContainer.querySelector('.big-picture__img img').src = url;
  photoContainer.querySelector('.likes-count').textContent = likes;
  photoContainer.querySelector('.social__caption').textContent = description;

  renderComments(comments, countClickLoadComments);
  commentsLoaderButton.addEventListener('click', () => {
    countClickLoadComments++;
    renderComments(comments, countClickLoadComments);
  });
  document.addEventListener('keydown', onPhotoEscKeydown);
};

export { renderFullSizePhoto };
