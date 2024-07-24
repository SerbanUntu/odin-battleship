import './styles/reset.css'
import './styles/main.css'
import './styles/util.css'
import Game from './lib/game'

Game.setPlayers('John')

document.body.appendChild(Game.getPlayerOne().gameboard.component.getComponent())
document.body.appendChild(Game.getPlayerTwo().gameboard.component.getComponent())

Game.getPlayerTwo().gameboard.component.setHidden(true)
Game.autoPlace()
