function getRandomIntegerNumber(min, max) {
  if (min < 0 || max <= 0 ) {
    return;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntegerNumber (10, 100);

function getRandomNumber(min, max, numberOfSigns) {
  if (min < 0 || max <0 ) {
    return;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  const NUMBER = Math.random() * (max - min + 1) + min;
  const FIXED_NUMBER = Number(NUMBER.toFixed(numberOfSigns));
  return (FIXED_NUMBER);
}

getRandomNumber(10, 100, 3);
