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
export const getProfileListings = async(name, tag=null) => {
  let getProfileEndpoint;

  if(tag) {
    getProfileEndpoint = baseUrl + `/auction/profiles/${name}/listings?_seller=true&_bids=true&_tag=${tag}`;
  } else {
    getProfileEndpoint = baseUrl + `/auction/profiles/${name}/listings?_seller=true&_bids=true`;
  }
 
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
  const getListingIdByEndpoint =
    baseUrl + `/auction/listings/${id}?_seller=true&_bids=true`;

  const getListing = await fetch(getListingIdByEndpoint, {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    },
  });

  const getListingData = await getListing.json();

  return getListingData;
};


/**
 * 
 * @param {*} data 
 * @param {*} id 
 * @returns 
 */
export const doCreateBid = async(data, id) => {
  const createBidEndpoint = baseUrl + `/auction/listings/${id}/bids`;

  const createBidEntry = await fetch(createBidEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${storedUser.accessToken}`,
    },
  });

  const createBidEntryData = await createBidEntry.json();
  return createBidEntryData;
}; 


/**
 * 
 * @returns 
 */
export const getPublicListings = async(tag=null) => {
  let publicListingsEndpoint;
  if(tag) {
    publicListingsEndpoint =
      baseUrl + `/auction/listings?_active=true&_seller=true&_bids=true&_tag=${tag}`;
  } else {
    publicListingsEndpoint =
      baseUrl + `/auction/listings?_active=true&_seller=true&_bids=true`;
  }
  

  const getListings = await fetch(publicListingsEndpoint);
  const listingsData = await getListings.json();
  return listingsData;
}

/**
 * 
 * @param {*} profileName 
 */
export const getProfileBids = async(profileName) => {

  const profileBidsEndpoint =
    baseUrl + `/auction/profiles/${profileName}/bids?_listing=true`;
  const getProfileBids = await fetch(profileBidsEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${storedUser.accessToken}`,
    },
  });

  const getProfileBidsData = await getProfileBids.json();

  return getProfileBidsData;
};


/**
 * 
 * @param {*} data 
 * @param {*} profileName 
 * @returns 
 */
export const updateProfileMedia = async(data, profileName) => {
  
  const updateProfileMediaEndpoint = baseUrl + `/auction/profiles/${profileName}/media`;
  const updateMedia = await fetch(updateProfileMediaEndpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${storedUser.accessToken}`,
    },
  });

  const updateMediaData = await updateMedia.json();
  return updateMediaData;

};