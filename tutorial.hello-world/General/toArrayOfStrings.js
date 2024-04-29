/* This piece of code formats strings from a web page into an array of strings.
*/

const root = $0 || document;
const selector = '.issue-link-key';

const values = [...root.querySelectorAll(selector)].map(e => {    
    const value = e.textContent.trim();
    
    return `\`${value}\`,`;
});

const string = values.join('\n');

console.log(values.length);
console.log(string); 