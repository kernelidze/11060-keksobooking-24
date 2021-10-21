import {getRandomIntegerNumber, getRandomNumber, getRandomArrayElement, getRandomRangeFromArray} from './util.js';

const avatarNumbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
const houseTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkin = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


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
    address: `${location.lat} ${location.lng}`,
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

export {getUsersAdsArray};

