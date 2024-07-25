import './index.css'
import Gameboard from '../../lib/gameboard'
import { Direction } from '../../lib/enums'

import EmptyCell from '../../images/empty_cell.svg'
import CruiserTexture from '../../images/cruiser.svg'
import BattleshipTexture from '../../images/battleship.svg'
import DestroyerTexture from '../../images/destroyer.svg'
import SubmarineTexture from '../../images/submarine.svg'
import PatrolBoatTexture from '../../images/patrol_boat.svg'
import MissMark from '../../images/miss_mark.svg'
import HitMark from '../../images/hit_mark.svg'
import Game from '../../lib/game'

export class ComponentBoard {
	#hidden = false
	#domNode = null

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
		component.classList.add(this.hidden ? 'hidden' : 'active')
		let cellSize = getComputedStyle(document.body).getPropertyValue('--cell-size')
		cellSize = Number(
			cellSize
				.split('')
				.filter(ch => Number(Number(ch)) === Number(ch))
				.join(''),
		) // Keep only numeric characters and convert to Number type

		for (let i = 0; i < Gameboard.size; i++) {
			for (let j = 0; j < Gameboard.size; j++) {
				const cell = document.createElement('div')
				cell.dataset.row = i
				cell.dataset.col = j
				cell.classList.add('cell')
				const image = new Image(cellSize, cellSize)
				image.src = EmptyCell
				cell.appendChild(image)
				cell.addEventListener('click', e => {
					e.preventDefault()
					Game.makeAttack(1, i, j)
					if (Game.getPlayerTwo().isComputer) setTimeout(() => Game.attackFromComputer(), 500)
				})
				component.appendChild(cell)
			}
		}

		return component
	}

	placeShip(shipName, row, col, direction) {
		const cell = this.#domNode.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`)
		const shipImage = new Image()
		shipImage.classList.add('ship-image')
		switch (direction) {
			case Direction.EAST:
				shipImage.classList.add('facing-east')
				break
			case Direction.WEST:
				shipImage.classList.add('facing-west')
				break
			case Direction.SOUTH:
				shipImage.classList.add('facing-south')
				break
			case Direction.NORTH:
				shipImage.classList.add('facing-north')
				break
		}
		switch (shipName) {
			default:
				shipImage.src = CruiserTexture
				shipImage.width = 172
				shipImage.height = 28
				break
			case 'Battleship':
				shipImage.src = BattleshipTexture
				shipImage.width = 136
				shipImage.height = 28
				break
			case 'Destroyer':
				shipImage.src = DestroyerTexture
				shipImage.width = 100
				shipImage.height = 28
				break
			case 'Submarine':
				shipImage.src = SubmarineTexture
				shipImage.width = 100
				shipImage.height = 28
				break
			case 'Patrol boat':
				shipImage.src = PatrolBoatTexture
				shipImage.width = 64
				shipImage.height = 28
				break
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
