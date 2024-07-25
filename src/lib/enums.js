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
