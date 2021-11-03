import {setFormActive, setFormUnactive, FORM_ADDRESS} from './form.js';
import {userAdsArray, generateFragment} from './similar-elements.js';

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
  FORM_ADDRESS.value = `${LAT} ${LNG}`;
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

userAdsArray.forEach((item) => {
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
    .addTo(map)
    .bindPopup(generateFragment(item));
});
