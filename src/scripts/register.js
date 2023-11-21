import { registerApi } from './apis.mjs';
import {
  getErrorMessage,
  showError,
  showSuccess,
  redirectToProfileIfAuthenticated,
} from './helpers.mjs';

redirectToProfileIfAuthenticated();

const registerForm = document.getElementById('registerForm');
const nameValue = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const avatar = document.getElementById('avatar');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: nameValue.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
    avatar: avatar.value.trim(),
  };

  try {
    const register = await registerApi(data);

    if (register.errors && register.errors.length) {
      const message = getErrorMessage(register);
      showError(message);
    } else {
      registerForm.reset();
      showSuccess(
        'You are successfully registered. <a href="/login.html">Click here to login.</a>',
      );
    }
  } catch (error) {
    console.log(error);
  }
});
