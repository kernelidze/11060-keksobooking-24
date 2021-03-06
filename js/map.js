import {generateFragment} from './similar-elements.js';
import {getData} from './data-server.js';
import {getFiltration, compareFeatures, mapFiltersForm} from './data-filter.js';
import {setPriceInput, roomCapacity, roomNumbers} from './form.js';
import {avatarImg, preview} from './avatar.js';

const MAP_SCALE = 12;
const MAX_DATA_OFFERS = 10;
const TokyoCenterLatLng =  {
  lat: 35.68950,
  lng: 139.69171,
};
const mainPinSizes = [52, 52];
const mainPinAnchors = [26, 52];
const pinSizes = [40, 40];
const pinAnchors = [20, 40];

const form = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');
const formAddress = form.querySelector('input[name=address]');
const formFieldsAll = document.querySelectorAll('input, textarea, select');
const formInteractiveElements = Object.values(formFieldsAll);

formAddress.value = `${TokyoCenterLatLng.lat} ${TokyoCenterLatLng.lng}`;

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
  formAddress.setAttribute('readonly', '');
};

const map = L.map('map-canvas')
  .on('load', () => {
    setFormActive();
  })
  .on('unload', () => {
    setFormUnactive();
  })
  .setView({
    lat: TokyoCenterLatLng.lat,
    lng: TokyoCenterLatLng.lng,
  }, MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: mainPinSizes,
  iconAnchor: mainPinAnchors,
});

const mainPinMarker = L.marker(
  {
    lat: TokyoCenterLatLng.lat,
    lng: TokyoCenterLatLng.lng,
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
  iconSize: pinSizes,
  iconAnchor: pinAnchors,
});

const closePopup = () => {
  map.closePopup();
};

const markerGroup = L.layerGroup().addTo(map);

let originalData = [];

const renderPins = () => {
  const filteredData = originalData.filter(getFiltration);
  filteredData.sort(compareFeatures).slice(0, MAX_DATA_OFFERS).forEach((item) => {
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

const setResetAll = () => {
  form.reset();
  closePopup();
  mapFiltersForm.reset();
  markerGroup.clearLayers();
  renderPins();
  map.setView({
    lat: TokyoCenterLatLng.lat,
    lng: TokyoCenterLatLng.lng,
  }, MAP_SCALE);
  mainPinMarker.setLatLng({
    lat: TokyoCenterLatLng.lat,
    lng: TokyoCenterLatLng.lng,
  });
  formAddress.value = `${TokyoCenterLatLng.lat} ${TokyoCenterLatLng.lng}`;
  setPriceInput();
  roomCapacity.value = roomNumbers.value;
  avatarImg.src = 'img/muffin-grey.svg';
  if (preview.querySelector('img')) {
    preview.removeChild(preview.querySelector('img'));
  }
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setResetAll();
});

const onSucces = (data) => {
  originalData = data;
  renderPins();
};

getData(onSucces);

export {closePopup, renderPins, markerGroup, setResetAll};
