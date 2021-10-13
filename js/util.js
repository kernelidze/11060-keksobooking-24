import {avatarNumbers, houseTypes, checkin, features, photos} from './data.js';

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

const getAdsDescription = function () {
  const author = {
    avatar: `img/avatars/user${(getRandomArrayElement(avatarNumbers))}.png`,
  };
  const location = {
    lat: getRandomNumber(35.65000, 35.70000, 5),
    lng: getRandomNumber(139.70000, 139.80000, 5),
  };
  const offer = {
    title: 'Добро пожаловать в выбранный вами дом',
    address: `Адрес: широта ${location.lat} и долгота ${location.lng}`,
    price: getRandomIntegerNumber(0, 1000),
    type: getRandomArrayElement(houseTypes),
    rooms: getRandomIntegerNumber(0, 10),
    guests: getRandomIntegerNumber(1, 100),
    checkin: getRandomArrayElement(checkin),
    checkout: getRandomArrayElement(checkin),
    features: getRandomRangeFromArray(features),
    description: 'Описание дома',
    photos: getRandomRangeFromArray(photos),
  };
  return {author, location, offer};
};

const getUsersAdsArray = function () {
  const userAdsArray = [];
  for (let i = 0; i < 10; i++) {
    userAdsArray[i] = getAdsDescription();
  }
  return userAdsArray;
};

getUsersAdsArray();

