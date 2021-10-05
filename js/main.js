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

const getRandomHouseType = function () {
  const houseTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
  const houseTypesRandomIndex = Math.floor(Math.random() * houseTypes.length);
  return houseTypes(houseTypesRandomIndex);
};

const getRandomCheckin = function () {
  const checkin = ['12:00', '13:00', '14:00'];
  const checkinRandomIndex = Math.floor(Math.random() * checkin.length);
  return checkin(checkinRandomIndex);
};

const getRandomFeatures = function () {
  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const featuresRandomIndex = features[Math.floor(Math.random() * features.length)];
  return features(featuresRandomIndex);
};

const getRandomPhotos = function () {
  const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
  const photosRandomIndex = photos[Math.floor(Math.random() * photos.length)];
  return photos(photosRandomIndex);
};

const userType = function () {
  const author = {
    avatar: avatarLink,
  };
  const offer = {
    title: 'Добро пожаловать в выбранный вами дом',
    address: location,
    price: getRandomIntegerNumber(0, 1000),
    type: getRandomHouseType(),
    rooms: getRandomIntegerNumber(0, 10),
    guests: getRandomIntegerNumber(1, 100),
    checkin: getRandomCheckin(),
    checkout: getRandomCheckin(),
    features: getRandomFeatures(),
    description: 'Описание дома',
    photos: getRandomPhotos(),
    location: {
      lat: getRandomNumber(35.65000, 35.70000, 5),
      lng: getRandomNumber(139.70000, 139.80000, 5),
    },
  };
};
