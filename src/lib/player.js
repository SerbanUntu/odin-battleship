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

	generateGuess(board) {
		let row
		let col
		while (true) {
			row = Math.floor(Math.random() * 9)
			col = Math.floor(Math.random() * 9)
			if (board.receiveAttack(row, col)) break
		}
		return [row, col]
	}
}
