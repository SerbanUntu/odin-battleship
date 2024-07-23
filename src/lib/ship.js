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

export class Carrier extends Ship {
	constructor() {
		super('Carrier', 5)
	}
}

export class Battleship extends Ship {
	constructor() {
		super('Battleship', 4)
	}
}

export class Destroyer extends Ship {
	constructor() {
		super('Destroyer', 3)
	}
}

export class Submarine extends Ship {
	constructor() {
		super('Submarine', 3)
	}
}

export class PatrolBoat extends Ship {
	constructor() {
		super('Patrol boat', 5)
	}
}
