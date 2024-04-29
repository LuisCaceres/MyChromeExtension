/* This piece of code replaces the image of a test case with a link to that image. For context, images occupy too much space in a cell which bloats up the size of a table. An image can be replaced by a link which only occupies one line of text. This link is associated with the image. When the link is activated, the associated image is shown. */

// Let `cell` be a table cell.
const cell = $0;

if (cell.nodeName !== 'TD') {
    alert('Error!');
}

// Let `selector` be a CSS selector.
const selector = 'img:not(.editor-inline-macro)';

// Let `images` be each image of a test case in `cell`.
const images = [...cell.querySelectorAll(selector)];

// For each image `image` in `images`.
for (const image of images) {

    // Let `linkedResourceDefaultAlias` be the value of the `data-linked-resource-default-alias` attribute of `image`.
    const linkedResourceDefaultAlias = image.getAttribute('data-linked-resource-default-alias');
    // Let `linkedResourceId` be the value of the `data-linked-resource-id` attribute of `image`.
    const linkedResourceId = image.getAttribute('data-linked-resource-id');
    // Let `href` be the source of `image`.
    const href = image.src;
    
    // Let `template` be a snippet of HTML representing the link for an image of a test case.
    const template = `<a data-linked-resource-default-alias="${linkedResourceDefaultAlias}" data-linked-resource-container-version="66" class="confluence-link" data-linked-resource-id="${linkedResourceId}" data-linked-resource-version="1" data-linked-resource-type="attachment" href="${href}" data-linked-resource-content-type="image/png" data-base-url="https://hq.ioof.com.au">${linkedResourceDefaultAlias}</a>`;
    
    // Let `link` be a link created using `template`.
    const link = new DOMParser().parseFromString(template, 'text/html').querySelector('a');
    image.replaceWith(link);
}