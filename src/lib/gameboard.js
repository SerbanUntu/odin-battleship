import { Direction } from './enums'

class GameboardSquare {
	ship = null
	hit = false
}

export default class Gameboard {
	ships = []
	size = 10
	squares = []

	constructor() {
		for (let i = 0; i < this.size; i++) {
			const currentRow = []
			for (let j = 0; j < this.size; j++) {
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
			if (currentCol < 0 || currentCol >= this.size) return false
			if (currentRow < 0 || currentRow >= this.size) return false
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
		return true
	}

	receiveAttack(row, col) {
		if (
			Number(row) !== row ||
			Number(col) !== col ||
			row < 0 ||
			col < 0 ||
			row >= this.size ||
			col >= this.size
		)
			return null
		if (!this.squares[row][col].ship || this.squares[row][col].hit) return false
		const ship = this.squares[row][col].ship
		ship.hit()
		this.squares[row][col].hit = true
		return ship
	}

	areAllSunk() {
		return this.ships.filter(s => !s.isSunk()).length === 0
	}
}
