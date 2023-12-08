import {
  createProfileLink,
  createLogout,
  createLoginSignup,
} from './helpers.mjs';
createProfileLink();
createLogout();
createLoginSignup();

const logoutBtn = document.getElementById('logoutButton');
logoutBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  localStorage.clear();
  window.location.href = 'login.html';
});
