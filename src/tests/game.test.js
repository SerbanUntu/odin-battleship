import { Direction, GameStage } from '../lib/enums'
import Game from '../lib/game'
import Player from '../lib/player'
import Ship, { Battleship, Carrier, Destroyer, PatrolBoat, Submarine } from '../lib/ship'

const mostAttacks = [
	// All ship locations for autoPlace() except [8, 6]
	[0, 5],
	[0, 6],
	[0, 7],
	[2, 1],
	[2, 2],
	[2, 3],
	[5, 2],
	[5, 3],
	[5, 4],
	[5, 5],
	[5, 6],
	[5, 7],
	[6, 2],
	[8, 3],
	[8, 4],
	[8, 5],
]

beforeEach(() => {
	Game.initWithOverride()
})

test('Config stage', () => {
	expect(Game.getStage()).toBe(GameStage.CONFIG)
	Game.setPlayers('John')
	expect(Game.getStage()).toBe(GameStage.SELECTION)
	expect(Game.getPlayerOne()).toEqual(new Player('John', false, 1))
	expect(Game.getPlayerTwo()).toEqual(new Player('COMPUTER', true, 2))
})

test('Selection stage', () => {
	Game.setPlayers('John')
	expect(Game.getStage()).toBe(GameStage.SELECTION)
	Game.placeShip(1, new Carrier(), 5, 3, Direction.WEST)
	expect(Game.getStage()).toBe(GameStage.SELECTION)
	Game.placeShip(1, new Battleship(), 8, 6, Direction.EAST)
	Game.placeShip(1, new Destroyer(), 2, 1, Direction.WEST)
	Game.placeShip(1, new Submarine(), 0, 7, Direction.EAST)
	Game.placeShip(1, new PatrolBoat(), 6, 2, Direction.SOUTH)
	expect(Game.getStage()).toBe(GameStage.SELECTION)
	Game.placeShip(2, new Carrier(), 5, 3, Direction.WEST)
	Game.placeShip(2, new Battleship(), 8, 6, Direction.EAST)
	Game.placeShip(2, new Destroyer(), 2, 1, Direction.WEST)
	Game.placeShip(2, new Submarine(), 0, 7, Direction.EAST)
	expect(Game.getStage()).toBe(GameStage.SELECTION)
	Game.placeShip(2, new PatrolBoat(), 6, 2, Direction.SOUTH)
	expect(Game.getStage()).toBe(GameStage.BATTLE)
})

test('Default selection', () => {
	Game.setPlayers('John')
	expect(Game.autoPlace()).toBe(true)
	expect(Game.getStage()).toBe(GameStage.BATTLE)
})

test('Random placing', () => {
	Game.setPlayers('Mary')
	expect(Game.randomPlace()).toBe(true)
	expect(Game.getStage()).toBe(GameStage.BATTLE)
})

test('Multiple placements', () => {
	Game.setPlayers('Michael')
	expect(Game.randomPlace(false, true)).toBe(true)
	expect(Game.autoPlace(false, true)).toBe(false)
	expect(Game.randomPlace(false, true)).toBe(false)
	expect(Game.autoPlace(true, true)).toBe(false)
	expect(Game.autoPlace(true, false)).toBe(true)
	expect(Game.randomPlace(false, true)).toBe(false)
	expect(Game.randomPlace(true, true)).toBe(false)
	expect(Game.autoPlace(false, false)).toBe(false)
})

test('Correct ships placed by auto-placing function', () => {
	const shipSorter = (a, b) => (a.name < b.name ? -1 : 1)
	const ships = [
		new Carrier(),
		new Battleship(),
		new Destroyer(),
		new Submarine(),
		new PatrolBoat(),
	]
	Game.setPlayers('John')
	Game.autoPlace()
	expect(Game.getPlayerOne().gameboard.ships.sort(shipSorter)).toEqual(ships.sort(shipSorter))
	expect(Game.getPlayerTwo().gameboard.ships.sort(shipSorter)).toEqual(ships.sort(shipSorter))
})

test('Correct ships placed by random placing function', () => {
	const shipSorter = (a, b) => (a.name < b.name ? -1 : 1)
	const ships = [
		new Carrier(),
		new Battleship(),
		new Destroyer(),
		new Submarine(),
		new PatrolBoat(),
	]
	Game.setPlayers('John')
	Game.randomPlace()
	expect(Game.getPlayerOne().gameboard.ships.sort(shipSorter)).toEqual(ships.sort(shipSorter))
	expect(Game.getPlayerTwo().gameboard.ships.sort(shipSorter)).toEqual(ships.sort(shipSorter))
})

