import { Battleship, Carrier, Destroyer, PatrolBoat, Submarine } from './ship'
import { Direction } from './enums'

export function runInBrowser(cb) {
	try {
		process
	} catch {
		cb()
	}
}

export function runInNode(cb) {
	try {
		process
		cb()
	} catch {
		return
	}
}

export function textToKebabCase(text) {
	const words = text.split(' ')
	const newWords = []
	words.forEach(word => {
		newWords.push(word.toLowerCase())
	})
	return newWords.join('-')
}

export function directionToClassName(direction) {
	const text = direction.toString().slice(7, -1).split('.')[1].toLowerCase()
	return `facing-${text}`
}

export function getNewShipObject(shipName) {
	const newShips = {
		Carrier: new Carrier(),
		Battleship: new Battleship(),
		Destroyer: new Destroyer(),
		Submarine: new Submarine(),
		'Patrol boat': new PatrolBoat(),
	}
	return newShips[shipName]
}

export function getRandomCoordinates() {
	let row = Math.floor(Math.random() * 10)
	let col = Math.floor(Math.random() * 10)
	return [row, col]
}

export function getRandomDirection() {
	let options = [Direction.EAST, Direction.NORTH, Direction.SOUTH, Direction.WEST]
	let randomIndex = Math.floor(Math.random() * 4)
	return options[randomIndex]
}
