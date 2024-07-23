export default class Ship {
	name
	length
	hits

	constructor(name, length) {
		this.name = name
		this.length = length
		this.hits = 0
	}

	hit() {
		this.hits++
	}

	isSunk() {
		return this.hits >= this.length
	}
}
