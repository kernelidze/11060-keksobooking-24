const SwitchHouseTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const fragment = document.createDocumentFragment();

const generateFragment = (item) => {
  const element = cardTemplate.cloneNode(true);
  const arrayFeatures = item.offer.features;
  const featuresContainer = element.querySelector('.popup__features');
  const arrayPhotos = item.offer.photos;
  const photosContainer = element.querySelector('.popup__photos');
  element.querySelector('.popup__title').textContent = item.offer.title;
  element.querySelector('.popup__text--address').textContent = item.offer.address;
  element.querySelector('.popup__text--price').textContent =`${item.offer.price} ₽/ночь`;
  element.querySelector('.popup__type').textContent = SwitchHouseTypes[item.offer.type];
  element.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  featuresContainer.innerHTML = '';
  if (arrayFeatures && arrayFeatures.length > 0) {
    arrayFeatures.forEach((feature) => {
      const featuresListItem = document.createElement('li');
      featuresListItem.classList.add('popup__feature');
      featuresListItem.classList.add(`popup__feature--${feature}`);
      element.querySelector('.popup__features').appendChild(featuresListItem);
    });
  }
  element.querySelector('.popup__description').textContent = item.offer.description;
  photosContainer.innerHTML = '';
  if (arrayPhotos && arrayPhotos.length > 0) {
    arrayPhotos.forEach((photo) => {
      const photoElement = document.createElement('img');
      photoElement.src = photo;
      photoElement.width = PHOTO_WIDTH;
      photoElement.height = PHOTO_HEIGHT;
      photoElement.alt = 'Фотография жилья';
      photoElement.classList.add('popup__photo');
      element.querySelector('.popup__photos').appendChild(photoElement);
    });
  }
  element.querySelector('.popup__avatar').src = item.author.avatar;
  fragment.appendChild(element);
  return element;
};

export {generateFragment};
