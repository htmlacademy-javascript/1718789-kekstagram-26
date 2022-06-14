//Получение случайного целого числа в заданном интервале, включительно.

function getRandomInteger(min, max) {
  if (min >= max) {
    return null;
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
}


//Функция для проверки максимальной длины строки

function checkMaxLengthString(string, maxLength) {
  return string.length <= maxLength;
}

getRandomInteger(1, 80);
checkMaxLengthString('testString', 10);
