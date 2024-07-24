import Gameboard from './gameboard'

export default class Player {
	name
	isComputer
	number
	gameboard

	constructor(name, isComputer, number) {
		this.name = name
		this.isComputer = isComputer
		this.number = number
		this.gameboard = new Gameboard()
	}
}

export class ComputerPlayer extends Player {
	constructor() {
		super('COMPUTER', true, 2)
	}

	generateGuess() {
		//TODO Remove randomness after 10 tries, implement smart algorithm
		let row = Math.floor(Math.random() * 10)
		let col = Math.floor(Math.random() * 10)
		return [row, col]
	}
}
