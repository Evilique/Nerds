const link = document.querySelector('.login-link');
const popup = document.querySelector('.modal');
const scroll = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const close = popup.querySelector('.modal-close');
const form = popup.querySelector('form');
const fieldName = popup.querySelector(".modal__item:nth-child(1) input");
const fieldEmail = popup.querySelector(".modal__item:nth-child(2) input");
const fieldText = popup.querySelector(".modal__item:nth-child(3) textarea");
let isStorageSupport = true;
let storageName = "";
let storageEmail = "";

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.add('modal-show');
  scroll.classList.add('scroll');
  overlay.classList.add('overlay-show')
 if (storageName && storageEmail) {
    fieldName.value = storageName;
    fieldEmail.value = storageEmail;
    fieldText.focus();
  } else {
    fieldName.focus();
  }
});

close.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.remove('modal-show');
  popup.classList.remove('modal-error');
  scroll.classList.remove('scroll');
  overlay.classList.remove('overlay-show')
  if (popup.classList.contains("modal-error")) {
    popup.classList.remove("modal-error");
  }
});

form.addEventListener('submit', function(evt) {
  if (!fieldName.value || !fieldEmail.value || !fieldText.value) {
    evt.preventDefault();
    popup.classList.add('modal-error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', fieldName.value);
      localStorage.setItem('email', fieldEmail.value);
    }
  }
});

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains('modal-show')) {
      evt.preventDefault();
      popup.classList.remove('modal-show');
      popup.classList.remove('modal-error');
    }
  }
});