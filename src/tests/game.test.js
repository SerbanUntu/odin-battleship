import { Direction, GameStage } from '../lib/enums'
import Game from '../lib/game'
import Player from '../lib/player'
import { Battleship, Carrier, Destroyer, PatrolBoat, Submarine } from '../lib/ship'

test('Config stage', () => {
	expect(Game.stage).toBe(GameStage.CONFIG)
	Game.setPlayers('John')
	expect(Game.stage).toBe(GameStage.SELECTION)
	expect(Game.getPlayerOne()).toEqual(new Player('John', false, 1))
	expect(Game.getPlayerTwo()).toEqual(new Player('COMPUTER', true, 2))
})

test('Selection stage', () => {
	Game.setPlayers('John')
	expect(Game.stage).toBe(GameStage.SELECTION)
	Game.placeShip(1, new Carrier(), 5, 3, Direction.WEST)
	expect(Game.stage).toBe(GameStage.SELECTION)
	Game.placeShip(1, new Battleship(), 8, 6, Direction.EAST)
	Game.placeShip(1, new Destroyer(), 2, 1, Direction.WEST)
	Game.placeShip(1, new Submarine(), 0, 7, Direction.EAST)
	Game.placeShip(1, new PatrolBoat(), 6, 2, Direction.SOUTH)
	expect(Game.stage).toBe(GameStage.SELECTION)
	Game.placeShip(2, new Carrier(), 5, 3, Direction.WEST)
	Game.placeShip(2, new Battleship(), 8, 6, Direction.EAST)
	Game.placeShip(2, new Destroyer(), 2, 1, Direction.WEST)
	Game.placeShip(2, new Submarine(), 0, 7, Direction.EAST)
	expect(Game.stage).toBe(GameStage.SELECTION)
	Game.placeShip(2, new PatrolBoat(), 6, 2, Direction.SOUTH)
	expect(Game.stage).toBe(GameStage.BATTLE)
})

test('Default selection', () => {
	Game.setPlayers('John')
	Game.autoPlace()
	expect(Game.stage).toBe(GameStage.BATTLE)
})

test.skip('Random placing', () => {
	Game.setPlayers('Mary')
	Game.randomPlace()
	expect(Game.stage).toBe(GameStage.BATTLE)
})

test('Player turns', () => {
	Game.setPlayers('John')
	Game.autoPlace()
	expect(Game.stage).toBe(GameStage.BATTLE)
	expect(Game.turnOf).toBe(1)
	Game.makeAttack(1, 0, 0)
	expect(Game.turnOf).toBe(2)
})
