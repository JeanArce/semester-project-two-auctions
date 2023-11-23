//accessToken - string
//avatar - string
//credits - number
//email - string
//profileName - string
const storedUser = JSON.parse(localStorage.getItem('user'));
const baseUrl = 'https://api.noroff.dev/api/v1';

/**
 *
 * @param {*} data
 * @returns
 */
export const registerApi = async (data) => {
  const registerEndpoint = baseUrl + '/auction/auth/register';
  const executeRegister = await fetch(registerEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const registerData = await executeRegister.json();
  return registerData;
};

/**
 *
 * @param {*} data
 * @returns
 */
export const loginApi = async (data) => {
  const loginEndpoint = baseUrl + '/auction/auth/login';
  const executeLogin = await fetch(loginEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
  });

  const loginData = await executeLogin.json();
  return loginData;
};


/**
 * 
 * @param {*} profileName 
 * @returns 
 * gets profile data, pass profileName
 */
export const getProfileDetails = async (profileName) => {
  const profileEndpoint = baseUrl + `/auction/profiles/${profileName}`;
  const getProfileData = await fetch(profileEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${storedUser.accessToken}`,
    },
  });

  const profileData = await getProfileData.json();
  return profileData;
};
