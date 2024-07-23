export default class Ship {
	name
	length
	hits = 0

	constructor(name, length) {
		this.name = name
		this.length = length
	}

	hit() {
		this.hits++
	}

	isSunk() {
		return this.hits >= this.length
	}
}
