//accessToken - string
//avatar - string
//credits - number
//email - string
//profileName - string
const storedUser = JSON.parse(localStorage.getItem('user'));
import { highestBidAmount } from "./helpers.mjs";

/**
 *
 * @param {*} index
 * @param {*} media
 * @returns
 */
export const carouselComponent = (index, media) => {
  
  let dataHtml = ``;  
  
  if(media.length > 0)  {
    dataHtml = `
          <div class="col-12 col-md-6 px-0">
              <div class="carouselContainer">
                  <div id="carouselExampleIndicators${index}" class="carousel slide">
                      <div class="carousel-indicators">
      `;

    media.map((el, i) => {
      const buttonTarget = `<button type="button" data-bs-target="#carouselExampleIndicators${index}" data-bs-slide-to="${i}" class=${
        i === 0 ? 'active' : ''
      } aria-current="true" aria-label="Slide 1"></button>`;
      dataHtml += buttonTarget;
    });

    dataHtml += `
                      </div>
                      <div class="carousel-inner">
      `;

    media.map((el, i) => {
      const carouselItem = `
              <div class="carousel-item ${i === 0 ? 'active' : ''}">
                  <img src="${el}" class="img-fluid" alt="Carousel Item">
              </div>
        `;

      dataHtml += carouselItem;
    });

    dataHtml += `
                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators${index}" data-bs-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators${index}" data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                      </button>
                  </div>
              </div>
          </div>
      `;
  } else {
    dataHtml = `
      <div class="col-12 col-md-6 px-0 d-flex align-items-center justify-content-center">
        <img class='img-fluid' alt="empty image" src="../../images/emptyimage.jpg"/>
      </div>
    `;
  }

  return dataHtml;
};

/**
 *
 * @param {*} tags
 */
export const tagsComponent = (tags) => {
  let dataHtml = `
        <div class="tagsListContainer mb-3">
    `;
  tags.map((el) => {
    const sanitized = DOMPurify.sanitize(el);
    const tag = `<span class="badge tag-badge rounded-pill text-bg-secondary">${sanitized}</span>`;
    dataHtml += tag;
  });
  dataHtml += `
        </div>
    `;

  return dataHtml;
};

/**
 *
 * @param {*} itemObj
 * @param {*} index
 * @returns
 */
