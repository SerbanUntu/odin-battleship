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
}
