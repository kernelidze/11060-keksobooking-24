import {closePopup, renderPins, markerGroup} from './map.js';
import {debounce} from './util.js';

const DEBOUNCE_DELAY = 500;
const ANY_VALUE = 'any';
const FilterPriceOptions = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: Infinity,
  },
};

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

const getFeaturesRank = ({offer}) => {
  let rank = 0;
  if (offer.features && offer.features.length > 0) {
    if (offer.features.includes('wifi')) {
      rank += 1;
    }
    if (offer.features.includes('dishwasher')) {
      rank += 1;
    }
    if (offer.features.includes('parking')) {
      rank += 1;
    }
    if (offer.features.includes('washer')) {
      rank += 1;
    }
    if (offer.features.includes('elevator')) {
      rank += 1;
    }
    if (offer.features.includes('conditioner')) {
      rank += 1;
    }
  }
  return rank;
};

const compareFeatures = (featureA, featureB) => {
  const rankA = getFeaturesRank(featureA);
  const rankB = getFeaturesRank(featureB);
  return rankB - rankA;
};

const getFiltration = ({offer}) => {
  const wifiFilter = (offer.features && featureWifi.checked && offer.features.includes('wifi') || !featureWifi.checked);
  const dishwasherFilter = (offer.features && featureDishwasher.checked && offer.features.includes('dishwasher') || !featureDishwasher.checked);
  const parkingFilter = (offer.features && featureParking.checked && offer.features.includes('parking') || !featureParking.checked);
  const washerFilter = (offer.features && featureWasher.checked && offer.features.includes('washer') || !featureWasher.checked);
  const elevatorFilter = (offer.features && featureElevator.checked && offer.features.includes('elevator') || !featureElevator.checked);
  const conditionerFilter = (offer.features && featureConditioner.checked && offer.features.includes('conditioner') || !featureConditioner.checked);
  const houseFilter = (offer.type === houseType.value || houseType.value === ANY_VALUE);
  const roomsFilter = (offer.rooms === +houseRooms.value || houseRooms.value === ANY_VALUE);
  const guestsFilter = (offer.guests === +houseGuests.value || houseGuests.value === ANY_VALUE);
  const priceFilter = (housePrice.value === ANY_VALUE || offer.price >= FilterPriceOptions[housePrice.value].min && offer.price < FilterPriceOptions[housePrice.value].max);
  return wifiFilter && dishwasherFilter && parkingFilter && washerFilter && elevatorFilter && conditionerFilter && houseFilter && priceFilter && roomsFilter && guestsFilter;
};

const filterHandler = (name) => {
  name.addEventListener('change', (evt) => {
    markerGroup.clearLayers();
    closePopup();
    const debouncedRender = debounce(renderPins, DEBOUNCE_DELAY);
    debouncedRender();
    name.removeEventListener('change', (evt));
  });
};

filterHandler(houseType);
filterHandler(housePrice);
filterHandler(houseRooms);
filterHandler(houseGuests);
filterHandler(featureWifi);
filterHandler(featureWasher);
filterHandler(featureParking);
filterHandler(featureDishwasher);
filterHandler(featureElevator);
filterHandler(featureConditioner);

export {getFiltration, compareFeatures, mapFiltersForm};
