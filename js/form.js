import {sendData} from './data-server.js';
import {setResetAll} from './map.js';
import {isEscPressed} from './util.js';

const MinRentPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const RoomsSpaces = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const form = document.querySelector('.ad-form');
const formTitleInput = form.querySelector('input[name=title]');
const formPriceInput = form.querySelector('input[name=price]');
const houseTypes = form.querySelector('#type');
const roomNumbers = form.querySelector('select[name=rooms]');
const roomCapacity = form.querySelector('select[name=capacity]');
const timeIn = form.querySelector('select[name=timein]');
const timeOut = form.querySelector('select[name=timeout]');
const successFormTemplate = document.querySelector('#success').content.querySelector('.success');
const successForm = successFormTemplate.cloneNode(true);
const errorFormTemplate = document.querySelector('#error').content.querySelector('.error');
const errorForm = errorFormTemplate.cloneNode(true);

form.action = 'https://24.javascript.pages.academy/keksobooking';
formTitleInput.setAttribute('required', '');
formTitleInput.setAttribute('minlength', '30');
formTitleInput.setAttribute('maxlength', '100');
formPriceInput.setAttribute('required', '');
formPriceInput.setAttribute('placeholder', `${MinRentPrice[houseTypes.value]}`);
formPriceInput.setAttribute('min', `${MinRentPrice[houseTypes.value]}`);
roomCapacity.value = roomNumbers.value;

formTitleInput.addEventListener('input', () => {
  const valueLength = formTitleInput.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    formTitleInput.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    formTitleInput.setCustomValidity(`Удалите лишние ${valueLength - formTitleInput.maxlength} симв.`);
  } else {
    formTitleInput.setCustomValidity('');
  }
  formTitleInput.reportValidity();
});

const setPriceInput = () => {
  formPriceInput.setAttribute('placeholder', `${MinRentPrice[houseTypes.value]}`);
};

const getPriceValidate = () => {
  const minPriceValue = MinRentPrice[houseTypes.value];
  if (formPriceInput.value < minPriceValue) {
    formPriceInput.setCustomValidity(`Минимальная цена должна быть ${minPriceValue} руб.`);
  } else if (formPriceInput.value > MAX_PRICE_VALUE) {
    formPriceInput.setCustomValidity(`Максимальная цена должна быть ${MAX_PRICE_VALUE} руб.`);
  } else {
    formPriceInput.setCustomValidity('');
  }
};

houseTypes.addEventListener('change', () => {
  formPriceInput.setAttribute('placeholder', `${MinRentPrice[houseTypes.value]}`);
  formPriceInput.setAttribute('min', `${MinRentPrice[houseTypes.value]}`);
  getPriceValidate();
});

formPriceInput.addEventListener('input', () => {
  getPriceValidate();
  formPriceInput.reportValidity();
});

const onRoomsValidateChange = () => {
  const roomNumber = +roomNumbers.value;
  const roomGuest = +roomCapacity.value;
  if (!RoomsSpaces[roomNumber].includes(roomGuest)) {
    roomCapacity.setCustomValidity(`Нельзя разместить ${roomGuest} гостей в ${roomNumber} комн.`);
  } else {
    roomCapacity.setCustomValidity('');
  }
  roomCapacity.reportValidity();
};

onRoomsValidateChange();

roomNumbers.addEventListener('change', onRoomsValidateChange);
roomCapacity.addEventListener('change', onRoomsValidateChange);

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
});

const onPopupEscSuccessCloseKeydown = (evt) => {
  if (isEscPressed(evt)) {
    document.body.removeChild(successForm);
    window.removeEventListener('keydown', onPopupEscSuccessCloseKeydown);
  }
};

const onPopupSuccessCloseClick = () => {
  document.body.removeChild(successForm);
  window.removeEventListener('keydown', onPopupEscSuccessCloseKeydown);
};

const onPopupEscErrorCloseKeydown = (evt) => {
  if (isEscPressed(evt)) {
    document.body.removeChild(errorForm);
    window.removeEventListener('keydown', onPopupEscErrorCloseKeydown);
  }
};

const onPopupErrorCloseClick = () => {
  document.body.removeChild(errorForm);
  window.removeEventListener('keydown', onPopupEscErrorCloseKeydown);
};

const getSuccessForm = () => {
  setResetAll();
  document.body.appendChild(successForm);
  window.addEventListener('keydown', onPopupEscSuccessCloseKeydown);
  successForm.addEventListener('click', onPopupSuccessCloseClick);
};


const getErrorForm = () => {
  document.body.appendChild(errorForm);
  window.addEventListener('keydown', onPopupEscErrorCloseKeydown);
  errorForm.addEventListener('click', onPopupErrorCloseClick);
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(getSuccessForm, getErrorForm, formData);
});

export {setPriceInput, roomCapacity, roomNumbers};
