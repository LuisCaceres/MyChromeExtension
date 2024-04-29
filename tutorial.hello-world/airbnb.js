
// IMPORTANT: MAKE SURE THAT YOUR INTERNET BROWSER ALLOWS POP-UPS AND REDIRECTS ON AIRBNB. CHECK THE SETTINGS OF YOUR BROWSER FOR MORE INFORMATION.

// IMPORTANT: THIS PROGRAM CURRENTLY ONLY WORKS WITH BOOKING ENTIRE PLACES AS OPPOSED TO BOOKING ONLY A ROOM AT A HOST'S PLACE.
// TO DO: IF RUNNING A NEW SEARCH LET'S MAKE SURE THAT WE REUTILISE THE SAME DATA

// TO DO: ADD A TIMER TO KNOW HOW LONG IT'S GOING TO TAKE TO COLLECT DATA
// TO DO: ADD A TIMER TO KNOW HOW LONG IT'S GOING TO TAKE TO COLLECT DATA


class Numero {
    static parseFromString(n) {
        return +n.replace(/[^\d\.]/g, '');
    }
}

alert('Make sure youre only looking for entire places!');

const selectors = {
    IMAGES: 'main#site-content .itu7ddv',
    PAGE: '.c1ackr0h',
    PAGE_LAST: '.c1ackr0h:nth-last-child(2)',
    PLACE: '.gsgwcjk .c4mnd7m',
    URL: `.bn2bl2p`,
};

const keys = {
    cancellationDate: '[data-section-id*="POLICIES"]',
    numberOfBathrooms: '[data-section-id*="OVERVIEW"]',
    numberOfBedrooms: '[data-section-id*="OVERVIEW"]',
    numberOfBeds: '[data-section-id*="OVERVIEW"]',
    numberOfGuests: '[data-section-id*="OVERVIEW"]',
    price: '[data-section-id*="BOOK_IT_SIDEBAR"]',
    rating: '[data-section-id*="REVIEWS"]',
    sleepingArrangement: '[data-section-id*=SLEEPING_ARRANGEMENT]',
    title: '[data-section-id*="TITLE"]',
};

// TO DO: VERIFY THAT EACH SELECTOR IN `selectors` RETRIEVES ELEMENTS.
// BECAUSE CLASS TOKENS MAY BE REPLACED OFTEN PERHAPS IT'S BEST TO RETREIVE ELEMENTS BASED ON ITS CONTENT RATHER THAN THE STRUCTURE OF THE WEB PAGE
if (document.querySelector(selectors.PLACE) === null) {
    throw Error(`CSS selector PRICE failed to match any elements on this web page! 
        The DOM of this web page may have been updated. Class tokens stored in this file may no longer be present.`);
}

const regExps = {
    // Matches `before 3:00 pm on 8 Jan` in `Free cancellation before 3:00 pm on 8 Jan.`
    cancellationDate: /(?<=Cancellation\spolicy).+?\./,
    // Matches `4076976` in `https://www.airbnb.com.au/rooms/plus/4076976?adults=1&category_tag=Tag%3A677&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=1213407150&search_mode=flex_destinations_search&check_in=2024-01-15&check_out=2024-01-20&source_impression_id=p3_1697973251_cZkyjw2YuDQQ9zh9&previous_page_section_name=1000&federated_search_id=046f29e1-a481-4714-8454-558d6ff322d8'.
    id: /(?<=\/)\d+/,
    // Matches `1` in `1 bath` or '2.5' in '2.5 baths'.
    numberOfBathrooms: /\d+(\.\d+)?(?=\sbath)/,
    // Matches `1` in `1 bedroom`.
    numberOfBedrooms: /\d+(\.\d+)?(?=\sbedroom)/,
    // Matches `2` in `2 beds` but not `1` in `1 bedroom`.
    numberOfBeds: /\d+(\.\d+)?(?=\sbed(?!r))/,
    // Matches `3` in `3 guests` or `16+` in `16 guests`.
    numberOfGuests: /(\d+)(?=\+?\sguest)/,
    // Matches `15,974.00` in `$15,974.00 AUD total`.
    price: /(?<=\$)\d+(,\d+)?(\.\d+)?(?=\sAUD\stotal)/,
    // Matches `4.91` in `Rated 4.91 out of 5 stars`.
    rating: /^\d+(\.\d+)?(?=\sout\sof\s5\sstars)/,
    // Matches `1 B/R Apartment Smack bang on Coogee Beach` in `1 B/R Apartment Smack bang on Coogee BeachShareSave`.
    title: /^.+?(?=ShareSave)/,
    
};

// Let `urls` be an initally empty list of urls each referencing a web page about an Airbnb place.
const ids = new Set();

