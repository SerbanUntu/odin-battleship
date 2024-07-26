import './index.css'
import { Battleship, Carrier, Destroyer, PatrolBoat, Submarine } from '../../lib/ship'
import ComponentShip from '../ship'
import { textToKebabCase } from '../../lib/helper'
import { Direction, GameStage } from '../../lib/enums'
import Game from '../../lib/game'
import { ComponentBoard } from '../board'

window.addEventListener('keydown', e => {
	if (Game.getStage() === GameStage.SELECTION) {
		if (e.key === 'r') {
			switch (ComponentShipSelectionMenu.currentDirection) {
				case Direction.SOUTH:
					ComponentShipSelectionMenu.currentDirection = Direction.WEST
					break
				case Direction.WEST:
					ComponentShipSelectionMenu.currentDirection = Direction.NORTH
					break
				case Direction.NORTH:
					ComponentShipSelectionMenu.currentDirection = Direction.EAST
					break
				case Direction.EAST:
					ComponentShipSelectionMenu.currentDirection = Direction.SOUTH
			}
			ComponentBoard.updateGhost()
		} else if (e.shiftKey && e.key === 'R') {
			switch (ComponentShipSelectionMenu.currentDirection) {
				case Direction.SOUTH:
					ComponentShipSelectionMenu.currentDirection = Direction.EAST
					break
				case Direction.EAST:
					ComponentShipSelectionMenu.currentDirection = Direction.NORTH
					break
				case Direction.NORTH:
					ComponentShipSelectionMenu.currentDirection = Direction.WEST
					break
				case Direction.WEST:
					ComponentShipSelectionMenu.currentDirection = Direction.SOUTH
			}
			ComponentBoard.updateGhost()
		}
	}
})

export default class ComponentShipSelectionMenu {
	static currentShip
	static currentDirection = Direction.WEST

	static getComponent() {
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
			button.appendChild(new ComponentShip(ship).getComponent())
			const shipName = document.createElement('p')
			shipName.textContent = ship.name
			button.appendChild(shipName)
			button.addEventListener('click', e => {
				e.preventDefault()
				const buttons = component.querySelectorAll('button')
				buttons.forEach(btn => btn.classList.remove('selected'))
				button.classList.add('selected')
				ComponentShipSelectionMenu.currentShip = ship
			})
			component.appendChild(button)
		})
		return component
	}

	static disableButton(shipName) {
		const button = document.querySelector(`.${textToKebabCase(shipName)}-button`)
		button.style.display = 'none'
	}
}
