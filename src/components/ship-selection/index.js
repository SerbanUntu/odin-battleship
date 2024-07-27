import './index.css'
import { Battleship, Carrier, Destroyer, PatrolBoat, Submarine } from '../../lib/ship'
import ComponentShip from '../ship'
import { textToKebabCase } from '../../lib/helper'
import { Direction, GameStage } from '../../lib/enums'
import Game from '../../lib/game'
import ComponentBoard from '../board'

window.addEventListener('keydown', e => {
	if (Game.getStage() === GameStage.SELECTION) {
		if (e.key === 'r') {
			switch (ShipMenu.currentDirection) {
				case Direction.SOUTH:
					ShipMenu.currentDirection = Direction.WEST
					break
				case Direction.WEST:
					ShipMenu.currentDirection = Direction.NORTH
					break
				case Direction.NORTH:
					ShipMenu.currentDirection = Direction.EAST
					break
				case Direction.EAST:
					ShipMenu.currentDirection = Direction.SOUTH
			}
			ComponentBoard.updateGhost()
		} else if (e.shiftKey && e.key === 'R') {
			switch (ShipMenu.currentDirection) {
				case Direction.SOUTH:
					ShipMenu.currentDirection = Direction.EAST
					break
				case Direction.EAST:
					ShipMenu.currentDirection = Direction.NORTH
					break
				case Direction.NORTH:
					ShipMenu.currentDirection = Direction.WEST
					break
				case Direction.WEST:
					ShipMenu.currentDirection = Direction.SOUTH
			}
			ComponentBoard.updateGhost()
		}
	}
})

export default class ShipMenu {
	static currentShip
	static currentDirection = Direction.WEST
	static #domNode = ShipMenu.#getNewComponent()

	static init() {
		ShipMenu.moveToLeft()
	}

	static #getNewComponent() {
		const component = document.createElement('div')
		component.classList.add('selection-menu')
		const ships = [
			new Carrier(),
			new Battleship(),
			new Destroyer(),
			new Submarine(),
			new PatrolBoat(),
		]
		ships.forEach(ship => {
			const button = document.createElement('button')
			button.classList.add('ship-button')
			button.classList.add(`${textToKebabCase(ship.name)}-button`)
			button.appendChild(new ComponentShip(ship).getNewComponent())
			const shipName = document.createElement('p')
			shipName.textContent = ship.name
			button.appendChild(shipName)
			button.addEventListener('click', e => {
				e.preventDefault()
				const buttons = component.querySelectorAll('button')
				buttons.forEach(btn => btn.classList.remove('selected'))
				button.classList.add('selected')
				ShipMenu.currentShip = ship
			})
			component.appendChild(button)
		})
		return component
	}

	static getComponentReference() {
		return ShipMenu.#domNode
	}

	static disableButton(shipName) {
		const button = document.querySelector(`.${textToKebabCase(shipName)}-button`)
		button.classList.add('hidden')
	}

	static close() {
		ShipMenu.#domNode.classList.add('hidden')
	}

	static reload() {
		ShipMenu.#domNode.classList.remove('hidden')
		const buttons = document.querySelectorAll('.ship-button')
		buttons.forEach(button => button.classList.remove('selected', 'hidden'))
	}

	static moveToLeft() {
		ShipMenu.#domNode.remove()
		ComponentBoard.leftBoard.getSectionReference().appendChild(ShipMenu.#domNode)
	}

	static moveToRight() {
		ShipMenu.#domNode.remove()
		ComponentBoard.rightBoard.getSectionReference().appendChild(ShipMenu.#domNode)
	}
}
