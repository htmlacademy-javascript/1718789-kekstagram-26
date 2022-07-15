import { renderFullSizePhoto } from './big-photo.js';

const renderThumbnails = (photos) => {

  const pictureContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const pictureFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const { url, likes, comments } = photo;
    const pictureClone = pictureTemplate.cloneNode(true);
    pictureClone.querySelector('img').src = url;
    pictureClone.querySelector('.picture__likes').textContent = likes;
    pictureClone.querySelector('.picture__comments').textContent = comments.length;
    pictureClone.addEventListener('click', () => renderFullSizePhoto(photo));
    pictureFragment.append(pictureClone);
  });
  pictureContainer.append(pictureFragment);
};

export { renderThumbnails };
