/* This piece of code modifies the text content of elements in the DOM. It allows to test the adaptability of a web page when font-related properties are adjusted. */
/*
*
*/
class List extends Array {

  /* Return the items from `list` not present in this list.
  * @param {List} list -
  * @return {List}
  */
  difference(list) {
    return list.filter(item => !this.includes(item));
  }

  /**
  * 
  * @param {*} property 
  * @returns 
  */
  groupBy(property) {
    // Let `values` be.
    const values = new Set();
    // Let `items` be.
    const items = this;

    // For each item `item` in `item`s.
    for (const item of items) {
      // Let `value` be.
      const value = item[property];

      values.add(value);
    }

    // Let `groups` be.
    const groups = [];

    // For each value `value` in `value`s.
    for (const value of values) {
      // Let `group` be.
      const group = items.filter(item => item[property] === value);

      groups.push(group);
    }

    return groups;
  }

  /*
  *
  */
  insert(indexes, item) {
    indexes.reverse();

    // For each index `index` in `index`s.
    for (const index of indexes) {
      this.splice(index, 0, item);
    }
  }


  /*
  *
  */
  intersection(list) {
    return this.filter(a => list.find(b => a === b));
  }

  /*
  *
  */
  remove(item) {
    // Let `index` be.
    let index = this.indexOf(item);

    while (index > -1) {
      this.splice(index, 1);
      index = this.indexOf(item);
    }

    return this;
  }

  /*
  *
  */
  replace(replacee, replacement) {
    // Let `index` be.
    const index = this.indexOf(replacee);

    if (index !== -1) {
      this[index] = replacement;
    }

    return this;
  }

  /**
  * Return a number of items from this list randomly.
  * @param {number} n - The number of random items to return from this list. Otherwise a single random item will be returned.
  * @returns {List}
  */
  sample(n = 1) {
    // Do not let `n` be less than 1 otherwise an infinite loop could be caused.
    n = Math.max(n, 1);

    // Let `items` be.
    const items = [];

    while (n--) {
      // Let `randomIndex` be.
      const randomIndex = Math.floor(Math.random() * this.length);
      // Let `item` be.
      const item = this[randomIndex];

      items.push(item);
    }

    return items;
  }

  /**
  * 
  * @param {*} property 
  */
  sortBy(property) {
    return this.toSorted((item1, item2) => {
      return item1[property] - item2[property];
    });
  }

  /**
  * 
  * @param {*} callbackFn 
  * @returns 
  */
  trim(callbackFn) {
    // Let `index` be.
    const index = this.findIndex(callbackFn);
    return this.slice(0, index);
  }

  /* Rearranges the order of the items in this list.
  * @returns {List} - this list.
  */
  shuffle() {
    for (let i = this.length - 1; i > 0; i--) {
      // Let `j` be.
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }

    return this;
  }

  /* Find `item1` and `item2` in this list. If found, move `item1` to `item2`'s position and viceversa. 
  * @param {*} item1 -
  * @param {*} item2 -
  * @returns {List} - this list.
  * @example
  * new List(1, 2, 3, 4).swap(1, 4);
  * // returns [4, 2, 3, 1]
  */
  swap(item1, item2) {
    // Let `index1` be.
    const index1 = this.indexOf(item1);
    // Let `index2` be.
    const index2 = this.indexOf(item2);

    if (index1 !== -1 && index2 !== -1) {
      this[index1] = item2;
      this[index2] = item1;
    }

    return this;
  }
}


// Let `map` be.
const map = new Map([
  ['A', 5],
  ['BLOCKQUOTE', 20],
  ['BUTTON', 5],
  ['H1', 10],
  ['H2', 10],
  ['H3', 10],
  ['H4', 10],
  ['H5', 10],
  ['H6', 10],
  ['LABEL', 5],
  ['OPTION', 5],
  ['P', 80],
  ['TD', 80],
  ['TH', 10],
]);

// Let `sentence` be a sequence of words based on the Lorem ipsum placeholder.
const sentence = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, est reprehenderit! Rem iste ea voluptates, nisi itaque, facilis adipisci repellendus voluptatum assumenda, totam voluptas. Quod vitae eos consectetur assumenda ex.';
// Let `words` be a list that includes every word found in `sentence`.
const words = new List(...sentence.split(' '));
// Let `selector` be a CSS selector.
const selector = ['a, blockquote, button, h1, h2, h3, h4, h5, h6, label, option, p, td, th'];
// Let `elements` be a list that incluces every element that matches `selector`.
const elements = [...document.querySelectorAll(selector)];

// For each element `element` in elements.
for (const element of elements) {
  // Let `name` be the name of `element`.    
  const name = element.nodeName;
  // Let `numberOfRandomWords` be the number of words that the text content of `element` will have.
  let numberOfRandomWords = map.get(name);
  const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);

  // For each text node `textNode` that `element` contains.
  while (treeWalker.nextNode()) {
    // Let `textNode` be the current text node.
    const textNode = treeWalker.currentNode;

    // If `textNode` has no text content at all.
    if (textNode.textContent.trim() === '') {
      // Ignore `textNode`.
      continue;
    }

    // Let `randomWords` be a list of words randomly selected from `words`. The number of random words is indicated by `numberOfRandomWords`.
    const randomWords = words.sample(numberOfRandomWords);
    // Replace the text content of `element` with words from `randomWords`.
    textNode.textContent = randomWords.join(" ");
  }
}






