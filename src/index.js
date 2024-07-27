import './styles/reset.css'
import './styles/main.css'
import './styles/util.css'
import Game from './lib/game'
import ComponentMessage from './components/message'
import Interruption from './components/interruption'
import ShipMenu from './components/ship-selection'
import { BoardDisplay } from './lib/enums'
import ComponentBoard from './components/board'

ComponentBoard.init()
ComponentMessage.init()
Interruption.init()
ShipMenu.init()

showOpening()

function showOpening() {
	Interruption.opening.show()
	Interruption.opening.againstComputerButton.addEventListener('click', e => {
		e.preventDefault()
		Game.setAgainstComputer(true)
		Interruption.opening.hide()
		namesSetup()
	})
	Interruption.opening.twoPlayersButton.addEventListener('click', e => {
		e.preventDefault()
		Game.setAgainstComputer(false)
		Interruption.opening.hide()
		namesSetup()
	})
}

function namesSetup() {
	Interruption.naming.update()
	Interruption.naming.show()
	Interruption.naming.form.reset()
	Interruption.naming.form.addEventListener('submit', e => {
		e.preventDefault()
		Game.setPlayers(Interruption.naming.firstInput.value, Interruption.naming.secondInput.value)
		Interruption.naming.hide()
		placeShipsFirst()
	})
}

function placeShipsFirst() {
	ComponentBoard.leftBoard.updateOwnerText(Game.getPlayerOne().name)
	ComponentBoard.rightBoard.updateOwnerText(Game.getPlayerTwo().name)
	ComponentBoard.leftBoard.setDisplay(BoardDisplay.PLACING)
}

window.addEventListener('first-placing-finish', () => {
	if (Game.againstComputer) {
		Game.randomPlace(false, true)
		startGame()
	} else {
		Interruption.pass.updateName(Game.getPlayerTwo().name)
		Interruption.pass.show()
		Interruption.pass.continueButton.onclick = e => {
			e.preventDefault()
			Interruption.pass.hide()
			placeShipsSecond()
		}
	}
})

function placeShipsSecond() {
	ShipMenu.moveToRight()
	ShipMenu.reload()
	ComponentBoard.leftBoard.setDisplay(BoardDisplay.NONE)
	ComponentBoard.rightBoard.setDisplay(BoardDisplay.PLACING)
}

window.addEventListener('second-placing-finish', () => {
	if (Game.againstComputer) return // Triggered even if the ships were placed automatically
	Interruption.pass.updateName(Game.getPlayerOne().name)
	Interruption.pass.show()
	Interruption.pass.continueButton.onclick = e => {
		e.preventDefault()
		Interruption.pass.hide()
		startGame()
	}
})

function startGame() {
	ShipMenu.close()
	ComponentBoard.leftBoard.setDisplay(BoardDisplay.ACTIVE)
	ComponentBoard.rightBoard.setDisplay(BoardDisplay.NO_SHIPS)
}

window.addEventListener('game-end', () => {
	setTimeout(() => endGame(), 1000)
})

function endGame() {
	Interruption.closing.show()
	Interruption.closing.updateName(Game.winner.name)
	Interruption.closing.rematchButton.addEventListener('click', e => {
		e.preventDefault()
		location.reload() //TODO
	})
	Interruption.closing.newPlayersButton.addEventListener('click', e => {
		e.preventDefault()
		location.reload() //TODO
	})
}
