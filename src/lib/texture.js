import CarrierTexture from '../images/carrier.svg'
import BattleshipTexture from '../images/battleship.svg'
import DestroyerTexture from '../images/destroyer.svg'
import SubmarineTexture from '../images/submarine.svg'
import PatrolBoatTexture from '../images/patrol_boat.svg'
import MissMark from '../images/miss_mark.svg'
import HitMark from '../images/hit_mark.svg'

const textures = {
	Carrier: {
		src: CarrierTexture,
		width: 172,
		height: 28,
	},
	Battleship: {
		src: BattleshipTexture,
		width: 136,
		height: 28,
	},
	Destroyer: {
		src: DestroyerTexture,
		width: 100,
		height: 28,
	},
	Submarine: {
		src: SubmarineTexture,
		width: 100,
		height: 28,
	},
	'Patrol boat': {
		src: PatrolBoatTexture,
		width: 64,
		height: 28,
	},
	Miss: {
		src: MissMark,
		width: 12,
		height: 12,
	},
	Hit: {
		src: HitMark,
		width: 16,
		height: 16,
	},
}

export default textures
