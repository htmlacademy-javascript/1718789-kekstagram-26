import { renderThumbnails } from './picture-rendering.js';

import { getData } from './api.js';

import { setUploadFormSubmit } from './submit-form.js';

import { initializeFilters } from './filters.js';

getData((photos) => {
  renderThumbnails(photos);
  initializeFilters(photos);
});

setUploadFormSubmit();

