/* This piece of code replaces the image of a test case with a link to that image. For context, images occupy too much space in a cell which bloats up the size of a table. An image can be replaced by a link which only occupies one line of text. This link is associated with the image. When the link is activated, the associated image is shown. */

// Let `tbody` be the body of a table.
const tbody = $0;

if (tbody.nodeName !== 'TBODY') {
    alert('Error!');
}

// Let `selector` be a CSS selector.
const selector = 'tr';

// Let `rows` be each row in `tbody`.
const rows = [...tbody.querySelectorAll(selector)];

// Let `dataSets` be an initially empty list of data sets.
const dataSets = [];

// For each row `row` in `rows`.
for (const row of rows) {
    // Let `component` be the name of the user interface component that has been tested.
    const component = row.querySelector('td:nth-of-type(1)').textContent.replace('Component:', '');

    // Let `webPage` be the web page on which `component` has been tested.
    const webPage = row.querySelector('td:nth-of-type(3) a').outerHTML;

    // Let `defects` be a list of defects that `component` has.
    const defects = [...row.querySelectorAll('td:nth-of-type(6) li')].map(li => li.textContent);

    // Let `screenshots` be a list of screenshots each of which illustrating defects in `defects`.
    const screenshots = [...row.querySelectorAll('td:nth-of-type(7) li')].map(li => [...li.querySelectorAll('a')]);

    // For each defect `defect` in defects.
    for (const defect of defects) {
        // Let `title` be the title of `defect`.
        const title = `Accessibility: ${component.trim()} component - ${defect.trim()}`;

        // Let `dataSet` be information about `defect`.
        const dataSet = {
            title, component, webPage, screenshots: screenshots.shift()
        };

        dataSets.push(dataSet);
    }
}
// Let `tab` be a new browser tab.
const tab = window.open();

const templates = [];

for (const {title, component, webPage, screenshots} of dataSets) {
    const template = `
    <details>
        <summary>${title}</summary>

        <h3><b>${title}</b></h3>

        <h3><b>WCAG Success Criterion:</b></h3>
        <p>
            Level AA <a href="https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html">Success Criterion 1.4.4 Resize Text</a>
        </p>

        <h3><b>Description:</b></h3>
        <p>Lorem ipsum...</p>

        <h3><b>Steps to reproduce</b></h3>
        <ol>
            <li>Navigate to the ${webPage} web page.</li>
            <li>Locate the <b>${component}</b> component.</li>
        </ol>

        <h3><b>Expected Behaviour</b></h3>
        <p>Lorem ipsum...</p>

        <h3><b>Actual Behaviour</b></h3>
        <p>Lorem ipsum...</p>

        <h3><b>Solution</b></h3>
        <p>Lorem ipsum...</p>

        <h3><b>Further details</b></h3>
        <p>Tested on Chrome.</p>
        <p>Tested on Safari with Voice Over.</p>

        <h3><b>Screenshots</b></h3>
        <ul>
            ${screenshots?.map(screenshot => {
                return `<li><img src="${screenshot.href}" height="400"/></li>`
            })};
        </ul>
    </details>
    `;

    templates.push(template);
}

const template = templates.join('');
const elements = (new DOMParser).parseFromString(template, 'text/html').querySelectorAll('details');

tab.document.body.append(...elements);
