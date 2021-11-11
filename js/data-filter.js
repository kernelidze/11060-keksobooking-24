import {closePopup, renderPins, markerGroup} from './map.js';

const mapFiltersForm = document.querySelector('.map__filters');
const houseType = mapFiltersForm.querySelector('#housing-type');
const housePrice = mapFiltersForm.querySelector('#housing-price');
const houseRooms = mapFiltersForm.querySelector('#housing-rooms');
const houseGuests = mapFiltersForm.querySelector('#housing-guests');

const houseFeatures = mapFiltersForm.querySelector('#housing-features');
const featureWifi = houseFeatures.querySelector('#filter-wifi');
const featureDishwasher = houseFeatures.querySelector('#filter-dishwasher');
const featureParking = houseFeatures.querySelector('#filter-parking');
const featureWasher = houseFeatures.querySelector('#filter-washer');
const featureElevator = houseFeatures.querySelector('#filter-elevator');
const featureConditioner = houseFeatures.querySelector('#filter-conditioner');

const wifiFilter = ({offer}) => {
  if (offer.features && featureWifi.checked && offer.features.includes('wifi')) {
    return true;
  } else if (featureWifi.checked === false) {
    return true;
  } else {
    return false;
  }
};

const dishwasherFilter = ({offer}) => {
  if (offer.features && featureDishwasher.checked && offer.features.includes('dishwasher')) {
    return true;
  } else if (featureDishwasher.checked === false) {
    return true;
  } else {
    return false;
  }
};

const parkingFilter = ({offer}) => {
  if (offer.features && featureParking.checked && offer.features.includes('parking')) {
    return true;
  } else if (featureParking.checked === false) {
    return true;
  } else {
    return false;
  }
};

const washerFilter = ({offer}) => {
  if (offer.features && featureWasher.checked && offer.features.includes('washer')) {
    return true;
  } else if (featureWasher.checked === false) {
    return true;
  } else {
    return false;
  }
};

const elevatorFilter = ({offer}) => {
  if (offer.features && featureElevator.checked && offer.features.includes('elevator')) {
    return true;
  } else if (featureElevator.checked === false) {
    return true;
  } else {
    return false;
  }
};

const conditionerFilter = ({offer}) => {
  if (offer.features && featureConditioner.checked && offer.features.includes('conditioner')) {
    return true;
  } else if (featureConditioner.checked === false) {
    return true;
  } else {
    return false;
  }
};

const houseFilter = ({offer}) => {
  if (offer.type === houseType.value || houseType.value === 'any') {
    return true;
  } else {
    return false;
  }
};

const priceFilter = ({offer}) => {
  if (housePrice.value === 'any') {
    return true;
  }
  if (housePrice.value === 'middle') {
    if (offer.price > '10000' && offer.price < '50000') {
      return true;
    }
  }
  if (housePrice.value === 'low') {
    if (offer.price < '10000') {
      return true;
    }
  }
  if (housePrice.value === 'high') {
    if (offer.price >= '50000') {
      return true;
    }
  } else {
    return false;
  }
};

const roomsFilter = ({offer}) => {
  if (offer.rooms >=  houseRooms.value || houseRooms.value === 'any') {
    return true;
  } else {
    return false;
  }
};

const guestsFilter = ({offer}) => {
  if (offer.guests <= houseGuests.value || houseGuests.value === 'any') {
    return true;
  } else {
    return false;
  }
};

function debounce (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const handlerFilters = (name) => {
  name.addEventListener('change', (evt) => {
    markerGroup.clearLayers();
    closePopup();
    const debouncedRender = debounce(renderPins, 500);
    debouncedRender();
    name.removeEventListener('change', (evt));
  });
};

handlerFilters(houseType);
handlerFilters(housePrice);
handlerFilters(houseRooms);
handlerFilters(houseGuests);
handlerFilters(featureWifi);
handlerFilters(featureWasher);
handlerFilters(featureParking);
handlerFilters(featureDishwasher);
handlerFilters(featureElevator);
handlerFilters(featureConditioner);

export {houseFilter, priceFilter, roomsFilter, guestsFilter, wifiFilter, dishwasherFilter, parkingFilter, washerFilter, elevatorFilter, conditionerFilter};
