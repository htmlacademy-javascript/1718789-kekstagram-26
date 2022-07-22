const ScaleSettings = {
  MIN: 25,
  MAX: 100,
  STEP_CHANGE: 25,
};
const photoPreviewImage = document.querySelector('.img-upload__preview img');
const photoScaleControl = document.querySelector('.scale__control--value');
const increaseScaleButton = document.querySelector('.scale__control--bigger');
const decreaseScaleButton = document.querySelector('.scale__control--smaller');

const resetScaleValue = () => {
  photoScaleControl.value = `${ScaleSettings.MAX}%`;
  photoPreviewImage.style.transform = '';
};

const changeScaleValue = (increase) => {
  let photoScaleValue = parseInt(photoScaleControl.value, 10);
  if (increase) {
    if (photoScaleValue < ScaleSettings.MAX) {
      photoScaleValue += ScaleSettings.STEP_CHANGE;
    }
  } else {
    if (photoScaleValue > ScaleSettings.MIN) {
      photoScaleValue -= ScaleSettings.STEP_CHANGE;
    }
  }
  photoScaleControl.value = `${photoScaleValue}%`;
  photoPreviewImage.style.transform = `scale(${photoScaleValue / 100})`;
};

const onIncreaseScaleButtonClick = () => changeScaleValue(true);
const onDecreaseScaleButtonClick = () => changeScaleValue(false);
increaseScaleButton.addEventListener('click', onIncreaseScaleButtonClick);
decreaseScaleButton.addEventListener('click', onDecreaseScaleButtonClick);

export { resetScaleValue };
