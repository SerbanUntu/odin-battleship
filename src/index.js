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
import ComponentShipSelectionMenu from './components/ship-selection'

const leftSection = document.querySelector('#left-section')
const rightSection = document.querySelector('#right-section')
const leftBoardOwner = leftSection.querySelector('.board-owner')
const rightBoardOwner = rightSection.querySelector('.board-owner')
let againstComputer = null
let leftBoard
let rightBoard
let selectionMenu

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
		againstComputer = true
		e.preventDefault()
		hideInterruption(openingInterruptionContainer)
		namesSetup()
	})
}

function namesSetup() {
	showInterruption(namingInterruptionContainer)
	namesForm.reset()
	if (againstComputer) {
		namesForm.addEventListener('submit', e => {
			e.preventDefault()
			Game.setPlayers(playerOneNameInput.value)
			hideInterruption(namingInterruptionContainer)
			placeShipsFirst()
		})
	}
}

function placeShipsFirst() {
	leftBoardOwner.style.display = 'block'
	rightBoardOwner.style.display = 'none'
	rightSection.style.display = 'none'
	leftBoard = Game.getPlayerOne().gameboard.component.getComponent()
	leftBoard.classList.add('placing')
	leftSection.appendChild(leftBoard)
	leftBoardOwner.textContent = Game.getPlayerOne().name
	rightBoardOwner.textContent = Game.getPlayerTwo().name
	selectionMenu = ComponentShipSelectionMenu.getComponent()
	leftSection.appendChild(selectionMenu)
}

window.addEventListener('first-placing-finish', () => {
	placeShipsSecond()
})

function placeShipsSecond() {
	if (againstComputer) {
		leftBoard.classList.remove('placing')
		selectionMenu.style.display = 'none'
		rightBoard = Game.getPlayerTwo().gameboard.component.getComponent()
		Game.getPlayerOne().gameboard.component.setHidden(false)
		Game.getPlayerTwo().gameboard.component.setHidden(true)
		Game.randomPlace(false, true)
		rightSection.style.display = 'flex'
		rightBoardOwner.style.display = 'block'
		rightSection.appendChild(rightBoard)
	}
}

window.addEventListener('game-end', () => {
	setTimeout(() => endGame(), 1000)
})

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
