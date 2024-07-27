import { Direction } from '../../lib/enums'
import { directionToClassName } from '../../lib/helper'
import textures from '../../lib/texture'

export default class ComponentShip {
	ship
	direction

	constructor(ship, direction = Direction.WEST) {
		this.ship = ship
		this.direction = direction
	}

	getNewComponent() {
		const component = new Image()
		const texture = textures[this.ship.name]
		component.draggable = false
		component.classList.add('ship-image')
		component.classList.add(directionToClassName(this.direction))
		component.width = texture.width
		component.height = texture.height
		component.src = texture.src
		return component
	}
}
