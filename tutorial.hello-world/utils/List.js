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
		const values = new Set();
		const items = this;

		for (const item of items) {
			const value = item[property];

			values.add(value);
		}

		const groups = [];

		for (const value of values) {
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

		const items = [];

		while (n--) {
			const randomIndex = Math.floor(Math.random() * this.length);
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
		const index = this.findIndex(callbackFn);
		return this.slice(0, index);
	}

	/* Rearranges the order of the items in this list.
	* @returns {List} - this list.
	*/
	shuffle() {
		for (let i = this.length - 1; i > 0; i--) {
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
		const index1 = this.indexOf(item1);
		const index2 = this.indexOf(item2);

		if (index1 !== -1 && index2 !== -1) {
			this[index1] = item2;
			this[index2] = item1;
		}

		return this;
	}
}

export {
	List
}