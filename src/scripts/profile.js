import { getProfileDetails } from './apis.mjs';
import { redirectToLoginIfNotAuthenticated } from './helpers.mjs';

redirectToLoginIfNotAuthenticated();

const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const profileName = urlParams.get('profileName');

const getProfileData = async () => {
  const profileData = await getProfileDetails(profileName);
  //console.log(profileData);

  const profile = document.querySelector('.profile-value');
  const email = document.querySelector('.email-value');
  const credits = document.querySelector('.credit-score');

  profile.innerHTML = profileData.name;
  email.innerHTML = profileData.email;
  credits.innerHTML = profileData.credits;
};

getProfileData();

const addTagBtn = document.getElementById('addTagBtn');
addTagBtn.addEventListener('click', (evt) => {
  evt.preventDefault();

  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'tag';
  input.classList.add('form-control');
  input.classList.add('mb-3');

  const tagsContainer = document.getElementById('tagsContainer');
  tagsContainer.appendChild(input);
});

const addMediaBtn = document.getElementById('addMediaBtn');
addMediaBtn.addEventListener('click', (evt) => {
  evt.preventDefault();

  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'media';
  input.classList.add('form-control');
  input.classList.add('mb-3');

  const mediaContainer = document.getElementById('mediaContainer');
  mediaContainer.appendChild(input);
});

const createListingForm = document.getElementById('createListingForm');
createListingForm.addEventListener('submit', (evt) => {
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

  console.log(data);
});
