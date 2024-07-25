import './styles/reset.css'
import './styles/main.css'
import './styles/util.css'
import Game from './lib/game'
import ComponentMessage from './components/message'
import {
	showInterruption,
	hideInterruption,
	OpeningInterruptionContainer,
	NamingInterruptionContainer,
	ClosingInterruptionContainer,
} from './components/interruption'

const leftSection = document.querySelector('#left-section')
const rightSection = document.querySelector('#right-section')
const leftBoardOwner = leftSection.querySelector('.board-owner')
const rightBoardOwner = rightSection.querySelector('.board-owner')
let leftBoard
let rightBoard

const openingInterruptionContainer = OpeningInterruptionContainer.getComponent()
const openingInterruption = openingInterruptionContainer.querySelector('dialog')
const againstComputerButton = openingInterruption.querySelector('.against-computer')
const twoPlayersButton = openingInterruption.querySelector('.two-players')

const namingInterruptionContainer = NamingInterruptionContainer.getComponent()
const namingInterruption = namingInterruptionContainer.querySelector('dialog')
const namesForm = namingInterruption.querySelector('#names-form')
const playerOneNameInput = namingInterruption.querySelector('.player-one-name')

const closingInterruptionContainer = ClosingInterruptionContainer.getComponent()
const closingInterruption = closingInterruptionContainer.querySelector('dialog')
const closingText = closingInterruption.querySelector('.interruption-name')
const rematchButton = closingInterruption.querySelector('.rematch')
const newPlayersButton = closingInterruption.querySelector('.new-players')

document.body.appendChild(openingInterruptionContainer)
document.body.appendChild(namingInterruptionContainer)
document.body.appendChild(closingInterruptionContainer)

ComponentMessage.init()

showOpening()

function showOpening() {
	showInterruption(openingInterruptionContainer)
	againstComputerButton.addEventListener('click', e => {
		e.preventDefault()
		hideInterruption(openingInterruptionContainer)
		namesSetup()
	})
}

function namesSetup() {
	showInterruption(namingInterruptionContainer)
	namesForm.reset()

	namesForm.addEventListener('submit', e => {
		e.preventDefault()
		Game.setPlayers(playerOneNameInput.value)
		hideInterruption(namingInterruptionContainer)
		playGame()
	})
}

function playGame() {
	leftBoardOwner.textContent = Game.getPlayerOne().name
	rightBoardOwner.textContent = Game.getPlayerTwo().name

	leftBoard = Game.getPlayerOne().gameboard.component.getComponent()
	rightBoard = Game.getPlayerTwo().gameboard.component.getComponent()

	leftSection.appendChild(leftBoard)
	rightSection.appendChild(rightBoard)

	Game.getPlayerTwo().gameboard.component.setHidden(true)
	Game.autoPlace()

	const checkEnd = setInterval(() => {
		//TODO Improve this
		if (Game.winner !== null) {
			setTimeout(() => {
				endGame()
				clearInterval(checkEnd)
			}, 1000)
		}
	}, 1000)
}

function endGame() {
	showInterruption(closingInterruptionContainer)
	closingText.textContent = `${Game.winner.name} won!`
	rematchButton.addEventListener('click', e => {
		e.preventDefault()
		location.reload() //TODO
	})
	newPlayersButton.addEventListener('click', e => {
		e.preventDefault()
		location.reload() //TODO
	})
}
