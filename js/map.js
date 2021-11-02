import {setFormActive, setFormUnactive, FORM_ADDRESS} from './form.js';
import {userAdsArray} from './similar-elements.js';

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
  }, 10);

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

//const randomLocations = userAdsArray.map((loc) => loc.location);
//const randomOffers = userAdsArray.map((off) => off.offer);
//const randomAvatars = userAdsArray.map((avt) => avt.avatar);

const copyUnitedArray =  userAdsArray.map((copy) => {
  const copyOffer = copy.offer;
  const copyLocation = copy.location;
  const result = Object.assign({}, copyOffer, copyLocation);
  return result;
});

//Здесь совершенно не понял, как правильно передавать и выводить информацию в балун
//был бы благодарен за обьяснение, в виде консультации, можно написать текстом в гите
copyUnitedArray.forEach(({lat, lng, title, address, price, type, rooms, checkin, checkout, description, photos}) => {
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
    .bindPopup(`${title}
    ${address}
    ${price}
    ${type}
    ${rooms}
    ${checkin}
    ${checkout}
    ${description}
    ${photos}`);
});
