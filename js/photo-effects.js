const settingsEffects = {
  chrome: {
    filter: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
  heat: {
    filter: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  }
};
const photoPreviewImage = document.querySelector('.img-upload__preview img');
const effectList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const rangeSlider = document.querySelector('.effect-level__slider');
const rangeSliderContainer = document.querySelector('.img-upload__effect-level');

// создание слайдера
noUiSlider.create(rangeSlider, {
  range: {
    min: 0,
    max: 1
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

// скрытие эффектов
const resetEffects = () => {
  rangeSlider.setAttribute('disabled', true);
  rangeSliderContainer.classList.add('hidden');
  photoPreviewImage.className = 'img-upload__preview';
  photoPreviewImage.style.filter = '';
  effectLevelValue.value = '';
};

// смена эффектов
const onEffectListChange = (evt) => {

  const selectedEffect = evt.target.value;
  if (selectedEffect === 'none') {
    resetEffects();
  } else {
    // изменение настроек слайдера
    rangeSlider.removeAttribute('disabled');
    rangeSliderContainer.classList.remove('hidden');
    photoPreviewImage.className = 'img-upload__preview';
    photoPreviewImage.classList.add(`effects__preview--${selectedEffect}`);
    rangeSlider.noUiSlider.updateOptions(settingsEffects[selectedEffect].options);
  }

};

effectList.addEventListener('change', onEffectListChange);

// изменение интенсивности эффекта
rangeSlider.noUiSlider.on('update', () => {

  const valueRangeSlider = rangeSlider.noUiSlider.get();
  effectLevelValue.value = valueRangeSlider;

  const effectCheckedValue = document.querySelector('input[name="effect"]:checked');
  if (effectCheckedValue && effectCheckedValue.value !== 'none') {
    const { filter, unit } = settingsEffects[effectCheckedValue.value];
    photoPreviewImage.style.filter = `${filter}(${valueRangeSlider}${unit})`;
  }
});

export { resetEffects };