async function execute() {
    // Get the number of pages that the pagination component consists of.
    // NOTE: The pagination component may not be present on the first page because there are few places available.

    const numberOfPages = +document.querySelector(selectors.PAGE_LAST)?.textContent || 1;

    // For each page `page` from the pagination component.
    for (let i = 1; i <= numberOfPages; i++) {

        if (numberOfPages > 1) {
            const pages = [...document.querySelectorAll(selectors.PAGE)];
            // Let `page` be the current page.
            const page = pages.find(page => +page.textContent === i);
            
            // Activate `page`.
            page.click();

            // Pause code execution for a number of seconds before proceeding. This is 
            // so that Airbnb doesn't interpret this as a denial of service attack.
            await new Promise(resolve => {
                setTimeout(resolve, 3000);
            });        
        }
        
        // Let `places` be a list of Airbnb places shown on `page`.
        const places = [...document.querySelectorAll(selectors.PLACE)];

        // For each place `place` in `places`.
        for (const place of places) {
            // Let `url` be the url of the web page that contains detailed information about `place`.
            const id = place.querySelector(selectors.URL).href.match(regExps.id)?.[0];

            // Add `url` to `urls`.
            ids.add(id);
        }
    }

    // Let `tab` be a separate browser tab.
    const tab = window.open();

    // For each url `url` in `urls`.
    for (const id of ids) {

        // If `url` has previously been loaded.
        if (sessionStorage.getItem(id) !== null) {
            // Ignore `url`.
            continue;
        }

        // Load `url` in `tab`. 
        tab.location.href = `https://www.airbnb.com.au/rooms/${id}`;

        // Wait until `tab` has finished loading the web page that `url` points to.
        await waitUntil(() => tab.document.readyState === 'complete');

        // Wait for another 3 seconds to ensure that `tab` has enough time to load the web page that `url` points to.
        // NOTE: A time-based approach seems to be sensible. Verifying the existance
        // of strings of text or elements in the DOM tree of `tab` has already been
        // tried. However, that approach is complex and prone to bugs.
        await new Promise(resolve => {
            setTimeout(resolve, 6000);
        });

        // Let `dataSet` be a dictionary of information about `url`.
        const dataSet = {
            images: [...tab.document.querySelectorAll(selectors.IMAGES)].map(image => image.src),
            id: id
        };

        // For each key `key` in `keys`.
        for (const key in keys) {
            // Let `data` be a relevant piece of information about `url`.
            const data = tab.document.querySelector(keys[key])?.textContent.match(regExps[key])?.[0];

            if (key.startsWith('number') || key.startsWith('rating')) {
                dataSet[key] = +data;    
            }
            else if (key === 'price') {
                dataSet[key] = +data?.replace(',', '');
            }
            else {
                dataSet[key] = data;
            }
        }

        // Add `dataSet` to `dataSets`.
        // dataSets.push(dataSet);
        sessionStorage.setItem(id, JSON.stringify(dataSet));
    }

    // Let `dataSets` be an initally empty list of data sets with information about Airbnb places.
    const dataSets = [];

    for (const id of ids) {
        const item = localStorage.getItem(id);
        const dataSet = JSON.parse(item);
        dataSets.push(dataSet);
    }

    // Let `results` be an initally empty list of Airbnb places that meet certain search criteria.
    const results = [];

    // Filter functionality
    results.length = 0;
    results.push(...dataSets.filter(place => {

        return place.cancellationDate?.includes('48 hours') === false &&
            place.numberOfGuests <= 4 &&
            place.numberOfBedrooms <= 2;
        // place.numberOfBathrooms <=1; 
        // place.numberOfBeds <=1 &&
        // place.bedType.includes('queen');
    }));

    results.sort((result1, result2) => result2.rating - result1.rating);

    const HTMLParser = new DOMParser();

    const ul = document.createElement('ul');

    for (const result of results) {
        const template = `
            <li>
                <a href="${result.id}" target="_blank">
                    <h2>${result.title}</h2>
                </a>
                <dl>
                    <dt>Price:</dt>
                    <dd>$${result.price} AUD</dd>
                    <dt>Rating:</dt>
                    <dd>${result.rating}</dd>
                    <dt>Cancellation policy:</dt>
                    <dd>${result.cancellationDate}</dd>
                    <dt>Number of guests:</dt>
                    <dd>${result.numberOfGuests}</dd>
                    <dt>Number of bedrooms:</dt>
                    <dd>${result.numberOfBedrooms}</dd>
                    <dt>Number of beds:</dt>
                    <dd>${result.numberOfBeds}</dd>
                    <dt>Bed types:</dt>
                    <dd>${result.sleepingArrangement}</dd>
                    <dt>Number of bathrooms:</dt>
                    <dd>${result.numberOfBathrooms}</dd>
                </dl>
                <ul class="images" aria-label="images">
                </ul>
            </li>
        `;

        const fragment = HTMLParser.parseFromString(template, 'text/html');

        const images = fragment.querySelector('ul');
        images.append(...result.images);

        ul.append(...fragment.body.children);
    }

    const w = window.open();

    const style = w.document.createElement('style');
    style.textContent = `
        * {
            box-sizing: border-box;
        }

        dd {
            margin-inline-start: 0.2rem;
            margin-inline-end: 1.5rem;
            font-weight: bold;
        }

        dl {
            display: flex;
            width: max-content;
        }

        img {
            flex: 1 0 350px;
            height: 200px;
            border: solid;
            object-position: center;
            object-fit: cover;
        }

        ul {
            padding-inline-start: 0;
            overflow: auto;
        }

        .images {
            display: flex;
            gap: 0.5rem;
        }
        `;

    w.document.body.append(ul, style);

    console.log('Done!');
}


/**
 * 
 * @param {*} callback 
 * @param  {...any} arguments 
 * @returns 
 */
function waitUntil(callback, ...arguments) {
    let counter = 0;

    return new Promise(resolve => {
        const id = setInterval(() => {
            counter++;

            if (counter > 10) {
                clearInterval(id);
                resolve(false);
            }

            const boolean = callback(...arguments);

            if (boolean === true) {
                clearInterval(id);
                resolve(true);
            }
        }, 1000);
    });
}
