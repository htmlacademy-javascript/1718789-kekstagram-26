import { renderThumbnails } from './picture-rendering.js';

import { getData } from './api.js';

import { setUploadFormSubmit } from './upload-form.js';

import { showError } from './util.js';

getData(renderThumbnails, showError);
setUploadFormSubmit();
