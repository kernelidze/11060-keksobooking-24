import {getUsersAdsArray} from './data.js';

const TYPE_NAME = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const fragment = document.createDocumentFragment();

const generateFragment = (element, item, currenFragment) => {
  const arrayFeatures = item.offer.features;
  const featuresContainer = element.querySelector('.popup__features');
  const hollowPhoto = element.querySelector('.popup__photos');
  element.querySelector('.popup__title').textContent = item.offer.title;
  element.querySelector('.popup__text--address').textContent = item.offer.address;
  element.querySelector('.popup__text--price').textContent =`${item.offer.price} ₽/ночь`;
  element.querySelector('.popup__type').textContent = TYPE_NAME[item.offer.type];
  element.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  featuresContainer.innerHTML = '';
  arrayFeatures.forEach((feature) => {
    const featuresListItem = document.createElement('li');
    featuresListItem.classList.add('popup__feature');
    featuresListItem.classList.add(`popup__feature--${feature}`);
    element.querySelector('.popup__features').appendChild(featuresListItem);
  });
  element.querySelector('.popup__description').textContent = item.offer.description;
  hollowPhoto.innerHTML = '';
  item.offer.photos.forEach((photo) => {
    const photoElement = document.createElement('img');
    photoElement.src = photo;
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    photoElement.classList.add('popup__photo');
    element.querySelector('.popup__photos').appendChild(photoElement);
  });
  element.querySelector('.popup__avatar').src = item.author.avatar;
  currenFragment.appendChild(element);
};

const userAdsArray = getUsersAdsArray();
userAdsArray.forEach((item) => {
  const element1 = cardTemplate.cloneNode(true);
  generateFragment(element1, item, fragment);
});

//const randomLocations = userAdsArray.map((loc) => loc.location);

export {userAdsArray};
//export {randomLocations};
