export class Direction {
	static NORTH = Symbol('Direction.NORTH')
	static EAST = Symbol('Direction.EAST')
	static SOUTH = Symbol('Direction.SOUTH')
	static WEST = Symbol('Direction.WEST')
}

export class GameStage {
	static CONFIG = Symbol('GameStage.CONFIG')
	static SELECTION = Symbol('GameStage.SELECTION')
	static BATTLE = Symbol('GameStage.BATTLE')
	static FINISHED = Symbol('GameStage.FINISHED')
}
