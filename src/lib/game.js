import { GameStage } from './enums'
import Player, { ComputerPlayer } from './player'
import { Carrier, Battleship, Destroyer, Submarine, PatrolBoat } from './ship'
import { Direction } from './enums'
import { runInBrowser, runInNode } from './helper'
import ComponentMessage from '../components/message'
import ComponentBoard from '../components/board'

let dispatchedFirstPlacingFinish = false
let dispatchedSecondPlacingFinish = false
let dispatchedGameEnd = false

export default class Game {
	static #stage = GameStage.CONFIG
	static #playerOne = null
	static #playerTwo = null
	static #currentlyPlacingPlayer = null
	static againstComputer = null
	static winner = null
	static turnOf = 1

	static getRandomCoordinates() {
		let row = Math.floor(Math.random() * 10)
		let col = Math.floor(Math.random() * 10)
		return [row, col]
	}

	static getRandomDirection() {
		let options = [Direction.EAST, Direction.NORTH, Direction.SOUTH, Direction.WEST]
		let randomIndex = Math.floor(Math.random() * 4)
		return options[randomIndex]
	}

	static init() {
		if (Game.#stage !== GameStage.FINISHED) return false
		Game.#stage = GameStage.CONFIG
		Game.#playerOne = null
		Game.#playerTwo = null
		Game.#currentlyPlacingPlayer = null
		Game.againstComputer = null
		Game.winner = null
		Game.turnOf = 1
		return true
	}

	static initWithOverride() {
		runInNode(() => {
			Game.#stage = GameStage.FINISHED
		})
		return Game.init()
	}

	static setAgainstComputer(againstComputer) {
		Game.againstComputer = againstComputer
		runInBrowser(() => {
			document.body.dataset.againstComputer = `${Game.againstComputer}`
		})
	}

	static setPlayers(playerOneName, playerTwoName) {
		if (Game.#stage !== GameStage.CONFIG) return false
		Game.#playerOne = new Player(playerOneName, false, 1, ComponentBoard.leftBoard)
		if (playerTwoName) {
			Game.#playerTwo = new Player(playerTwoName, false, 2, ComponentBoard.rightBoard)
		} else {
			Game.#playerTwo = new ComputerPlayer()
		}
		Game.#stage = GameStage.SELECTION
		Game.#currentlyPlacingPlayer = Game.getPlayerOne()
		return true
	}

	static getPlayerOne() {
		return Game.#playerOne
	}

	static getPlayerTwo() {
		return Game.#playerTwo
	}

	static getStage() {
		return Game.#stage
	}

	static getCurrentlyPlacingPlayer() {
		return Game.#currentlyPlacingPlayer
	}

	static placeShip(playerNumber, ship, row, col, direction) {
		if (Game.#currentlyPlacingPlayer.number !== playerNumber) return false
		if (Game.#stage !== GameStage.SELECTION) return false
		const player = playerNumber === 1 ? Game.getPlayerOne() : Game.getPlayerTwo()
		if (
			player.gameboard.ships.filter(
				stored => stored.name === ship.name && stored.length === ship.length,
			).length > 0
		)
			return false
		const validShips = [
			new Carrier(),
			new Battleship(),
			new Destroyer(),
			new Submarine(),
			new PatrolBoat(),
		]
		if (
			validShips.filter(valid => valid.name === ship.name && valid.length === ship.length)
				.length === 0
		)
			return false
		const result = player.gameboard.placeShip(ship, row, col, direction)
		if (Game.#currentlyPlacingPlayer.gameboard.ships.length === 5) {
			Game.#currentlyPlacingPlayer = Game.getPlayerTwo()
			runInBrowser(() => {
				if (!dispatchedFirstPlacingFinish) {
					dispatchedFirstPlacingFinish = true
					window.dispatchEvent(new Event('first-placing-finish'))
				}
			})
		}
		if (Game.areAllShipsPlaced()) {
			Game.#stage = GameStage.BATTLE
			runInBrowser(() => {
				if (!dispatchedSecondPlacingFinish) {
					dispatchedSecondPlacingFinish = true
					window.dispatchEvent(new Event('second-placing-finish'))
				}
			})
		}
		return result
	}

	static autoPlace(forPlayerOne = true, forPlayerTwo = true) {
		if (
			Game.#stage !== GameStage.SELECTION ||
			(forPlayerOne && Game.getPlayerOne().gameboard.ships.length > 0) ||
			(forPlayerTwo && Game.getPlayerTwo().gameboard.ships.length > 0)
		)
			return false
		const playerNumbers = []
		if (forPlayerOne) playerNumbers.push(1)
		if (forPlayerTwo) playerNumbers.push(2)
		playerNumbers.forEach(number => {
			Game.placeShip(number, new Carrier(), 5, 3, Direction.WEST)
			Game.placeShip(number, new Battleship(), 8, 6, Direction.EAST)
			Game.placeShip(number, new Destroyer(), 2, 1, Direction.WEST)
			Game.placeShip(number, new Submarine(), 0, 7, Direction.EAST)
			Game.placeShip(number, new PatrolBoat(), 6, 2, Direction.SOUTH)
		})
		return true
	}

	static randomPlace(forPlayerOne = true, forPlayerTwo = true) {
		if (
			Game.#stage !== GameStage.SELECTION ||
			(forPlayerOne && Game.getPlayerOne().gameboard.ships.length > 0) ||
			(forPlayerTwo && Game.getPlayerTwo().gameboard.ships.length > 0)
		)
			return false
		const playerNumbers = []
		if (forPlayerOne) playerNumbers.push(1)
		if (forPlayerTwo) playerNumbers.push(2)
		playerNumbers.forEach(number => {
			const ships = [
				new Carrier(),
				new Battleship(),
				new Destroyer(),
				new Submarine(),
				new PatrolBoat(),
			]
			ships.forEach(ship => {
				let result = Game.placeShip(
					number,
					ship,
					...Game.getRandomCoordinates(),
					Game.getRandomDirection(),
				)
				while (result !== true) {
					result = Game.placeShip(
						number,
						ship,
						...Game.getRandomCoordinates(),
						Game.getRandomDirection(),
					)
				}
			})
		})
		return true
	}

	static areAllShipsPlaced() {
		if (Game.#stage === GameStage.CONFIG) return false
		return (
			Game.getPlayerOne().gameboard.ships.length === 5 &&
			Game.getPlayerTwo().gameboard.ships.length === 5
		)
	}

	static makeAttack(dealingPlayerNumber, row, col) {
		if (Game.#stage !== GameStage.BATTLE || Game.turnOf !== dealingPlayerNumber) return null
		const receivingPlayerNumber = 2 - dealingPlayerNumber + 1 // From 2 to 1 and from 1 to 2
		const receivingPlayer = dealingPlayerNumber === 1 ? Game.getPlayerTwo() : Game.getPlayerOne()
		const dealingPlayer = dealingPlayerNumber === 1 ? Game.getPlayerOne() : Game.getPlayerTwo()
		let result
		result = receivingPlayer.gameboard.receiveAttack(row, col)
		if (result === null) return null
		Game.turnOf = receivingPlayerNumber
		if (receivingPlayer.gameboard.areAllSunk()) {
			Game.#stage = GameStage.FINISHED
			Game.winner = dealingPlayer
		}
		runInBrowser(() => {
			let messageComponent
			let otherMessageComponent
			if (receivingPlayerNumber === 1) {
				messageComponent = ComponentMessage.leftMessage
				otherMessageComponent = ComponentMessage.rightMessage
			} else {
				messageComponent = ComponentMessage.rightMessage
				otherMessageComponent = ComponentMessage.leftMessage
			}
			if (result === false) {
				messageComponent.updateMiss()
			} else {
				if (receivingPlayer.gameboard.areAllSunk()) {
					messageComponent.updateWin(dealingPlayer.isComputer)
					otherMessageComponent.updateLoss(receivingPlayer.isComputer)
					if (!dispatchedGameEnd) {
						dispatchedGameEnd = true
						window.dispatchEvent(new Event('game-end'))
					}
				} else {
					const receivingShip = receivingPlayer.gameboard.squares[row][col].ship
					if (receivingShip.isSunk()) {
						messageComponent.updateSink(
							receivingPlayer.isComputer,
							dealingPlayer.name,
							receivingShip.name,
						)
					} else {
						messageComponent.updateHit()
					}
				}
			}
		})
		return result
	}

	static attackFromComputer() {
		if (Game.#stage !== GameStage.BATTLE || !Game.getPlayerTwo().isComputer || Game.turnOf !== 2)
			return null
		let result = Game.makeAttack(2, ...Game.getRandomCoordinates())
		while (result === null) {
			result = Game.makeAttack(2, ...Game.getRandomCoordinates())
		}
		return result
	}
}
