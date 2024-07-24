import { Direction } from '../lib/enums'
import Gameboard from '../lib/gameboard'
import Ship from '../lib/ship'

test('Gameboard exists', () => {
	expect(new Gameboard()).toBeDefined()
})

test('Adding a ship to gameboard', () => {
	const testGameboard = new Gameboard()
	const testShip = new Ship('Destroyer', 3)
	expect(testGameboard.placeShip(testShip, 3, 3, Direction.WEST)).toBe(true)
	expect(testGameboard.ships).toContain(testShip)
})

test('Ship outside gameboard', () => {
	const testGameboard = new Gameboard()
	const testShip = new Ship('Destroyer', 3)
	expect(testGameboard.placeShip(testShip, 0, 0, Direction.EAST)).toBe(false)
})

test('Overlapping ships', () => {
	const testGameboard = new Gameboard()
	const testShip1 = new Ship('Destroyer', 3)
	const testShip2 = new Ship('Cruiser', 3)
	testGameboard.placeShip(testShip1, 3, 3, Direction.WEST)
	expect(testGameboard.placeShip(testShip2, 1, 5, Direction.NORTH)).toBe(false)
})

test('Missing a hit', () => {
	const testGameboard = new Gameboard()
	expect(testGameboard.receiveAttack(0, 1)).toBe(false)
})

test('Attacking twice', () => {
	const testGameboard = new Gameboard()
	const testShip = new Ship('Destroyer', 3)
	testGameboard.placeShip(testShip, 3, 3, Direction.NORTH)
	expect(testGameboard.receiveAttack(3, 3)).toBe(testShip)
	expect(testGameboard.receiveAttack(3, 3)).toBe(null)
})

test('Invalid hit coordinates', () => {
	const testGameboard = new Gameboard()
	expect(testGameboard.receiveAttack(9, 10)).toBeNull()
	expect(testGameboard.receiveAttack(-5, 7)).toBeNull()
	expect(testGameboard.receiveAttack('5', '4')).toBeNull()
})

test('Sinking a ship from gameboard', () => {
	const testGameboard = new Gameboard()
	const testShip = new Ship('Destroyer', 3)
	testGameboard.placeShip(testShip, 3, 3, Direction.NORTH)
	expect(testGameboard.receiveAttack(3, 3)).toBe(testShip)
	expect(testGameboard.receiveAttack(4, 3)).toBe(testShip)
	expect(testGameboard.receiveAttack(5, 3)).toBe(testShip)
	expect(testShip.isSunk()).toBe(true)
})

test('Sinking all ships from gameboard', () => {
	const testGameboard = new Gameboard()
	const testShip1 = new Ship('Destroyer', 3)
	const testShip2 = new Ship('Patrol boat', 2)
	testGameboard.placeShip(testShip1, 3, 5, Direction.EAST)
	testGameboard.placeShip(testShip2, 7, 7, Direction.SOUTH)
	expect(testGameboard.receiveAttack(3, 5)).toBe(testShip1)
	expect(testGameboard.receiveAttack(3, 4)).toBe(testShip1)
	expect(testGameboard.receiveAttack(3, 3)).toBe(testShip1)
	expect(testGameboard.receiveAttack(7, 7)).toBe(testShip2)
	expect(testGameboard.receiveAttack(6, 7)).toBe(testShip2)
	expect(testGameboard.areAllSunk()).toBe(true)
})
