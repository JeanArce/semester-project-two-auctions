import { loginApi } from './apis.mjs';
import { showError, getErrorMessage } from './helpers.mjs';

const loginForm = document.querySelector('.loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');

loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const data = {
    email: email.value.trim(),
    password: password.value.trim(),
  };

  try {
    const login = await loginApi(data);

    if (login.errors && login.errors.length) {
      const message = getErrorMessage(login);
      showError(message);
    } else {
      console.log(login);

      login.profileName = login.name;
      delete login.name;
      localStorage.setItem('user', JSON.stringify(login));
      window.location.href = '/profile.html?profileName=' + login.profileName;
    }
  } catch (error) {
    console.log(error);
  }
});