test('Disallow placing the same ship type multiple types', () => {
	Game.setPlayers('John')
	expect(Game.placeShip(1, new Carrier(), 0, 0, Direction.WEST)).toBe(true)
	expect(Game.placeShip(1, new Carrier(), 1, 0, Direction.WEST)).toBe(false)
	expect(Game.placeShip(1, new Battleship(), 1, 0, Direction.WEST)).toBe(true)
	expect(Game.placeShip(1, new Battleship(), 2, 0, Direction.WEST)).toBe(false)
	expect(Game.placeShip(1, new Destroyer(), 2, 0, Direction.WEST)).toBe(true)
	expect(Game.placeShip(1, new Destroyer(), 3, 0, Direction.WEST)).toBe(false)
	expect(Game.placeShip(1, new Submarine(), 3, 0, Direction.WEST)).toBe(true)
	expect(Game.placeShip(1, new Submarine(), 4, 0, Direction.WEST)).toBe(false)
	expect(Game.placeShip(1, new PatrolBoat(), 4, 0, Direction.WEST)).toBe(true)
	expect(Game.placeShip(1, new PatrolBoat(), 5, 0, Direction.WEST)).toBe(false)
	expect(Game.placeShip(2, new Carrier(), 0, 0, Direction.WEST)).toBe(true)
	expect(Game.placeShip(2, new Carrier(), 1, 0, Direction.WEST)).toBe(false)
	expect(Game.placeShip(2, new Battleship(), 1, 0, Direction.WEST)).toBe(true)
	expect(Game.placeShip(2, new Battleship(), 2, 0, Direction.WEST)).toBe(false)
	expect(Game.placeShip(2, new Destroyer(), 2, 0, Direction.WEST)).toBe(true)
	expect(Game.placeShip(2, new Destroyer(), 3, 0, Direction.WEST)).toBe(false)
	expect(Game.placeShip(2, new Submarine(), 3, 0, Direction.WEST)).toBe(true)
	expect(Game.placeShip(2, new Submarine(), 4, 0, Direction.WEST)).toBe(false)
	expect(Game.placeShip(2, new PatrolBoat(), 4, 0, Direction.WEST)).toBe(true)
	expect(Game.placeShip(2, new PatrolBoat(), 5, 0, Direction.WEST)).toBe(false)
})

test('Disallow placing invalid ships', () => {
	Game.setPlayers('John')
	expect(Game.placeShip(1, new Ship('My ship', 1), 0, 0, Direction.WEST)).toBe(false)
	expect(Game.placeShip(1, new Ship('Carrier', 4), 0, 0, Direction.WEST)).toBe(false)
	expect(Game.placeShip(1, new Ship('PatrolBoat', 2), 0, 0, Direction.WEST)).toBe(false)
	expect(Game.placeShip(1, new Ship('Carrier', 5), 0, 0, Direction.WEST)).toBe(true)
})

test('Attack by invalid player number', () => {
	Game.setPlayers('John')
	Game.autoPlace()
	expect(Game.makeAttack(0, 0, 0)).toBeNull()
})

test('Attack by player who is not at their turn', () => {
	Game.setPlayers('John')
	Game.autoPlace()
	expect(Game.turnOf).toBe(1)
	expect(Game.makeAttack(2, 0, 0)).toBeNull()
	expect(Game.turnOf).toBe(1)
})

test('Attack by computer when playing against computer', () => {
	Game.setPlayers('Mary')
	Game.autoPlace()
	expect(Game.attackFromComputer()).toBeNull()
	Game.makeAttack(1, 0, 0)
	expect(Game.attackFromComputer()).not.toBeNull()
	expect(Game.turnOf).toBe(1)
})

test('Player turns', () => {
	Game.setPlayers('John')
	Game.autoPlace()
	expect(Game.getStage()).toBe(GameStage.BATTLE)
	expect(Game.turnOf).toBe(1)
	Game.makeAttack(1, 0, 0)
	expect(Game.turnOf).toBe(2)
})

test('Turn of same player if invalid attack', () => {
	Game.setPlayers('John')
	Game.autoPlace()
	expect(Game.turnOf).toBe(1)
	Game.makeAttack(1, -1, 0)
	expect(Game.turnOf).toBe(1)
})

