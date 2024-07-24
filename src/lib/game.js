import { GameStage } from './enums'
import Player, { ComputerPlayer } from './player'
import { Carrier, Battleship, Destroyer, Submarine, PatrolBoat } from './ship'
import { Direction } from './enums'

export default class Game {
	static stage = GameStage.CONFIG
	static #playerOne = null
	static #playerTwo = null
	static winner = null
	static turnOf = 1

	static init() {
		Game.stage = GameStage.CONFIG
		Game.#playerOne = null
		Game.#playerTwo = null
		Game.winner = null
	}

	static setPlayers(playerOneName, againstComputer = true, playerTwoName = 'COMPUTER') {
		Game.#playerOne = new Player(playerOneName, false, 1)
		Game.#playerTwo = againstComputer ? new ComputerPlayer() : new Player(playerTwoName, false, 2)
		Game.stage = GameStage.SELECTION
	}

	static getPlayerOne() {
		return Game.#playerOne
	}

	static getPlayerTwo() {
		return Game.#playerTwo
	}

	static placeShip(playerNumber, ship, row, col, direction) {
		if (Game.stage !== GameStage.SELECTION) return
		const player = playerNumber === 1 ? Game.getPlayerOne() : Game.getPlayerTwo()
		const result = player.gameboard.placeShip(ship, row, col, direction)
		if (Game.areAllShipsPlaced()) Game.stage = GameStage.BATTLE
		return result
	}

	static areAllShipsPlaced() {
		return (
			Game.getPlayerOne().gameboard.ships.length === 5 &&
			Game.getPlayerTwo().gameboard.ships.length === 5
		)
	}

	static autoPlace(forPlayerOne = true, forPlayerTwo = true) {
		if (
			Game.getPlayerOne().gameboard.ships.length > 0 ||
			Game.getPlayerTwo().gameboard.ships.length > 0
		)
			return
		if (forPlayerOne) {
			Game.placeShip(1, new Carrier(), 5, 3, Direction.WEST)
			Game.placeShip(1, new Battleship(), 8, 6, Direction.EAST)
			Game.placeShip(1, new Destroyer(), 2, 1, Direction.WEST)
			Game.placeShip(1, new Submarine(), 0, 7, Direction.EAST)
			Game.placeShip(1, new PatrolBoat(), 6, 2, Direction.SOUTH)
		}
		if (forPlayerTwo) {
			Game.placeShip(2, new Carrier(), 5, 3, Direction.WEST)
			Game.placeShip(2, new Battleship(), 8, 6, Direction.EAST)
			Game.placeShip(2, new Destroyer(), 2, 1, Direction.WEST)
			Game.placeShip(2, new Submarine(), 0, 7, Direction.EAST)
			Game.placeShip(2, new PatrolBoat(), 6, 2, Direction.SOUTH)
		}
	}

	static randomPlace() {} //TODO

	static makeAttack(playerNumber, row, col) {
		if (Game.turnOf !== playerNumber) return
		const otherPlayerNumber = 2 - playerNumber + 1 // From 2 to 1 and from 1 to 2
		let result
		if (playerNumber === 1) result = Game.getPlayerTwo().gameboard.receiveAttack(row, col)
		else result = Game.getPlayerOne().gameboard.receiveAttack(row, col)
		if (result !== null) Game.turnOf = otherPlayerNumber
		//TODO if(Game.areAllShipsSunk(true, true)) Game.stage = GameStage.FINISHED
		return result
	}
}
