import { getPublicListings, getListingById, doCreateBid } from './apis.mjs';
import { listItemContentComponent } from './components.mjs';
import {
  formatDateToReadable,
  showSuccess,
  showError,
  getErrorMessage,
} from './helpers.mjs';
import { generateModal } from './helpers.mjs';
doCreateBid;

const getPublicListingsData = async () => {
  const listingData = await getPublicListings();
  console.log(listingData);

  const listing = listingData.map((el) => {
    el.created = formatDateToReadable(el.created);
    el.updated = formatDateToReadable(el.updated);
    el.endsAt = formatDateToReadable(el.endsAt);

    return el;
  });

  const auctionListingsContainer = document.getElementById('auctionListings');
  auctionListingsContainer.innerHTML = '';

  listing.map((el, index) => {
    const listItem = listItemContentComponent(el, index, false);
    auctionListingsContainer.innerHTML += listItem;
  }); // end map listings
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
      showSuccess('Bidding Successful');
      getPublicListingsData();
    }
  } catch (err) {
    console.log(err);
  }
});