test('Turn of same player if attack was already made', () => {
	Game.setPlayers('John')
	Game.autoPlace()
	expect(Game.turnOf).toBe(1)
	Game.makeAttack(1, 0, 0)
	expect(Game.turnOf).toBe(2)
	Game.makeAttack(2, 0, 0)
	expect(Game.turnOf).toBe(1)
	expect(Game.makeAttack(1, 0, 0)).toBeNull()
	expect(Game.turnOf).toBe(1)
})

test('Full playthrough', () => {
	expect(Game.getStage()).toBe(GameStage.CONFIG)
	Game.setPlayers('Mary')
	expect(Game.getStage()).toBe(GameStage.SELECTION)
	Game.autoPlace()
	expect(Game.getStage()).toBe(GameStage.BATTLE)
	mostAttacks.forEach(attack => {
		Game.makeAttack(1, ...attack)
		Game.makeAttack(2, ...attack)
	})
	expect(Game.getStage()).toBe(GameStage.BATTLE)
	Game.makeAttack(1, 8, 6)
	expect(Game.getStage()).toBe(GameStage.FINISHED)
	expect(Game.winner).toEqual(Game.getPlayerOne())
})

test('Reset game', () => {
	Game.setPlayers('Mary')
	Game.autoPlace()
	mostAttacks.forEach(attack => {
		Game.makeAttack(1, ...attack)
		Game.makeAttack(2, ...attack)
	})
	Game.makeAttack(1, 8, 6)
	expect(Game.init()).toBe(true)
	expect(Game.turnOf).toBe(1)
	expect(Game.getPlayerOne()).toBeNull()
	expect(Game.getPlayerTwo()).toBeNull()
	expect(Game.winner).toBeNull()
	expect(Game.getStage()).toBe(GameStage.CONFIG)
})

test('Attempting to reset the game before it is finished', () => {
	expect(Game.init()).toBe(false)
	Game.setPlayers('Mary')
	expect(Game.init()).toBe(false)
	Game.autoPlace()
	expect(Game.init()).toBe(false)
	mostAttacks.forEach(attack => {
		Game.makeAttack(1, ...attack)
		Game.makeAttack(2, ...attack)
	})
	expect(Game.init()).toBe(false)
	Game.makeAttack(1, 8, 6)
	expect(Game.init()).toBe(true)
})

test('Actions in the wrong game stages', () => {
	// CONFIG
	expect(Game.getStage()).toBe(GameStage.CONFIG)
	expect(Game.placeShip(1, new Battleship(), 1, 1, Direction.WEST)).toBe(false)
	expect(Game.autoPlace()).toBe(false)
	expect(Game.randomPlace()).toBe(false)
	expect(Game.makeAttack(1, 1, 1)).toBeNull()
	expect(Game.attackFromComputer()).toBeNull()
	expect(Game.init()).toBe(false)
	expect(Game.setPlayers('Joe')).toBe(true)
	// SELECTION
	expect(Game.getStage()).toBe(GameStage.SELECTION)
	expect(Game.setPlayers('Joe')).toBe(false)
	expect(Game.makeAttack(1, 1, 1)).toBeNull()
	expect(Game.attackFromComputer()).toBeNull()
	expect(Game.init()).toBe(false)
	expect(Game.autoPlace()).toBe(true)
	// BATTLE
	expect(Game.getStage()).toBe(GameStage.BATTLE)
	expect(Game.setPlayers('Joe')).toBe(false)
	expect(Game.placeShip(1, new Battleship(), 1, 1, Direction.WEST)).toBe(false)
	expect(Game.autoPlace()).toBe(false)
	expect(Game.randomPlace()).toBe(false)
	expect(Game.init()).toBe(false)
	mostAttacks.forEach(attack => {
		Game.makeAttack(1, ...attack)
		Game.makeAttack(2, ...attack)
	})
	Game.makeAttack(1, 8, 6)
	// FINISHED
	expect(Game.getStage()).toBe(GameStage.FINISHED)
	expect(Game.setPlayers('Joe')).toBe(false)
	expect(Game.placeShip(1, new Battleship(), 1, 1, Direction.WEST)).toBe(false)
	expect(Game.autoPlace()).toBe(false)
	expect(Game.randomPlace()).toBe(false)
	expect(Game.makeAttack(2, 8, 6)).toBeNull()
	expect(Game.attackFromComputer()).toBeNull()
	expect(Game.init()).toBe(true)
})
