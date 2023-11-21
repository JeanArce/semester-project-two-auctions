//accessToken - string
//avatar - string
//credits - number
//email - string
//profileName - string
const storedUser = JSON.parse(localStorage.getItem('user'));


/**
 *
 * @param {*} errorMessage
 */
export const showError = (errorMessage) => {
  const errorModal = new bootstrap.Modal(
    document.getElementById('errorModal'),
    {
      keyboard: false,
      backdrop: 'static',
    },
  );
  const errorMessageEl = document.getElementById('errorMessage');
  errorMessageEl.innerText = errorMessage;
  errorModal.show();
};

/**
 *
 * @param {*} data
 * @returns
 */
export const getErrorMessage = (data) => {
  const combinedString = data.errors.reduce((accumulator, obj) => {
    return accumulator + ' , ' + obj.message;
  }, '');

  const finalCombinedString = combinedString.trim().substring(2);

  return finalCombinedString;
};

/**
 *
 * @param {*} successMessage
 */
export const showSuccess = (successMessage) => {
  const successModal = new bootstrap.Modal(
    document.getElementById('successModal'),
    {
      keyboard: false,
      backdrop: 'static',
    },
  );
  const successMessageEl = document.getElementById('successMessage');
  successMessageEl.innerHTML = successMessage;
  successModal.show();
};


/**
 * This creates profile link if authenticated in menu
 */
export const createProfileLink = () => {
  const navigationLinks = document.querySelector('.navigation-links');

  if (storedUser && navigationLinks) {
    const li = document.createElement('li');
    li.innerHTML = `
        <li class="nav-item">
            <a class="nav-link" href="profile.html?profileName=${storedUser.profileName}">Profile</a>
        </li>
    `;
    navigationLinks.appendChild(li);
  }
}

/**
 * redirects to /login.html if not authenticated
 */
export const redirectToLoginIfNotAuthenticated = () => {
  if (!storedUser) {
    window.location.href = '/login.html';
  }
}

/**
 *  redirects to profile if authenticated
 */
export const redirectToProfileIfAuthenticated = () => {
  if (storedUser) {
    window.location.href = `/profile.html?profileName=${storedUser.profileName}`;
  }
};



/**
 * creates logout button in header if authenticated
 */
export const createLogout = () => {
  const authActionsContainer = document.querySelector(
    '.auth-actions-container'
  );
  if (storedUser && authActionsContainer) {
    const logoutButton = `<button type="button" class="btn btn-primary me-2 black-border" id="logoutButton">Logout</button>`;
    authActionsContainer.innerHTML = logoutButton;
  }
};

/**
 * creates login and signup link in header if not authenticated
 */
export const createLoginSignup = () => {
  const authActionsContainer = document.querySelector(
    '.auth-actions-container',
  );

  if (!storedUser && authActionsContainer) { 
    const loginSignup = `
      <a role="button" class="btn btn-primary me-2 black-border" href="login.html">Login</a>
      <a role="button" class="btn btn-primary black-border" href="register.html">Signup</a>
    `;

    authActionsContainer.innerHTML = loginSignup;
  }


}




