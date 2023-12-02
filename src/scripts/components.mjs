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
        const tag = `<span class="badge rounded-pill text-bg-secondary">${el}</span>`;
        dataHtml += tag;
    })
    dataHtml += `
        </div>
    `;

    return dataHtml;
};