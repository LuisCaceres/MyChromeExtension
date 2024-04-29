/* This piece of code formats an array of strings into a list. */

const strings = [
    'Hello',
    'World',
];

const listItems = [];

for (const string of strings) {
    const listItem = `
    <li>
        ${string}
    </li>    
    `;

    listItems.push(listItem);
}

const start = `<ul>`;
const end = `</ul>`;

listItems.unshift(start);
listItems.push(end);

const template = listItems.join('');
const list = (new DOMParser).parseFromString(template, 'text/html').querySelector('ul');

document.body.prepend(list);