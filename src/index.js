import './styles/reset.css'
import './styles/main.css'
import './styles/util.css'
import Game from './lib/game'
import ComponentMessage from './components/message'

const leftSection = document.querySelector('#left-section')
const rightSection = document.querySelector('#right-section')
const leftBoardOwner = leftSection.querySelector('.board-owner')
const rightBoardOwner = rightSection.querySelector('.board-owner')

Game.setPlayers('You') //TODO add input

leftBoardOwner.textContent = Game.getPlayerOne().name
rightBoardOwner.textContent = Game.getPlayerTwo().name

leftSection.appendChild(Game.getPlayerOne().gameboard.component.getComponent())
rightSection.appendChild(Game.getPlayerTwo().gameboard.component.getComponent())

ComponentMessage.init()

Game.getPlayerTwo().gameboard.component.setHidden(true)
Game.autoPlace(true, false)
Game.randomPlace(false, true)