export const listItemContentComponent = (
  itemObj,
  index,
  actionDropdown = true,
) => {
  const {
    created,
    description,
    endsAt,
    media,
    tags,
    title,
    updated,
    _count,
    id,
    seller,
    bids
  } = itemObj;

  let dataHtml;
  if(storedUser) {
    if (storedUser.profileName == seller.name) {
      dataHtml = `
                <div class="row rowListItemContainer mb-5">
                    ${carouselComponent(index, media)}
                    <div class="col-12 col-md-6 py-3 px-0 itemContentInCarouselWrapper">
                        <div class="itemContentInCarousel px-5">
                            <a class="profileNameLink mb-3 d-block" href="profile.html?profileName=${
                              seller.name
                            }">${seller.name}</a>
                            <h3>
                                ${DOMPurify.sanitize(title)}
                            </h3>
                            <p>${DOMPurify.sanitize(
                              description,
                            )}</p>                                      
                            ${tagsComponent(tags)}
                            <div class="datesContainer">
                                <p class="mb-1"><strong>Created:</strong> <span>${created}</span></p>
                                <p class="mb-1"><strong>Updated:</strong> <span>${updated}</span></p>
                                <p class="mb-1"><strong>Ends at:</strong> <span>${endsAt}</span></p>
                                <p><strong>Highest bid:</strong> <span>${highestBidAmount(
                                  bids,
                                )}</span></p>

                                <h5>Bids: </h5>
                                <hr />
                                <div class="biddersContainer d-flex flex-wrap">
    `;

                                bids.map((obj) => {
                                  const bidItemHtml = `<p><strong>${obj.bidderName}</strong><span>${obj.amount}</span></p>`;
                                  dataHtml += bidItemHtml;
                                });
    dataHtml += `                              
                                </div>
                            </div>

                            <div class="btn-group mb-3 mt-2" role="group" aria-label="Bids count group">
                                <button type="button" class="btn btn-warning">Bid's Count</button>
                                <button type="button" class="btn btn-info">${
                                  _count.bids
                                }</button>
                            </div>
                        
                            <hr />
                            <div class="text-center">
                                <button type="button" class="btn btn-primary black-border bidListing" id="${id}">Create Bid</button>
                            </div>


                        </div>

                    </div>
            
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item editListing" id="${id}" href="#">Edit</a></li>
                            <li><a class="dropdown-item deleteListing" id="${id}" href="#">Delete</a></li>
                        </ul>
                    </div>


                </div>
      `;
    } else {
      dataHtml = `
                <div class="row rowListItemContainer mb-5">
                    ${carouselComponent(index, media)}
                    <div class="col-12 col-md-6 py-3 px-0 itemContentInCarouselWrapper">
                        <div class="itemContentInCarousel px-5">
                            <a class="profileNameLink mb-3 d-block" href="profile.html?profileName=${
                              seller.name
                            }">${seller.name}</a>
                            <h3>
                                ${DOMPurify.sanitize(title)}

                            </h3>
                            <p>${DOMPurify.sanitize(
                              description,
                            )}</p>                                      
                            ${tagsComponent(tags)}
                            <div class="datesContainer">
                                <p class="mb-1"><strong>Created:</strong> <span>${created}</span></p>
                                <p class="mb-1"><strong>Updated:</strong> <span>${updated}</span></p>
                                <p class="mb-1"><strong>Ends at:</strong> <span>${endsAt}</span></p>
                                <p><strong>Highest bid:</strong> <span>${highestBidAmount(
                                  bids,
                                )}</span></p>

                                <h5>Bids: </h5>
                                <hr />
                                <div class="biddersContainer d-flex flex-wrap">
     `;
                                bids.map((obj) => {
                                  const bidItemHtml = `<p><strong>${obj.bidderName}</strong><span>${obj.amount}</span></p>`;
                                  dataHtml += bidItemHtml;
                                });
      dataHtml += `
                                </div>
                            </div>

                            <div class="btn-group mb-3 mt-2" role="group" aria-label="Bids count group">
                                <button type="button" class="btn btn-warning">Bid's Count</button>
                                <button type="button" class="btn btn-info">${
                                  _count.bids
                                }</button>
                            </div>
                        
                            <hr />
                            <div class="text-center">
                                <button type="button" class="btn btn-primary black-border bidListing" id="${id}">Create Bid</button>
                            </div>

                        </div>

                    </div>
            
                </div>
      `;
    }
  } else {
    dataHtml = `
        <div class="row rowListItemContainer mb-5">
            ${carouselComponent(index, media)}
            <div class="col-12 col-md-6 py-3 px-0 itemContentInCarouselWrapper">
                <div class="itemContentInCarousel px-5">
                    <h3>${DOMPurify.sanitize(title)}</h3>
                    <p>${DOMPurify.sanitize(
                      description,
                    )}</p>                                      
                    ${tagsComponent(tags)}
                    <div class="datesContainer">
                        <p class="mb-1"><strong>Created:</strong> <span>${created}</span></p>
                        <p class="mb-1"><strong>Updated:</strong> <span>${updated}</span></p>
                        <p class="mb-1"><strong>Ends at:</strong> <span>${endsAt}</span></p>
                        <p><strong>Highest bid:</strong> <span>${highestBidAmount(
                          bids,
                        )}</span></p>

                        <h5>Bids: </h5>
                        <hr />
                        <div class="biddersContainer d-flex flex-wrap">
  `;            
                        bids.map((obj) => {
                          const bidItemHtml = `<p><strong>${obj.bidderName}</strong><span>${obj.amount}</span></p>`;
                          dataHtml += bidItemHtml;
                        });
  dataHtml += `
                        </div>

                    </div>

                    <div class="btn-group mb-3 mt-2" role="group" aria-label="Bids count group">
                        <button type="button" class="btn btn-warning">Bid's Count</button>
                        <button type="button" class="btn btn-info">${
                          _count.bids
                        }</button>
                    </div>
                
                    <hr />
                    <div class="text-center">
                        <a type="button" class="btn btn-primary black-border" href="login.html">Login to bid</a>
                      
                    </div>

                </div>

            </div>
    
        </div>
    `;
  }

  return dataHtml;
};
