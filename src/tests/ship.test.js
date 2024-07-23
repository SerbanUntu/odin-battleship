import Ship from '../lib/ship'

test('Ship exists', () => {
	expect(new Ship()).toBeDefined()
})

test('Ship constructor works', () => {
	const testShip = new Ship('Cruiser', 3)
	expect(testShip.name).toBe('Cruiser')
	expect(testShip.length).toBe(3)
	expect(testShip.hits).toBe(0)
})

test('Hitting ship once', () => {
	const testShip = new Ship('Cruiser', 3)
	testShip.hit()
	expect(testShip.hits).toBe(1)
	expect(testShip.isSunk()).toBe(false)
})

test('Sinking ship', () => {
	const testShip = new Ship('Cruiser', 1)
	testShip.hit()
	expect(testShip.isSunk()).toBe(true)
})
