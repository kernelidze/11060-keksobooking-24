// Функция, возвращающая случайное целое число из переданного диапазона включительно

function randomIntegerNumber(min, max) {
  if (min < 0 || max <0 ) {
    return;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно

function randomNumber(min, max) {
  if (min < 0 || max <0 ) {
    return;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.random() * (max - min + 1) + min;
}
