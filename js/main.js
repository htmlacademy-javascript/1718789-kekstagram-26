const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES_OF_COMMENTATORS = [
  'Андрей',
  'Артур',
  'Настя',
  'Влад',
  'Ирина',
  'Николай',
];
const TEXT_DESCRIPTION = [
  'Отличный день!',
  'Вкусный ужин!',
  'Среда - маленькая пятница!',
  'Отпуск 2022.',
  'Долгая дорога.',
  'Вкусный завтрак!',
  'Вау!',
  'Работа',
  'На природе.',
];
const urlImages = `randomUrlImage`;

for (let i = 1; i <= 25; i++) {
  const randomUrlImage = `photos/i.jpg`;
}

const checkMaxLengthString = (string, maxLength) => string.length <= maxLength;
checkMaxLengthString('testString', 10);

const getRandomInteger = (min, max) => {
  const minNumber = Math.min(Math.abs(min), Math.abs(max));
  const maxNumber = Math.max(Math.abs(min), Math.abs(max));
  return Math.floor(minNumber + Math.random() * (maxNumber - minNumber + 1));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: getRandomInteger(1, 1000),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES_OF_COMMENTATORS),
});

const createPhotoDescription = () => ({
  id: getRandomInteger(1, 25),
  url: getRandomArrayElement(urlImages),
  description: getRandomArrayElement(TEXT_DESCRIPTION),
  likes: getRandomInteger(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
  comments: '',
});

// const similarPhotoDescription = Array.from({length: PHOTO_COUNT}, createPhotoDescription);
