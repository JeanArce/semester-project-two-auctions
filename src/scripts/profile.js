import {
  getProfileDetails,
  createEntry,
  getProfileListings,
  deleteListing,
  getListingById,
  updateListing,
  doCreateBid,
  updateProfileMedia,
} from './apis.mjs';
import {
  redirectToLoginIfNotAuthenticated,
  createInput,
  showError,
  showSuccess,
  getErrorMessage,
  generateModal,
  formatDateToReadable,
  formatDateToYearMonthDay,
  disableSubmitSearch,
  generateTooltip,
} from './helpers.mjs';
import { listItemContentComponent } from './components.mjs';

// redirect if not authenticated
redirectToLoginIfNotAuthenticated();

const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const profileName = urlParams.get('profileName');

const getProfileData = async () => {
  const profileData = await getProfileDetails(profileName);

  const profileImage = document.getElementById('profileImage');
  const profile = document.querySelector('.profile-value');
  const email = document.querySelector('.email-value');
  const credits = document.querySelector('.credit-score');
  const bidsWon = document.querySelector('.bids-won');

  profile.innerHTML = profileData.name;
  email.innerHTML = profileData.email;
  credits.innerHTML = profileData.credits;
  bidsWon.innerHTML = profileData.wins.length;
  profileImage.src = profileData.avatar;

  // below for wins data
  const winsData = await Promise.all(
    profileData.wins.map(async (el) => {
      const data = await getListingById(el);
      return data;
    }),
  );

  let winsHtml = ``;
  winsData.map((el) => {
    const link = `<a class="text-info" href="listing.html?id=${el.id}">${el.title}</a>&nbsp;&nbsp;`;
    winsHtml += link;
  });

  generateTooltip(winsHtml);
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

// get profile listings
const doGetProfileListings = async (tag = null) => {
  let profileListings;
  if (tag) {
    profileListings = await getProfileListings(profileName, tag);
  } else {
    profileListings = await getProfileListings(profileName);
  }

  const listing = profileListings.map((el) => {
    el.created = formatDateToReadable(el.created);
    el.updated = formatDateToReadable(el.updated);
    el.endsAt = formatDateToReadable(el.endsAt);

    return el;
  });

  const profileListingsContainer = document.getElementById('profileListings');
  profileListingsContainer.innerHTML = '';

  if (listing.length > 0) {
    listing.map((el, index) => {
      const listItem = listItemContentComponent(el, index);
      profileListingsContainer.innerHTML += listItem;
    }); // end map listings
  } else {
    profileListingsContainer.innerHTML = `<p class="text-center">No listing found.</p>`;
  }
};

doGetProfileListings();

// below for create listing form
const createListingForm = document.getElementById('createListingForm');
createListingForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  const title = formData.get('title');
  const description = formData.get('description');
  const tag = formData.getAll('tag');
  const media = formData.getAll('media');
  const endsAt = formData.get('endsAt');

  const tagsNew = tag.filter((el) => {
    if (el !== '') {
      return el;
    }
  });

  const newMedia = media.filter((el) => {
    if (el !== '') {
      return el;
    }
  });

  const data = {
    title: title,
    description: description,
    tags: tagsNew,
    media: newMedia,
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
      doGetProfileListings();
    }
  } catch (err) {
    console.log(err);
  }
});

// below for delete listing
document.addEventListener('click', async (evt) => {
  if (evt.target.classList.contains('deleteListing')) {
    evt.preventDefault();
    const id = evt.target.id;

    if (confirm('Are you sure you want to delete?') == true) {
      try {
        const deleteList = await deleteListing(id);
        if (deleteList) {
          doGetProfileListings();
          showSuccess('Successfully deleted.');
        } else {
          showError('Something went wrong deleting the list item');
        }
      } catch (e) {
        showError('Something went wrong deleting the list item');
      }
    }
  }
});

// below for edit listing
const updateListingForm = document.getElementById('updateListingForm');
let updateListingModal = '';
let idToEdit;

document.addEventListener('click', async (evt) => {
  if (evt.target.classList.contains('editListing')) {
    evt.preventDefault();
    idToEdit = evt.target.id;
    const id = evt.target.id;
    const listDataById = await getListingById(id);

    updateListingModal = generateModal('updateListingModal');
    updateListingModal.show();

    const titleUpdate = document.getElementById('titleUpdate');
    titleUpdate.value = listDataById.title;
    const descriptionUpdate = document.getElementById('descriptionUpdate');
    descriptionUpdate.value = listDataById.description;
    const endsAtUpdate = document.getElementById('endsAtUpdate');
    endsAtUpdate.value = formatDateToYearMonthDay(listDataById.endsAt);

    // below for tags to edit
    const tagsContainerUpdate = document.getElementById('tagsContainerUpdate');
    listDataById.tags.map((val, index) => {
      if (index > 0) {
        const input = createInput('tag');

        tagsContainerUpdate.appendChild(input);
      }
    });

    const tagsChildElements = tagsContainerUpdate.children;
    const tagsInputArray = Array.from(tagsChildElements);

    listDataById.tags.map((val, index) => {
      const elementIndex = index + 1;
      tagsInputArray[elementIndex].value = val;
    });

    // below for media to edit

    const mediaContainerUpdate = document.getElementById(
      'mediaContainerUpdate',
    );
    listDataById.media.map((val, index) => {
      if (index > 0) {
        const input = createInput('media');

        mediaContainerUpdate.appendChild(input);
      }
    });

    const mediaChildElements = mediaContainerUpdate.children;
    const mediaInputArray = Array.from(mediaChildElements);

    listDataById.media.map((val, index) => {
      const elementIndex = index + 1;
      mediaInputArray[elementIndex].value = val;
    });
  }
});

