import {
  getPublicListings,
  getListingById,
  doCreateBid,
  deleteListing,
  updateListing,
} from './apis.mjs';
import { listItemContentComponent } from './components.mjs';
import {
  formatDateToReadable,
  showSuccess,
  showError,
  getErrorMessage,
  generateModal,
  formatDateToYearMonthDay,
  createInput,
  disableSubmitSearch,
} from './helpers.mjs';

const getPublicListingsData = async (tag = null) => {
  let listingData;
  if (tag) {
    listingData = await getPublicListings(tag);
  } else {
    listingData = await getPublicListings();
  }

  const listing = listingData.map((el) => {
    el.created = formatDateToReadable(el.created);
    el.updated = formatDateToReadable(el.updated);
    el.endsAt = formatDateToReadable(el.endsAt);

    return el;
  });

  const auctionListingsContainer = document.getElementById('auctionListings');
  auctionListingsContainer.innerHTML = '';

  if (listing.length > 0) {
    listing.map((el, index) => {
      const listItem = listItemContentComponent(el, index);
      auctionListingsContainer.innerHTML += listItem;
    }); // end map listings
  } else {
    auctionListingsContainer.innerHTML = `<p class="text-center">No listing found.</p>`;
  }
};

getPublicListingsData();

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
      if (globalSearchValue) {
        getPublicListingsData(globalSearchValue);
      } else {
        getPublicListingsData();
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// below for search
let globalSearchValue = null;
const searchInput = document.getElementById('searchInput');

const typingDelay = 500;
let typingTimer;

const onTypingFinished = () => {
  const searchValue = searchInput.value.trim();
  if (searchValue == '') {
    globalSearchValue = null;
    getPublicListingsData();
  } else {
    globalSearchValue = searchValue;
    getPublicListingsData(searchValue);
  }
};

searchInput.addEventListener('input', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(onTypingFinished, typingDelay);
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
          if (globalSearchValue) {
            getPublicListingsData(globalSearchValue);
          } else {
            getPublicListingsData();
          }
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

      if (globalSearchValue) {
        getPublicListingsData(globalSearchValue);
      } else {
        getPublicListingsData();
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// disable submit search
disableSubmitSearch();
