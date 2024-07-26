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
	PassDeviceInterruptionContainer,
} from './components/interruption'
import ComponentShipSelectionMenu from './components/ship-selection'
import { BoardDisplay } from './lib/enums'

const leftSection = document.querySelector('#left-section')
const rightSection = document.querySelector('#right-section')
const leftBoardOwner = leftSection.querySelector('.board-owner')
const rightBoardOwner = rightSection.querySelector('.board-owner')
let leftBoard
let rightBoard
let selectionMenu

const passDeviceInterruptionContainer = PassDeviceInterruptionContainer.getComponent()
const passDeviceInterruption = passDeviceInterruptionContainer.querySelector('dialog')
const continueButton = passDeviceInterruption.querySelector('.continue')

document.body.appendChild(passDeviceInterruptionContainer)

ComponentMessage.init()

showOpening()

function showOpening() {
	const openingInterruptionContainer = OpeningInterruptionContainer.getComponent()
	const openingInterruption = openingInterruptionContainer.querySelector('dialog')
	const againstComputerButton = openingInterruption.querySelector('.against-computer')
	const twoPlayersButton = openingInterruption.querySelector('.two-players')
	document.body.appendChild(openingInterruptionContainer)

	showInterruption(openingInterruptionContainer)
	againstComputerButton.addEventListener('click', e => {
		e.preventDefault()
		Game.againstComputer = true
		document.body.dataset.againstComputer = 'true'
		hideInterruption(openingInterruptionContainer)
		namesSetup()
	})
	twoPlayersButton.addEventListener('click', e => {
		e.preventDefault()
		Game.againstComputer = false
		document.body.dataset.againstComputer = 'false'
		hideInterruption(openingInterruptionContainer)
		namesSetup()
	})
}

function namesSetup() {
	const namingInterruptionContainer = NamingInterruptionContainer.getComponent()
	const namingInterruption = namingInterruptionContainer.querySelector('dialog')
	const namesForm = namingInterruption.querySelector('#names-form')
	const playerOneNameInput = namingInterruption.querySelector('.player-one-name')
	const playerTwoNameInput = namingInterruption.querySelector('.player-two-name')
	document.body.appendChild(namingInterruptionContainer)

	showInterruption(namingInterruptionContainer)
	namesForm.reset()
	namesForm.addEventListener('submit', e => {
		e.preventDefault()
		if (Game.againstComputer) {
			Game.setPlayers(playerOneNameInput.value)
		} else {
			Game.setPlayers(playerOneNameInput.value, playerTwoNameInput.value)
		}
		hideInterruption(namingInterruptionContainer)
		placeShipsFirst()
	})
}

function placeShipsFirst() {
	leftBoardOwner.style.display = 'block'
	rightBoardOwner.style.display = 'none'
	rightSection.style.display = 'none'
	leftBoard = Game.getPlayerOne().gameboard.component.getComponent()
	Game.getPlayerOne().gameboard.component.setDisplay(BoardDisplay.PLACING)
	leftSection.appendChild(leftBoard)
	leftBoardOwner.textContent = Game.getPlayerOne().name
	rightBoardOwner.textContent = Game.getPlayerTwo().name
	selectionMenu = ComponentShipSelectionMenu.getComponent()
	leftSection.appendChild(selectionMenu)
}

window.addEventListener('first-placing-finish', () => {
	if (Game.againstComputer) {
		rightBoard = Game.getPlayerTwo().gameboard.component.getComponent()
		Game.randomPlace(false, true)
		rightBoardOwner.style.display = 'block'
		rightSection.appendChild(rightBoard)
		rightSection.style.display = 'flex'
		startGame()
	} else {
		PassDeviceInterruptionContainer.updateName(Game.getPlayerTwo().name)
		showInterruption(passDeviceInterruptionContainer)
		continueButton.onclick = e => {
			e.preventDefault()
			hideInterruption(passDeviceInterruptionContainer)
			placeShipsSecond()
		}
	}
})

function placeShipsSecond() {
	rightBoard = Game.getPlayerTwo().gameboard.component.getComponent()
	leftSection.style.display = 'none'
	rightSection.style.display = 'flex'
	leftBoardOwner.style.display = 'none'
	rightBoardOwner.style.display = 'block'
	rightSection.appendChild(rightBoard)
	selectionMenu.remove()
	rightSection.appendChild(selectionMenu)
	ComponentShipSelectionMenu.open()
	Game.getPlayerOne().gameboard.component.setDisplay(BoardDisplay.NONE)
	Game.getPlayerTwo().gameboard.component.setDisplay(BoardDisplay.PLACING)
}

window.addEventListener('second-placing-finish', () => {
	if (Game.againstComputer) return
	PassDeviceInterruptionContainer.updateName(Game.getPlayerOne().name)
	showInterruption(passDeviceInterruptionContainer)
	continueButton.onclick = e => {
		e.preventDefault()
		hideInterruption(passDeviceInterruptionContainer)
		startGame()
	}
})

function startGame() {
	ComponentShipSelectionMenu.close()
	Game.getPlayerOne().gameboard.component.setDisplay(BoardDisplay.ACTIVE)
	Game.getPlayerTwo().gameboard.component.setDisplay(BoardDisplay.NO_SHIPS)
	leftSection.style.display = 'flex'
	leftBoardOwner.style.display = 'block'
}

window.addEventListener('game-end', () => {
	setTimeout(() => endGame(), 1000)
})

function endGame() {
	const closingInterruptionContainer = ClosingInterruptionContainer.getComponent()
	const closingInterruption = closingInterruptionContainer.querySelector('dialog')
	const closingText = closingInterruption.querySelector('.interruption-name')
	const rematchButton = closingInterruption.querySelector('.rematch')
	const newPlayersButton = closingInterruption.querySelector('.new-players')
	document.body.appendChild(closingInterruptionContainer)

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
