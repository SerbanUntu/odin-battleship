export class Direction {
	static NORTH = Symbol('Direction.NORTH')
	static EAST = Symbol('Direction.EAST')
	static SOUTH = Symbol('Direction.SOUTH')
	static WEST = Symbol('Direction.WEST')
}

export class GameStage {
	static CONFIG = Symbol('GameStage.CONFIG') // setAgainstComputer, setPlayers
	static PLACING = Symbol('GameStage.PLACING') // placeShip, autoPlace, randomPlace
	static BATTLE = Symbol('GameStage.BATTLE') // makeAttack, attackFromComputer
	static FINISHED = Symbol('GameStage.FINISHED') // rematch, restart
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
	static ACTIVE = Symbol('BoardDisplay.ACTIVE')
}

export class Result {
	static SUCCESS = Symbol('Result.SUCCESS')
	static FAILURE = Symbol('Result.FAILURE')
}

export class AttackOutcome {
	static HIT = Symbol('AttackOutcome.HIT')
	static MISS = Symbol('AttackOutcome.MISS')
	static UNEXPECTED = Symbol('AttackOutcome.UNEXPECTED')
}
