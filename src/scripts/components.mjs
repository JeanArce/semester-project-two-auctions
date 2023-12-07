/**
 * 
 * @param {*} index 
 * @param {*} media 
 * @returns 
 */
export const carouselComponent = (index, media) => {
   
    let dataHtml = `
        <div class="col-12 col-md-6 px-0">
            <div class="carouselContainer">
                <div id="carouselExampleIndicators${index}" class="carousel slide">
                    <div class="carousel-indicators">
    `;

    media.map((el, i) => {
        const buttonTarget = `<button type="button" data-bs-target="#carouselExampleIndicators${index}" data-bs-slide-to="${i}" class=${i === 0 ? 'active' : ''} aria-current="true" aria-label="Slide 1"></button>`;                
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
    })
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
export const listItemContentComponent = (itemObj, index, actionDropdown=true) => {
  const { created, description, endsAt, media, tags, title, updated, _count, id } = itemObj;

    let dataHtml;

    if (actionDropdown) {
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
                            <p><strong>Ends at:</strong> <span>${endsAt}</span></p>
                        </div>

                        <div class="btn-group mb-3" role="group" aria-label="Bids count group">
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
                        <h3>${DOMPurify.sanitize(title)}</h3>
                        <p>${DOMPurify.sanitize(
                          description,
                        )}</p>                                      
                        ${tagsComponent(tags)}
                        <div class="datesContainer">
                            <p class="mb-1"><strong>Created:</strong> <span>${created}</span></p>
                            <p class="mb-1"><strong>Updated:</strong> <span>${updated}</span></p>
                            <p><strong>Ends at:</strong> <span>${endsAt}</span></p>
                        </div>

                        <div class="btn-group mb-3" role="group" aria-label="Bids count group">
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

    return dataHtml;
};