// This causes an infinite loop
// window.open('index.html');


// // Text copied from a web page preserves the original formatting even when it's pasted into another application.
// // This is inconvenient. I have to manually remove the formatting.
// // The following piece of code removes such formatting.

// document.body.addEventListener('copy', async () => {
// 	// Let `text` be the text from the current selection.
// 	const text = document.getSelection().toString();
// 	// Write to the clipboard.
// 	const promise = await navigator.clipboard.writeText(text);
// 	// Let me know when `text` has been written to the clipboard.
// 	// alert();
// });


// {
// 	const map = new Map([
// 		['A', 10],
// 		['BUTTON', 10],
// 		['H1', 10],
// 		['H2', 10],
// 		['H3', 10],
// 		['H4', 10],
// 		['H5', 10],
// 		['H6', 10],
// 		['LABEL', 10],
// 		['OPTION', 10],
// 		['P', 80],
// 	]);

// 	const sentence = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, est reprehenderit! Rem iste ea voluptates, nisi itaque, facilis adipisci repellendus voluptatum assumenda, totam voluptas. Quod vitae eos consectetur assumenda ex.";
// 	const words = new List(...sentence.split(' '));

// 	const selector = ['h1, h2, h3, h4, h5, h6, label, option, p'];

// 	const elements = document.querySelectorAll(selector);

// 	for (const element of elements) {
// 		const name = element.nodeName;

// 		let counter = map.get(name);
// 		const randomWords = [];

// 		while (counter--) {
// 			const randomWord = words.sample();
// 			randomWords.push(randomWord);
// 		}

// 		element.textContent = randomWords.join(" ");
// 	}
// }



// /* This piece of code selects a table, creates rows and adds them to the table. 
// */

// {
// 	let count = 4;
	
// 	const tbody = document.querySelector('tbody');
// 	const row = tbody.querySelector('tr:last-of-type');

// 	const clones = [];

// 	while (count--) {
// 		const clone = row.cloneNode(true);

// 		// TO DO: Erase text from each cell.
// 		clones.push(clone);
// 	}

// 	tbody.append(...clones);
// }



// /* This piece of code updates the id of each business rule located in the "id"
// column of the "business rules" table. For example, 'BR-1', 'BR-2'. This is useful 
// when rows are inserted in the table. It avoids manual updating of the id of each 
// business rule. */

// const selector = 'td:first-of-type';

// $0.querySelectorAll(selector).forEach((e, index) => {    
//     e.textContent = `BR-${index + 1}`; 
// });


// // This piece of code tells you which credit card is the best. 

// const rows = [...document.querySelectorAll('.CardTiles_cardTile__TqJp1')];

// const selectors = {
//     cardName: '.CardTiles_cardNameText___jD2u',
//     bonusPoints: '.CardTiles_bonusPointsContainer__zjvF_ .CardTiles_numberWrapper__M5m5_',
//     earnRate: '.CardTiles_earnRateContainer___TGZm .CardTiles_numberWrapper__M5m5_',
//     annualFee: '.CardTiles_annualFee__asmLx .CardTiles_numberWrapper__M5m5_',
// };

// const dataSets = rows.map(row => {
//     const cardName = row.querySelector(selectors.cardName).textContent;
//     const bonusPoints = +((row.querySelector(selectors.bonusPoints)?.textContent || '0')).replace(',', '') * 0.018;
//     const earnRate = ((+row.querySelector(selectors.earnRate)?.textContent || '0') * 24000) * 0.018;
//     const annualFee = +((row.querySelector(selectors.annualFee)?.textContent || '0')).replace(/[$,]/g, '');

//     const benefit = bonusPoints - annualFee + earnRate;

    

//     return {
//         benefit,
//         cardName,
//         bonusPoints,
//         earnRate,
//         annualFee,
//     }
// });

// dataSets.sort((a, b) => {
//     const benefitA = a.benefit;
//     const benefitB = b.benefit;

//     return benefitB - benefitA;
// });


const attributes = ['aria-errormessage', 'aria-invalid', 'aria-required', 'autocomplete'];
const formFields = document.querySelectorAll('input:not([type=submit]), select, textarea');

const map = new Map();

for (const formField of formFields) {
    const label = formField.labels?.[0]?.textContent;
    const results = [];

    for (const attribute of attributes) {

        if (formField.hasAttribute(attribute)) {
            const value = formField.getAttribute(attribute);

            results.push(`"${label}" form field has attribute ${attribute} with a value of "${value}".`);
        }
        else {
            results.push(`"${label}" form field doesn't have attribute ${attribute}.`);
        }
    }

    map.set(formField, results);
}

const parser = new DOMParser();


for (const [formField, results] of map) {
    const label = formField.labels?.[0]?.textContent;
    const strings = [];

    for (const result of results) {
        const string = `
            <li>
                ${result}
            </li>
        `;

        strings.push(string);
    }

    const start = `<ul class="accessibility-test-case">`;
    const end = `</ul>`;

    strings.unshift(start);
    strings.push(end);

    const list = parser.parseFromString(strings.join(''), 'text/html').querySelector('ul');
    formField.after(list);
}


const style = `
<style>

.accessibility-test-case {
    padding: 2rem;
    background: lightblue;
    border: solid;
}

</style>`
;

const element = parser.parseFromString(style, 'text/html').querySelector('style');
document.body.append(element);