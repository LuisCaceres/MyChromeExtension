// Let `cell` be a table cell.
const cell = $0;

if (cell.nodeName !== 'TD') {
    alert('Error!');
}

// Let `selector` be .
const selector = 'li';

// Let `testCases` be .
const images = [...cell.querySelectorAll(selector)];

// For each testCase `testCase` in `testCases`.
for (const testCase of images) {
    // Let `letter` be .
    const letter = testCase.textContent.trim().toUpperCase();

    if (!letter) {
        continue;
    }

    // Let `src` be .
    let src;

    switch (letter) {
        case 'P':
            src = 'https://hq.ioof.com.au/s/-esdn2g/8804/1phjtiw/_/images/icons/emoticons/check.svg';
            break;
        case 'W':
            src = "https://hq.ioof.com.au/s/-esdn2g/8804/1phjtiw/_/images/icons/emoticons/warning.svg";
            break;
        case 'F':
            src = 'https://hq.ioof.com.au/s/-esdn2g/8804/1phjtiw/_/images/icons/emoticons/error.svg';
            break;
    }

    // Let `icon` be .
    const icon = document.createElement('img');
    icon.src = src;

    testCase.textContent = '';
    testCase.appendChild(icon);
}

