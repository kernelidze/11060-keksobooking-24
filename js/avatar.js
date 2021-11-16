const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.ad-form__upload input[type=file]');
const preview = document.querySelector('.ad-form__photo');
const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarImg = document.querySelector('.ad-form-header__preview img');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarImg.src =  URL.createObjectURL(file);
  }
});

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.width = 70;
    preview.appendChild(image);
  }
});

export {avatarImg, preview};


