const checkMaxLengthString = (string, maxLength) => string.length <= maxLength;
checkMaxLengthString('testString', 10);

const getRandomInteger = (min, max) => {
  const minNumber = Math.min(Math.abs(min), Math.abs(max));
  const maxNumber = Math.max(Math.abs(min), Math.abs(max));
  return Math.floor(minNumber + Math.random() * (maxNumber - minNumber + 1));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomArrayElement, getRandomInteger, checkMaxLengthString};
