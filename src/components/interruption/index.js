import './index.css'
import Game from '../../lib/game'

export class OpeningInterruptionContainer {
	static getComponent() {
		const component = document.createElement('div')
		component.style.display = 'none'
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

export class NamingInterruptionContainer {
	static getComponent() {
		const component = document.createElement('div')
		component.style.display = 'none'
		component.classList.add('interruption-container', 'naming-interruption-container')
		component.innerHTML = `
			<dialog class="interruption naming-interruption">
				<form id="names-form" class="names-form">
					<section class="input-section">
						<label for="player-one-name">${Game.againstComputer ? 'Your name' : 'Player 1&apos;s name'}</label>
						<input id="player-one-name" class="player-one-name" name="player-one-name" type="text" required maxlength="30" />
					</section>
					<section class="input-section">
						<label for="player-two-name">Player 2&apos;s name</label>
						<input id="player-two-name" class="player-two-name" name="player-two-name" type="text" required maxlength="30" ${Game.againstComputer ? 'disabled' : ''} />
					</section>
				</form>
				<button type="submit" class="decision start-game" form="names-form">Start</button>
			</dialog>
		`
		return component
	}
}

export class ClosingInterruptionContainer {
	static getComponent() {
		const component = document.createElement('div')
		component.style.display = 'none'
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

export class PassDeviceInterruptionContainer {
	static updateName(name) {
		const component = document.querySelector('.pass-device-interruption-container')
		const text = component.querySelector('.interruption-name')
		text.textContent = `Pass the device to ${name}`
	}

	static getComponent() {
		const component = document.createElement('div')
		component.style.display = 'none'
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

export function showInterruption(container) {
	container.setAttribute('style', 'display: flex;')
	container.querySelector('dialog').show()
}

export function hideInterruption(container) {
	container.setAttribute('style', 'display: none;')
	container.querySelector('dialog').close()
}
