const FORM = document.querySelector('.ad-form');
const FORM_TITLE_INPUT = FORM.querySelector('input[name=title]');
const FORM_PRICE_INPUT = FORM.querySelector('input[name=price]');
const HOUSE_TYPES = FORM.querySelector('#type');
const ROOM_NUMBER = FORM.querySelector('select[name=rooms]');
const ROOM_CAPACITY = FORM.querySelector('select[name=capacity]');
const TIMEIN = FORM.querySelector('select[name=timein]');
const TIMEOUT = FORM.querySelector('select[name=timeout]');
const MIN_RENT_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

FORM.action = 'https://24.javascript.pages.academy/keksobooking';
FORM_TITLE_INPUT.setAttribute('required', '');
FORM_TITLE_INPUT.setAttribute('minlength', '30');
FORM_TITLE_INPUT.setAttribute('maxlength', '100');
FORM_PRICE_INPUT.setAttribute('required', '');
FORM_PRICE_INPUT.setAttribute('placeholder', `${MIN_RENT_PRICE[HOUSE_TYPES.value]}`);

HOUSE_TYPES.addEventListener('change', () => {
  FORM_PRICE_INPUT.setAttribute('placeholder', `${MIN_RENT_PRICE[HOUSE_TYPES.value]}`);
});

FORM_PRICE_INPUT.addEventListener('input', () => {
  const MIN_PRICE_VALUE = MIN_RENT_PRICE[HOUSE_TYPES.value];
  const MAX_PRICE_VALUE = 1000000;
  if (FORM_PRICE_INPUT.value < MIN_PRICE_VALUE) {
    FORM_PRICE_INPUT.setCustomValidity(`Минимальная цена должна быть на ${MIN_PRICE_VALUE - FORM_PRICE_INPUT.value} руб. выше`);
  } else if (FORM_PRICE_INPUT.value > MAX_PRICE_VALUE) {
    FORM_PRICE_INPUT.setCustomValidity(`Максимальная цена должна быть на ${MAX_PRICE_VALUE - FORM_PRICE_INPUT.value} руб. ниже`);
  } else {
    FORM_PRICE_INPUT.setCustomValidity('');
  }
  FORM_PRICE_INPUT.reportValidity();
});

FORM_TITLE_INPUT.addEventListener('input', () => {
  const valueLength = FORM_TITLE_INPUT.value.length;
  const MIN_NAME_LENGTH = 30;
  const MAX_NAME_LENGTH = 100;
  if (valueLength < MIN_NAME_LENGTH) {
    FORM_TITLE_INPUT.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    FORM_TITLE_INPUT.setCustomValidity(`Удалите лишние ${valueLength - FORM_TITLE_INPUT.maxlength} симв.`);
  } else {
    FORM_TITLE_INPUT.setCustomValidity('');
  }
  FORM_TITLE_INPUT.reportValidity();
});

ROOM_NUMBER.addEventListener('click', () => {
  for (let i = 0; i < ROOM_CAPACITY.children.length; i++) {
    ROOM_CAPACITY.children[i].removeAttribute('disabled', '');
    ROOM_CAPACITY.children[i].removeAttribute('selected', '');
  }
  if (ROOM_NUMBER.value === '1') {
    ROOM_CAPACITY.children[0].setAttribute('disabled', '');
    ROOM_CAPACITY.children[1].setAttribute('disabled', '');
    ROOM_CAPACITY.children[2].setAttribute('selected', '');
    ROOM_CAPACITY.children[3].setAttribute('disabled', '');
  }
  if (ROOM_NUMBER.value === '2') {
    ROOM_CAPACITY.children[0].setAttribute('disabled', '');
    ROOM_CAPACITY.children[1].setAttribute('selected', '');
    ROOM_CAPACITY.children[3].setAttribute('disabled', '');
  }
  if (ROOM_NUMBER.value === '3') {
    ROOM_CAPACITY.children[0].setAttribute('selected', '');
    ROOM_CAPACITY.children[3].setAttribute('disabled', '');
  }
  if (ROOM_NUMBER.value === '100') {
    ROOM_CAPACITY.children[0].setAttribute('disabled', '');
    ROOM_CAPACITY.children[1].setAttribute('disabled', '');
    ROOM_CAPACITY.children[2].setAttribute('disabled', '');
    ROOM_CAPACITY.children[3].setAttribute('selected', '');
  }
});

TIMEIN.addEventListener('click', () => {
  for (let i = 0; i < TIMEIN.children.length; i++) {
    TIMEOUT.children[i].removeAttribute('disabled', '');
  }
  if (TIMEIN.value === '12:00') {
    TIMEOUT.children[0].setAttribute('selected', '');
    TIMEOUT.children[1].setAttribute('disabled', '');
    TIMEOUT.children[2].setAttribute('disabled', '');
  }
  if (TIMEIN.value === '13:00') {
    TIMEOUT.children[0].setAttribute('disabled', '');
    TIMEOUT.children[1].setAttribute('selected', '');
    TIMEOUT.children[2].setAttribute('disabled', '');
  }
  if (TIMEIN.value === '14:00') {
    TIMEOUT.children[0].setAttribute('disabled', '');
    TIMEOUT.children[1].setAttribute('disabled', '');
    TIMEOUT.children[2].setAttribute('selected', '');
  }
});
