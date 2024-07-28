import './index.css'
import textures from '../../lib/texture'
import Gameboard from '../../lib/gameboard'
import { BoardDisplay, GameStage } from '../../lib/enums'
import ComponentShip from '../ship'

import Game from '../../lib/game'
import ShipMenu from '../ship-menu'
import Interruption from '../interruption'
import { directionToClassName, getNewShipObject } from '../../lib/helper'

export default class ComponentBoard {
	static leftBoard = null
	static rightBoard = null

	#domNode = this.#getNewComponent()
	#sectionNode
	#ownerTextNode
	#display

	constructor(sectionNode, display = BoardDisplay.NONE) {
		this.#sectionNode = sectionNode
		this.#sectionNode.appendChild(this.#domNode)
		this.#ownerTextNode = this.#sectionNode.querySelector('.board-owner')
		this.setDisplay(display)
	}

	static init() {
		ComponentBoard.leftBoard = new ComponentBoard(document.querySelector('#left-section'))
		ComponentBoard.rightBoard = new ComponentBoard(document.querySelector('#right-section'))
	}

	static updateGhost() {
		const ghosts = document.querySelectorAll('.ghost')
		ghosts.forEach(ghost => {
			ghost.classList.remove('facing-west', 'facing-east', 'facing-north', 'facing-south')
			ghost.classList.add(directionToClassName(ShipMenu.currentDirection))
		})
	}

	static switchBoards() {
		Interruption.pass.updateName(
			Game.turnOf === 1 ? Game.getPlayerOne().name : Game.getPlayerTwo().name,
		)
		Interruption.pass.show()
		Interruption.pass.continueButton.onclick = e => {
			e.preventDefault()
			const temp = ComponentBoard.leftBoard.#display
			ComponentBoard.leftBoard.setDisplay(ComponentBoard.rightBoard.#display)
			ComponentBoard.rightBoard.setDisplay(temp)
			Interruption.pass.hide()
		}
	}

	getComponentReference() {
		return this.#domNode
	}

	getSectionReference() {
		return this.#sectionNode
	}

	setDisplay(display) {
		this.#display = display
		this.#domNode.classList.remove('no-ships', 'placing', 'active')
		this.#sectionNode.classList.remove('hidden')
		switch (this.#display) {
			case BoardDisplay.NONE:
				this.#sectionNode.classList.add('hidden')
				break
			case BoardDisplay.NO_SHIPS:
				this.#domNode.classList.add('no-ships')
				break
			case BoardDisplay.PLACING:
				this.#domNode.classList.add('placing')
				break
			case BoardDisplay.ACTIVE:
				this.#domNode.classList.add('active')
				break
			default:
				console.error(`Unexpected display: ${this.#display.toString()}`)
		}
	}

	getHidden() {
		return this.hidden
	}

	#getNewComponent() {
		const component = document.createElement('div')
		component.classList.add('board')

		for (let i = 0; i < Gameboard.size; i++) {
			for (let j = 0; j < Gameboard.size; j++) {
				const cell = document.createElement('button')
				cell.dataset.row = i
				cell.dataset.col = j
				cell.classList.add('cell')
				cell.setAttribute('tabindex', '-1')

				cell.addEventListener('mouseenter', e => {
					e.preventDefault()
					if (Game.getStage() !== GameStage.PLACING) return
					if (!ShipMenu.currentShip) {
						cell.classList.remove('pointer')
						return
					}
					cell.classList.add('pointer')
					this.renderShip(ShipMenu.currentShip, i, j, ShipMenu.currentDirection, true)
				})

				cell.addEventListener('click', e => {
					e.preventDefault()
					if (Game.getStage() === GameStage.BATTLE) {
						let result
						if (this === Game.getPlayerOne().gameboard.component) {
							result = Game.makeAttack(2, i, j) //TODO Improve this
						} else {
							result = Game.makeAttack(1, i, j)
						}
						if (result !== null) {
							// && !Game.winner
							if (Game.getPlayerTwo().isComputer) {
								// 500ms after message finishes streaming
								setTimeout(() => Game.attackFromComputer(), 500)
							} else {
								// 500ms after message finishes streaming
								setTimeout(() => ComponentBoard.switchBoards(), 1000)
							}
						}
					} else if (Game.getStage() === GameStage.PLACING) {
						if (!ShipMenu.currentShip) return
						const result = Game.placeShip(
							Game.getCurrentlyPlacingPlayer().number,
							getNewShipObject(ShipMenu.currentShip.name),
							i,
							j,
							ShipMenu.currentDirection,
						)
						if (result) {
							ShipMenu.disableButton(ShipMenu.currentShip.name)
							ShipMenu.currentShip = null
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
		const shipImage = new ComponentShip(ship, direction).getNewComponent()
		const ghosts = document.querySelectorAll('.ghost')
		ghosts.forEach(node => node.remove())
		if (ghost) {
			shipImage.classList.add('ghost')
		}
		cell.appendChild(shipImage)
	}

	receiveAttack(row, col, miss) {
		const cell = this.#domNode.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`)
		const textureCode = miss ? 'Miss' : 'Hit'
		const mark = new Image(textures[textureCode].width, textures[textureCode].height)
		mark.src = textures[textureCode].src
		mark.classList.add('mark')
		cell.appendChild(mark)
	}

	updateOwnerText(text) {
		this.#ownerTextNode.textContent = text
		this.#ownerTextNode.setAttribute('title', text)
	}

	reset() {
		const cells = this.#domNode.querySelectorAll('.cell')
		cells.forEach(cell => {
			cell.replaceChildren()
		})
	}
}
