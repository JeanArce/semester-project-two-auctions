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


/**
 * 
 * @param {*} data 
 * @returns 
 */
export const createEntry = async(data) => {
  const createEntryEndpoint = baseUrl + `/auction/listings`;

  const createEntry = await fetch(createEntryEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${storedUser.accessToken}`
    },
  });

  const createEntryData = await createEntry.json();
  return createEntryData;

};

/**
 * 
 * @param {*} name 
 */
export const getProfileListings = async(name) => {
  const getProfileEndpoint = baseUrl + `/auction/profiles/${name}/listings`;
  const getProfileList = await fetch(getProfileEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${storedUser.accessToken}`,
    },
  });

  const getProfileListData = await getProfileList.json();
  return getProfileListData;
};


export const deleteListing = async(id) => {
  const deleteListingEndpoint = baseUrl + `/auction/listings/${id}`;
  const executeFetch = await fetch(deleteListingEndpoint, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${storedUser.accessToken}`
    },
  });
 
  if(executeFetch.ok) {
    return true;
  } else {
    return false;
  }
};


/**
 * 
 * @param {*} data 
 * @param {*} id 
 * @returns 
 */
export const updateListing = async(data, id) => {
  const updateEntryEndpoint = baseUrl + `/auction/listings/${id}`;

  const updateEntry = await fetch(updateEntryEndpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${storedUser.accessToken}`,
    },
  });

  const updateEntryData = await updateEntry.json();
  return updateEntryData;
};


/**
 * 
 * @param {*} id 
 * @returns 
 */
export const getListingById = async(id) => {
  const getListingIdByEndpoint = baseUrl + `/auction/listings/${id}`;

  const getListing = await fetch(getListingIdByEndpoint, {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    },
  });

  const getListingData = await getListing.json();

  return getListingData;
};
