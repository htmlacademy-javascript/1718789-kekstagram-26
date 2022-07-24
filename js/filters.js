import { shuffleArray, debounce } from './util.js';
import { renderThumbnails } from './picture-rendering.js';
const COUNT_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;
const filtersContainer = document.querySelector('.img-filters');
const filtersButtons = filtersContainer.querySelectorAll('button');
const filtersListeners = {
  'filter-default': (photos) => photos.slice(),
  'filter-random': (photos) => (shuffleArray(photos.slice()).slice(0, COUNT_RANDOM_PHOTOS)),
  'filter-discussed': (photos) => (photos.slice().sort((photo1, photo2) => (photo2.comments.length - photo1.comments.length))),
};

const debounceFilter = debounce((idButton, photos) => renderThumbnails(filtersListeners[idButton](photos)), RERENDER_DELAY);

const initializeFilters = (photos) => {
  filtersContainer.classList.remove('img-filters--inactive');
  filtersButtons.forEach((buttonNode) => {
    buttonNode.addEventListener('click', (evt) => {
      filtersContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      debounceFilter(evt.target.id, photos);
    });
  });
};

export { initializeFilters };

