export class Direction {
	static NORTH = Symbol('Direction.NORTH')
	static EAST = Symbol('Direction.EAST')
	static SOUTH = Symbol('Direction.SOUTH')
	static WEST = Symbol('Direction.WEST')
}

export class GameStage {
	static CONFIG = Symbol('GameStage.CONFIG') // setPlayers
	static SELECTION = Symbol('GameStage.SELECTION') // placeShip, autoPlace, randomPlace
	static BATTLE = Symbol('GameStage.BATTLE') // makeAttack, attackFromComputer
	static FINISHED = Symbol('GameStage.FINISHED') // init
}

export class MessageType {
	static EMPTY = Symbol('MessageType.EMPTY')
	static DEFAULT = Symbol('MessageType.DEFAULT')
	static HIT = Symbol('MessageType.HIT')
	static IMPORTANT = Symbol('MessageType.IMPORTANT')
	static WIN = Symbol('MessageType.WIN')
}

export class BoardDisplay {
	static NONE = Symbol('BoardDisplay.NONE')
	static PLACING = Symbol('BoardDisplay.PLACING')
	static NO_SHIPS = Symbol('BoardDisplay.NO_SHIPS')
	static ALL = Symbol('BoardDisplay.ACTIVE')
}
