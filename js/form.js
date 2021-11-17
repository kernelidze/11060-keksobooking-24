import {sendData} from './data-server.js';
import {setResetAll} from './map.js';

const form = document.querySelector('.ad-form');
const formTitleInput = form.querySelector('input[name=title]');
const formPriceInput = form.querySelector('input[name=price]');
const houseTypes = form.querySelector('#type');
const roomNumbers = form.querySelector('select[name=rooms]');
const roomCapacity = form.querySelector('select[name=capacity]');
const roomCapacityOptions = form.querySelector('select[name=capacity]').querySelectorAll('option');
const timeIn = form.querySelector('select[name=timein]');
const timeOut = form.querySelector('select[name=timeout]');
const ESC_KEYCODE = 27;
const minRentPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

form.action = 'https://24.javascript.pages.academy/keksobooking';
formTitleInput.setAttribute('required', '');
formTitleInput.setAttribute('minlength', '30');
formTitleInput.setAttribute('maxlength', '100');
formPriceInput.setAttribute('required', '');
formPriceInput.setAttribute('placeholder', `${minRentPrice[houseTypes.value]}`);
formPriceInput.setAttribute('min', `${minRentPrice[houseTypes.value]}`);
roomCapacity.value = roomNumbers.value;

formTitleInput.addEventListener('input', () => {
  const valueLength = formTitleInput.value.length;
  const MIN_NAME_LENGTH = 30;
  const MAX_NAME_LENGTH = 100;
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
  formPriceInput.setAttribute('placeholder', `${minRentPrice[houseTypes.value]}`);
};

houseTypes.addEventListener('change', () => {
  formPriceInput.setAttribute('placeholder', `${minRentPrice[houseTypes.value]}`);
  formPriceInput.setAttribute('min', `${minRentPrice[houseTypes.value]}`);
});

formPriceInput.addEventListener('input', () => {
  const minPriceValue = minRentPrice[houseTypes.value];
  const MAX_PRICE_VALUE = 1000000;
  if (formPriceInput.value < minPriceValue) {
    formPriceInput.setCustomValidity(`Минимальная цена должна быть ${minPriceValue} руб.`);
  } else if (formPriceInput.value > MAX_PRICE_VALUE) {
    formPriceInput.setCustomValidity(`Максимальная цена должна быть ${MAX_PRICE_VALUE} руб.`);
  } else {
    formPriceInput.setCustomValidity('');
  }
  formPriceInput.reportValidity();
});

roomCapacityOptions[0].disabled = true;
roomCapacityOptions[1].disabled = true;
roomCapacityOptions[3].disabled = true;

roomNumbers.addEventListener('click', (evt) => {
  roomCapacityOptions.forEach((element) => element.disabled = true);
  if (evt.target.value === '1') {
    roomCapacityOptions[2].disabled = false;
    roomCapacity.value = '1';
  }
  if (evt.target.value === '2') {
    roomCapacityOptions[1].disabled = false;
    roomCapacityOptions[2].disabled = false;
    roomCapacity.value = '1';
  }
  if (evt.target.value === '3') {
    roomCapacityOptions[0].disabled = false;
    roomCapacityOptions[1].disabled = false;
    roomCapacityOptions[2].disabled = false;
    roomCapacity.value = '1';
  }
  if (evt.target.value === '100') {
    roomCapacityOptions[3].disabled = false;
    roomCapacity.value = '0';
  }
});

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
});

const getSuccessForm = () => {
  setResetAll();
  const successFormTemplate = document.querySelector('#success').content.querySelector('.success');
  const successForm = successFormTemplate.cloneNode(true);
  document.body.appendChild(successForm);
  successForm.onclick = () => document.body.removeChild(successForm);
  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      document.body.removeChild(successForm);
    }
  });
};

const getErrorForm = () => {
  const errorFormTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorForm = errorFormTemplate.cloneNode(true);
  document.body.appendChild(errorForm);
  errorForm.onclick = () => document.body.removeChild(errorForm);
  errorForm.addEventListener('keydown', (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      document.body.removeChild(errorForm);
    }
  });
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(getSuccessForm, getErrorForm, formData);
});

export {setPriceInput, roomCapacity, roomNumbers};
