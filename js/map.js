import {generateFragment} from './similar-elements.js';
import {getData} from './data-server.js';
import {houseFilter, priceFilter, roomsFilter, guestsFilter, wifiFilter, dishwasherFilter, parkingFilter, washerFilter, elevatorFilter, conditionerFilter} from './data-filter.js';

const form = document.querySelector('.ad-form');
const formAddress = form.querySelector('input[name=address]');
const formFieldsAll = document.querySelectorAll('input, textarea, select');
const formInteractiveElements = Object.values(formFieldsAll);

const tokyoCenterLatLng =  {
  lat: 35.68950,
  lng: 139.69171,
};

formAddress.value = `${tokyoCenterLatLng.lat} ${tokyoCenterLatLng.lng}`;

const setFormUnactive = () => {
  form.classList.add('ad-form--disabled');
  formInteractiveElements.forEach((elements) => {
    elements.setAttribute('disabled', '');
  });
};

const setFormActive = () => {
  form.classList.remove('ad-form--disabled');
  formInteractiveElements.forEach((elements) => {
    elements.removeAttribute('disabled', '');
  });
};

const map = L.map('map-canvas')
  .on('load', () => {
    setFormActive();
  })
  .on('unload', () => {
    setFormUnactive();
  })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68950,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const LAT = evt.target.getLatLng().lat.toFixed(5);
  const LNG = evt.target.getLatLng().lng.toFixed(5);
  formAddress.value = `${LAT} ${LNG}`;
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const closePopup = () => {
  map.closePopup();
};
const markerGroup = L.layerGroup().addTo(map);

let originalData = [];

const renderPins = () => {
  const filteredData = originalData
    .filter(houseFilter)
    .filter(priceFilter)
    .filter(roomsFilter)
    .filter(guestsFilter)
    .filter(wifiFilter)
    .filter(dishwasherFilter)
    .filter(parkingFilter)
    .filter(washerFilter)
    .filter(elevatorFilter)
    .filter(conditionerFilter);
  console.log(filteredData);
  filteredData.slice(0, 10).forEach((item) => {
    const lat = item.location.lat;
    const lng = item.location.lng;
    const pinMarker = L.marker({
      lat,
      lng,
    },
    {
      icon: pinIcon,
    },
    );
    pinMarker
      .addTo(markerGroup)
      .bindPopup(generateFragment(item));
  });
};

const onSucces = (data) => {
  originalData = data;
  renderPins();
};

getData(onSucces);

export {closePopup, renderPins, markerGroup};
