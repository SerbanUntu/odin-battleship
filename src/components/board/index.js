import './index.css'
import EmptyCell from '../../images/empty_cell.svg'
import HitMark from '../../images/hit_mark.svg'

export class ComponentBoard {
	gameboard
	hidden

	constructor(gameboard, hidden) {
		this.gameboard = gameboard
		this.hidden = hidden
	}

	getComponent() {
		const component = document.createElement('div')
		component.classList.add('board')
		component.classList.add(this.hidden ? 'hidden' : 'active')
		let cellSize = getComputedStyle(document.body).getPropertyValue('--cell-size')
		cellSize = Number(
			cellSize
				.split('')
				.filter(ch => Number(Number(ch)) === Number(ch))
				.join(''),
		) // Keep only numeric characters and convert to Number type

		for (let i = 0; i < this.gameboard.size; i++) {
			for (let j = 0; j < this.gameboard.size; j++) {
				const cell = document.createElement('div')
				cell.dataset.row = i
				cell.dataset.col = j
				cell.classList.add('cell')
				const image = new Image(cellSize, cellSize)
				image.src = EmptyCell
				cell.appendChild(image)
				component.appendChild(cell)
			}
		}

		return component
	}
}
