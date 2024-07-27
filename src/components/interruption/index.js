import './index.css'
import Game from '../../lib/game'

export default class Interruption {
	static opening
	static naming
	static closing
	static pass

	containerNode
	dialogNode

	constructor() {
		this.containerNode = this.getNewContainer()
		this.dialogNode = this.containerNode.querySelector('dialog')
		this.hide()
		document.body.appendChild(this.getContainerReference())
	}

	static init() {
		Interruption.opening = new OpeningInterruption()
		Interruption.naming = new NamingInterruption()
		Interruption.closing = new ClosingInterruption()
		Interruption.pass = new PassDeviceInterruption()
	}

	getDialogReference() {
		return this.dialogNode
	}

	getContainerReference() {
		return this.containerNode
	}

	show() {
		this.containerNode.classList.remove('hidden')
		this.dialogNode.show()
	}

	hide() {
		this.containerNode.classList.add('hidden')
		this.dialogNode.close()
	}
}

class OpeningInterruption extends Interruption {
	againstComputerButton
	twoPlayersButton

	constructor() {
		super()
		this.againstComputerButton = this.dialogNode.querySelector('.against-computer')
		this.twoPlayersButton = this.dialogNode.querySelector('.two-players')
	}

	getNewContainer() {
		const component = document.createElement('div')
		component.classList.add('interruption-container', 'opening-interruption-container')
		component.innerHTML = `
			<dialog class="interruption opening-interruption">
				<h1 class="interruption-name">Select gamemode</h1>
				<div class="buttons">
					<button class="decision against-computer">Against computer</button>
					<button class="decision two-players">Two players</button>
				</div>
			</dialog>
		`
		return component
	}
}

class NamingInterruption extends Interruption {
	startButton
	form
	firstInput
	secondInput

	constructor() {
		super()
		this.startButton = this.dialogNode.querySelector('.start-game')
		this.form = this.dialogNode.querySelector('form')
		this.firstInput = this.dialogNode.querySelector('.player-one-name')
		this.secondInput = this.dialogNode.querySelector('.player-two-name')
	}

	update() {
		const label = this.dialogNode.querySelector('label[for="player-one-name"]')
		label.textContent = Game.againstComputer ? 'Your name' : "Player 1's name"
		if (Game.againstComputer) this.secondInput.setAttribute('disabled', '')
	}

	getNewContainer() {
		const component = document.createElement('div')
		component.classList.add('interruption-container', 'naming-interruption-container')
		component.innerHTML = `
			<dialog class="interruption naming-interruption">
				<form id="names-form" class="names-form">
					<section class="input-section">
						<label for="player-one-name"></label>
						<input id="player-one-name" class="player-one-name" name="player-one-name" type="text" required maxlength="30" />
					</section>
					<section class="input-section">
						<label for="player-two-name">Player 2&apos;s name</label>
						<input id="player-two-name" class="player-two-name" name="player-two-name" type="text" required maxlength="30" />
					</section>
				</form>
				<button type="submit" class="decision start-game" form="names-form">Start</button>
			</dialog>
		`
		return component
	}
}

class ClosingInterruption extends Interruption {
	rematchButton
	newPlayersButton

	constructor() {
		super()
		this.rematchButton = this.dialogNode.querySelector('.rematch')
		this.newPlayersButton = this.dialogNode.querySelector('.new-players')
	}

	updateName(name) {
		const text = this.dialogNode.querySelector('.interruption-name')
		text.textContent = `${name} won!`
	}

	getNewContainer() {
		const component = document.createElement('div')
		component.classList.add('interruption-container', 'closing-interruption-container')
		component.innerHTML = `
			<dialog class="interruption closing-interruption">
				<h1 class="interruption-name"></h1>
				<div class="buttons">
					<button class="decision rematch">Rematch</button>
					<button class="decision new-players">New players</button>
				</div>
			</dialog>
		`
		return component
	}
}

class PassDeviceInterruption extends Interruption {
	continueButton

	constructor() {
		super()
		this.continueButton = this.dialogNode.querySelector('.continue')
	}

	updateName(name) {
		const text = this.dialogNode.querySelector('.interruption-name')
		text.textContent = `Pass the device to ${name}`
	}

	getNewContainer() {
		const component = document.createElement('div')
		component.classList.add('interruption-container', 'pass-device-interruption-container')
		component.innerHTML = `
			<dialog class="interruption pass-device-interruption">
				<h1 class="interruption-name"></h1>
				<button class="decision continue">Continue</button>
			</dialog>
		`
		return component
	}
}
