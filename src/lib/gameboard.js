import { ComponentBoard } from '../components/board'
import { Direction } from './enums'

class GameboardSquare {
	ship = null
	hit = false
}

export default class Gameboard {
	static size = 10

	component = new ComponentBoard()
	ships = []
	squares = []

	constructor() {
		for (let i = 0; i < Gameboard.size; i++) {
			const currentRow = []
			for (let j = 0; j < Gameboard.size; j++) {
				currentRow.push(new GameboardSquare())
			}
			this.squares.push(currentRow)
		}
	}

	placeShip(ship, row, col, direction) {
		let rowIterator = 1
		let colIterator = 0
		switch (direction) {
			case Direction.EAST:
				rowIterator = 0
				colIterator = -1
				break
			case Direction.SOUTH:
				rowIterator = -1
				colIterator = 0
				break
			case Direction.WEST:
				rowIterator = 0
				colIterator = 1
				break
		}
		let currentCol = col
		let currentRow = row
		for (let i = 0; i < ship.length; i++) {
			if (currentCol < 0 || currentCol >= Gameboard.size) return false
			if (currentRow < 0 || currentRow >= Gameboard.size) return false
			if (this.squares[currentRow][currentCol].ship) return false
			currentCol += colIterator
			currentRow += rowIterator
		}
		currentCol = col
		currentRow = row
		for (let i = 0; i < ship.length; i++) {
			this.squares[currentRow][currentCol].ship = ship
			currentCol += colIterator
			currentRow += rowIterator
		}
		this.ships.push(ship)
		if (process === undefined) {
			//? Only run in browser
			this.component.placeShip(ship.name, row, col, direction)
		}
		return true
	}

	receiveAttack(row, col) {
		if (
			Number(row) !== row ||
			Number(col) !== col ||
			row < 0 ||
			col < 0 ||
			row >= Gameboard.size ||
			col >= Gameboard.size ||
			this.squares[row][col].hit
		)
			return null
		this.squares[row][col].hit = true
		if (!this.squares[row][col].ship) {
			if (process === undefined) {
				//? Only run in browser
				this.component.receiveAttack(row, col, true)
			}
			return false
		}
		const ship = this.squares[row][col].ship
		ship.hit()
		if (process === undefined) {
			//? Only run in browser
			this.component.receiveAttack(row, col, false)
		}
		return ship
	}

	areAllSunk() {
		return this.ships.filter(s => !s.isSunk()).length === 0
	}
}
