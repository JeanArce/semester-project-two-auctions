import { getProfileDetails, createEntry, getProfileListings } from './apis.mjs';
import {
  redirectToLoginIfNotAuthenticated,
  createInput,
  showError,
  showSuccess,
  getErrorMessage,
  generateModal,
  formatDateToReadable,
} from './helpers.mjs';
import { listItemContentComponent } from './components.mjs';

redirectToLoginIfNotAuthenticated();

const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const profileName = urlParams.get('profileName');

const getProfileData = async () => {
  const profileData = await getProfileDetails(profileName);
  const profile = document.querySelector('.profile-value');
  const email = document.querySelector('.email-value');
  const credits = document.querySelector('.credit-score');

  profile.innerHTML = profileData.name;
  email.innerHTML = profileData.email;
  credits.innerHTML = profileData.credits;
};

getProfileData();

let createListingModal;

const createListingOpenBtn = document.getElementById('createListingOpenBtn');

createListingOpenBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  createListingModal = generateModal('createListingModal');
  createListingModal.show();
});

const addTagBtn = document.getElementById('addTagBtn');
addTagBtn.addEventListener('click', (evt) => {
  evt.preventDefault();

  const input = createInput('tag');

  const tagsContainer = document.getElementById('tagsContainer');
  tagsContainer.appendChild(input);
});

const addMediaBtn = document.getElementById('addMediaBtn');
addMediaBtn.addEventListener('click', (evt) => {
  evt.preventDefault();

  const input = createInput('media');

  const mediaContainer = document.getElementById('mediaContainer');
  mediaContainer.appendChild(input);
});

const createListingForm = document.getElementById('createListingForm');
createListingForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  const title = formData.get('title');
  const description = formData.get('description');
  const tag = formData.getAll('tag');
  const media = formData.getAll('media');
  const endsAt = formData.get('endsAt');

  const data = {
    title: title,
    description: description,
    tags: tag,
    media: media,
    endsAt: new Date(endsAt),
  };

  //console.log(data);
  try {
    const createEntryExec = await createEntry(data);
    //console.log(createEntryExec);
    createListingModal.hide();

    if (createEntryExec.errors) {
      const errorMessage = getErrorMessage(createEntryExec);
      showError(errorMessage);
    } else {
      createListingForm.reset();
      showSuccess('Successfully created entry');
    }
  } catch (err) {
    console.log(err);
  }
});

// get profile listings
const doGetProfileListings = async () => {
  const profileListings = await getProfileListings(profileName);
  const listing = profileListings.map((el) => {
    el.created = formatDateToReadable(el.created);
    el.updated = formatDateToReadable(el.updated);
    el.endsAt = formatDateToReadable(el.endsAt);

    return el;
  });

  console.log(listing);

  const profileListingsContainer = document.getElementById('profileListings');
  profileListingsContainer.innerHTML = '';

  listing.map((el, index) => {
    const listItem = listItemContentComponent(el, index);
    profileListingsContainer.innerHTML += listItem;
  }); // end map listings
};

doGetProfileListings();