const addTagBtnUpdate = document.getElementById('addTagBtnUpdate');
addTagBtnUpdate.addEventListener('click', (evt) => {
  evt.preventDefault();

  const input = createInput('tag');

  const tagsContainerUpdate = document.getElementById('tagsContainerUpdate');
  tagsContainerUpdate.appendChild(input);
});

const addMediaBtnUpdate = document.getElementById('addMediaBtnUpdate');
addMediaBtnUpdate.addEventListener('click', (evt) => {
  evt.preventDefault();

  const input = createInput('media');

  const mediaContainerUpdate = document.getElementById('mediaContainerUpdate');
  mediaContainerUpdate.appendChild(input);
});

document
  .getElementById('updateListingModal')
  .addEventListener('hidden.bs.modal', function () {
    updateListingForm.reset();

    const defaultTags = `
    <label for="tagsUpdate" class="form-label">Tags</label>
    <input type="text" name="tag" id="tagsUpdate" class="form-control mb-3">
  `;

    const tagsContainerUpdate = document.getElementById('tagsContainerUpdate');
    tagsContainerUpdate.innerHTML = defaultTags;

    const defaultMedia = `
    <label for="mediaUpdate" class="form-label">Media</label>
    <input type="text" name="media" id="mediaUpdate" class="form-control mb-3">
  `;

    const mediaContainerUpdate = document.getElementById(
      'mediaContainerUpdate',
    );
    mediaContainerUpdate.innerHTML = defaultMedia;
  });

updateListingForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  const title = formData.get('title');
  const description = formData.get('description');
  const tag = formData.getAll('tag');
  const media = formData.getAll('media');
  const endsAt = formData.get('endsAt');

  const tagsNew = tag.filter((el) => {
    if (el !== '') {
      return el;
    }
  });

  const newMedia = media.filter((el) => {
    if (el !== '') {
      return el;
    }
  });

  const data = {
    title: title,
    description: description,
    tags: tagsNew,
    media: newMedia,
    endsAt: new Date(endsAt),
  };

  try {
    const updateEntry = await updateListing(data, idToEdit);

    updateListingModal.hide();

    if (updateEntry.errors) {
      const errorMessage = getErrorMessage(updateEntry);
      showError(errorMessage);
    } else {
      showSuccess('Successfully updated entry');
      doGetProfileListings();
      const searchInput = document.getElementById('searchInput');
      searchInput.value = '';
    }
  } catch (err) {
    console.log(err);
  }
});

// below for create bidding
const createBiddingForm = document.getElementById('createBiddingForm');
let createBidModal;
let idToBid;
document.addEventListener('click', async (evt) => {
  if (evt.target.classList.contains('bidListing')) {
    evt.preventDefault();
    idToBid = evt.target.id;
    const id = evt.target.id;

    const listDataById = await getListingById(id);

    const bidTitle = document.getElementById('bidTitle');
    bidTitle.innerText = listDataById.title;

    createBidModal = generateModal('createBidModal');
    createBidModal.show();
  }
});

createBiddingForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const amount = parseInt(formData.get('amount'));
  const data = {
    amount: amount,
  };

  try {
    const createBid = await doCreateBid(data, idToBid);

    createBidModal.hide();

    if (createBid.errors) {
      const errorMessage = getErrorMessage(createBid);
      showError(errorMessage);
    } else {
      showSuccess('Bidding Successful');
      doGetProfileListings();
    }
  } catch (err) {
    console.log(err);
  }
});

// below for search
const searchInput = document.getElementById('searchInput');

const typingDelay = 500;
let typingTimer;

const onTypingFinished = () => {
  const searchValue = searchInput.value.trim();

  if (searchValue == '') {
    doGetProfileListings();
  } else {
    doGetProfileListings(searchValue);
  }
};

searchInput.addEventListener('input', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(onTypingFinished, typingDelay);
});

// disable form submission below
disableSubmitSearch();

// below for edit
const updateMediaForm = document.getElementById('updateMediaForm');
const editPencil = document.getElementById('editPencil');
let updateMediaModal;

editPencil.addEventListener('click', () => {
  updateMediaModal = generateModal('updateMediaModal');
  updateMediaModal.show();
});

updateMediaForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const media = formData.get('media');

  const data = {
    avatar: media,
  };

  try {
    const updateMedia = await updateProfileMedia(data, profileName);
    updateMediaModal.hide();
    if (updateMedia.errors) {
      const errorMessage = getErrorMessage(updateMedia);
      showError(errorMessage);
    } else {
      showSuccess('Successfully updated media');
      getProfileData();
    }
  } catch (error) {
    console.log(error);
  }
});
