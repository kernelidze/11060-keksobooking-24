import {sendData} from './data-server.js';

const form = document.querySelector('.ad-form');
const formTitleInput = form.querySelector('input[name=title]');
const formPriceInput = form.querySelector('input[name=price]');
const houseTypes = form.querySelector('#type');
const roomNumbers = form.querySelector('select[name=rooms]');
const roomCapacity = form.querySelector('select[name=capacity]');
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

houseTypes.addEventListener('change', () => {
  formPriceInput.setAttribute('placeholder', `${minRentPrice[houseTypes.value]}`);
});

formPriceInput.addEventListener('input', () => {
  const minPriceValue = minRentPrice[houseTypes.value];
  const MAX_PRICE_VALUE = 1000000;
  if (formPriceInput.value < minPriceValue) {
    formPriceInput.setCustomValidity(`Минимальная цена должна быть на ${minPriceValue - formPriceInput.value} руб. выше`);
  } else if (formPriceInput.value > MAX_PRICE_VALUE) {
    formPriceInput.setCustomValidity(`Максимальная цена должна быть на ${MAX_PRICE_VALUE - formPriceInput.value} руб. ниже`);
  } else {
    formPriceInput.setCustomValidity('');
  }
  formPriceInput.reportValidity();
});

roomCapacity.children[2].setAttribute('selected', '');

roomNumbers.addEventListener('click', () => {
  for (let i = 0; i < roomCapacity.children.length; i++) {
    roomCapacity.children[i].removeAttribute('disabled', '');
    roomCapacity.children[i].removeAttribute('selected', '');
  }
  if (roomNumbers.value === '1') {
    roomCapacity.children[0].setAttribute('disabled', '');
    roomCapacity.children[1].setAttribute('disabled', '');
    roomCapacity.children[2].setAttribute('selected', '');
    roomCapacity.children[3].setAttribute('disabled', '');
  }
  if (roomNumbers.value === '2') {
    roomCapacity.children[0].setAttribute('disabled', '');
    roomCapacity.children[1].setAttribute('selected', '');
    roomCapacity.children[3].setAttribute('disabled', '');
  }
  if (roomNumbers.value === '3') {
    roomCapacity.children[0].setAttribute('selected', '');
    roomCapacity.children[3].setAttribute('disabled', '');
  }
  if (roomNumbers.value === '100') {
    roomCapacity.children[0].setAttribute('disabled', '');
    roomCapacity.children[1].setAttribute('disabled', '');
    roomCapacity.children[2].setAttribute('disabled', '');
    roomCapacity.children[3].setAttribute('selected', '');
  }
});

timeIn.addEventListener('click', () => {
  for (let i = 0; i < timeIn.children.length; i++) {
    timeOut.children[i].removeAttribute('selected', '');
  }
  if (timeIn.value === '12:00') {
    timeOut.children[0].setAttribute('selected', '');
  }
  if (timeIn.value === '13:00') {
    timeOut.children[1].setAttribute('selected', '');
  }
  if (timeIn.value === '14:00') {
    timeOut.children[2].setAttribute('selected', '');
  }
});

timeOut.addEventListener('click', () => {
  for (let i = 0; i < timeOut.children.length; i++) {
    timeIn.children[i].removeAttribute('selected', '');
  }
  if (timeOut.value === '12:00') {
    timeIn.children[0].setAttribute('selected', '');
  }
  if (timeOut.value === '13:00') {
    timeIn.children[1].setAttribute('selected', '');
  }
  if (timeOut.value === '14:00') {
    timeIn.children[2].setAttribute('selected', '');
  }
});

const getSuccessForm = () => {
  const successFormTemplate = document.querySelector('#success').content.querySelector('.success');
  const successForm = successFormTemplate.cloneNode(true);
  document.body.appendChild(successForm);
  successForm.onclick = () => document.body.removeChild(successForm);
  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
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
