const TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('#upload-file');
const previewPhoto = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const showPhotoPreview = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = TYPES.some((it) => (fileName.endsWith(it)));
  if (matches) {
    previewPhoto.src = URL.createObjectURL(file);
    effectsPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url("${previewPhoto.src}")`;
    });
  }
};

export { showPhotoPreview, fileChooser };
