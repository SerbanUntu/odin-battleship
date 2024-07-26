import './index.css'
import Gameboard from '../../lib/gameboard'
import { Direction, GameStage } from '../../lib/enums'
import ComponentShip from '../ship'

import MissMark from '../../images/miss_mark.svg'
import HitMark from '../../images/hit_mark.svg'
import Game from '../../lib/game'
import ComponentShipSelectionMenu from '../ship-selection'
import { Carrier, Battleship, Destroyer, Submarine, PatrolBoat } from '../../lib/ship'

export class ComponentBoard {
	#hidden = false
	#domNode = null

	static updateGhost() {
		const ghosts = document.querySelectorAll('.ghost')
		ghosts.forEach(ghost => {
			ghost.classList.remove('facing-west', 'facing-east', 'facing-north', 'facing-south')
			switch (ComponentShipSelectionMenu.currentDirection) {
				case Direction.EAST:
					ghost.classList.add('facing-east')
					break
				case Direction.WEST:
					ghost.classList.add('facing-west')
					break
				case Direction.SOUTH:
					ghost.classList.add('facing-south')
					break
				case Direction.NORTH:
					ghost.classList.add('facing-north')
					break
			}
		})
	}

	setHidden(hidden) {
		this.hidden = hidden
		this.#domNode.classList.remove('hidden', 'active')
		this.#domNode.classList.add(this.hidden ? 'hidden' : 'active')
	}

	getHidden() {
		return this.hidden
	}

	getComponent() {
		const component = document.createElement('div')
		this.#domNode = component
		component.classList.add('board')
		let cellSize = getComputedStyle(document.body).getPropertyValue('--cell-size')
		cellSize = Number(
			cellSize
				.split('')
				.filter(ch => Number(Number(ch)) === Number(ch))
				.join(''),
		) // Keep only numeric characters and convert to Number type

		for (let i = 0; i < Gameboard.size; i++) {
			for (let j = 0; j < Gameboard.size; j++) {
				const cell = document.createElement('button')
				cell.dataset.row = i
				cell.dataset.col = j
				cell.classList.add('cell')
				cell.setAttribute('tabindex', '-1')

				cell.addEventListener('mouseenter', e => {
					e.preventDefault()
					if (Game.getStage() !== GameStage.SELECTION) return
					if (!ComponentShipSelectionMenu.currentShip) return
					this.renderShip(
						ComponentShipSelectionMenu.currentShip,
						i,
						j,
						ComponentShipSelectionMenu.currentDirection,
						true,
					)
				})

				cell.addEventListener('click', e => {
					e.preventDefault()
					if (Game.getStage() === GameStage.BATTLE) {
						Game.makeAttack(1, i, j)
						if (Game.getPlayerTwo().isComputer) setTimeout(() => Game.attackFromComputer(), 500)
					} else if (Game.getStage() === GameStage.SELECTION) {
						let newShip
						switch (ComponentShipSelectionMenu.currentShip.name) {
							case 'Carrier':
								newShip = new Carrier()
								break
							case 'Battleship':
								newShip = new Battleship()
								break
							case 'Destroyer':
								newShip = new Destroyer()
								break
							case 'Submarine':
								newShip = new Submarine()
								break
							case 'Patrol boat':
								newShip = new PatrolBoat()
								break
						}
						const result = Game.placeShip(
							Game.getCurrentlyPlacingPlayer().number,
							newShip,
							i,
							j,
							ComponentShipSelectionMenu.currentDirection,
						)
						if (result) {
							ComponentShipSelectionMenu.disableButton(ComponentShipSelectionMenu.currentShip.name)
							ComponentShipSelectionMenu.currentShip = null
						}
					}
				})

				component.appendChild(cell)
			}
		}

		return component
	}

	renderShip(ship, row, col, direction, ghost = false) {
		const cell = this.#domNode.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`)
		const shipImage = new ComponentShip(ship, direction).getComponent()
		if (ghost) {
			const ghosts = document.querySelectorAll('.ghost')
			ghosts.forEach(ghost => ghost.remove())
			shipImage.classList.add('ghost')
		}
		cell.appendChild(shipImage)
	}

	receiveAttack(row, col, miss) {
		const cell = this.#domNode.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`)
		let mark
		if (miss) {
			mark = new Image(12, 12)
			mark.src = MissMark
		} else {
			mark = new Image(16, 16)
			mark.src = HitMark
		}
		mark.classList.add('mark')
		cell.appendChild(mark)
	}
}
