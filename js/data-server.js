const getData = (onSucces) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSucces(data);
    });
};

const sendData = (onSucces, onError, data) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSucces();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
