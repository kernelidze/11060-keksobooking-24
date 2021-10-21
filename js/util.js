function getRandomIntegerNumber(min, max) {
  if (min < 0 || max <= 0 ) {
    return ('Использован неверный диапазон значений');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNumber(min, max, numberOfSigns) {
  if (min < 0 || max <0 ) {
    return ('Использован неверный диапазон значений');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  const NUMBER = Math.random() * (max - min) + min;
  const FIXED_NUMBER = Number(NUMBER.toFixed(numberOfSigns));
  return (FIXED_NUMBER);
}

function getRandomArrayElement(array) {
  const randomArrayElement = array[Math.floor(Math.random() * array.length)];
  return randomArrayElement;
}

function getRandomRangeFromArray(array) {
  const newArrayLength = getRandomIntegerNumber(1, array.length);
  const newShuffleArray = array.sort(() => Math.random() - 0.5);
  return newShuffleArray.slice(0, newArrayLength);
}

export {getRandomIntegerNumber, getRandomNumber, getRandomArrayElement, getRandomRangeFromArray};

