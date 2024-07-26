import CruiserTexture from '../../images/cruiser.svg'
import BattleshipTexture from '../../images/battleship.svg'
import DestroyerTexture from '../../images/destroyer.svg'
import SubmarineTexture from '../../images/submarine.svg'
import PatrolBoatTexture from '../../images/patrol_boat.svg'
import { Direction } from '../../lib/enums'

export default class ComponentShip {
	ship
	direction

	constructor(ship, direction = Direction.WEST) {
		this.ship = ship
		this.direction = direction
	}

	getComponent() {
		const component = new Image()
		component.classList.add('ship-image')
		switch (this.direction) {
			case Direction.EAST:
				component.classList.add('facing-east')
				break
			case Direction.WEST:
				component.classList.add('facing-west')
				break
			case Direction.SOUTH:
				component.classList.add('facing-south')
				break
			case Direction.NORTH:
				component.classList.add('facing-north')
				break
		}
		switch (this.ship.name) {
			default:
				component.src = CruiserTexture
				component.width = 172
				component.height = 28
				break
			case 'Battleship':
				component.src = BattleshipTexture
				component.width = 136
				component.height = 28
				break
			case 'Destroyer':
				component.src = DestroyerTexture
				component.width = 100
				component.height = 28
				break
			case 'Submarine':
				component.src = SubmarineTexture
				component.width = 100
				component.height = 28
				break
			case 'Patrol boat':
				component.src = PatrolBoatTexture
				component.width = 64
				component.height = 28
		}
		return component
	}
}
