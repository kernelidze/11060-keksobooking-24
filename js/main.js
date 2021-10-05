function getRandomIntegerNumber(min, max) {
  if (min < 0 || max <= 0 ) {
    return;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

const houseTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkin = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

function getRandomArrayElement(array) {
  const randomArrayElement = Math.floor(Math.random() * array.length);
  return randomArrayElement;
}

const userType = function () {
  const author = {
    avatar: avatarLink,
  };
  const offer = {
    title: 'Добро пожаловать в выбранный вами дом',
    address: location,
    price: getRandomIntegerNumber(0, 1000),
    type: getRandomArrayElement(houseTypes),
    rooms: getRandomIntegerNumber(0, 10),
    guests: getRandomIntegerNumber(1, 100),
    checkin: getRandomArrayElement(checkin),
    checkout: getRandomArrayElement(checkin),
    features: getRandomArrayElement(features),
    description: 'Описание дома',
    photos: getRandomArrayElement(photos),
    location: {
      lat: getRandomNumber(35.65000, 35.70000, 5),
      lng: getRandomNumber(139.70000, 139.80000, 5),
    },
  };
};
