import './index.css'
import { MessageType } from '../../lib/enums'
import ComponentBoard from '../board'

export default class ComponentMessage {
	static leftMessage = null
	static rightMessage = null

	#type
	#content
	#domNode = null
	#activeInterval = null

	constructor(type = MessageType.EMPTY, content = '') {
		this.#type = type
		this.#content = content
	}

	static init() {
		const leftSection = ComponentBoard.leftBoard.getSectionReference()
		const rightSection = ComponentBoard.rightBoard.getSectionReference()

		ComponentMessage.leftMessage = new ComponentMessage()
		ComponentMessage.rightMessage = new ComponentMessage()

		leftSection.appendChild(ComponentMessage.leftMessage.#getNewComponent())
		rightSection.appendChild(ComponentMessage.rightMessage.#getNewComponent())
	}

	#getNewComponent() {
		const component = document.createElement('p')
		this.#domNode = component
		component.classList.add('message')
		this.setType(this.#type)
		this.setContent(this.#content)
		return component
	}

	setType(type) {
		this.#type = type
		this.#domNode.classList.remove('hit', 'important', 'win', 'hidden')
		switch (type) {
			case MessageType.EMPTY:
				this.#domNode.classList.add('hidden')
				break
			case MessageType.HIT:
				this.#domNode.classList.add('hit')
				break
			case MessageType.IMPORTANT:
				this.#domNode.classList.add('important')
				break
			case MessageType.WIN:
				this.#domNode.classList.add('win')
				break
			default:
		}
	}

	setContent(msg) {
		if (msg === '') this.hide()
		else this.show()
		this.#content = msg
		this.streamContent()
	}

	streamContent() {
		this.#domNode.textContent = ''
		if (this.#activeInterval !== null) {
			clearInterval(this.#activeInterval)
		}
		const letters = this.#content.split('')
		let index = 0
		this.#activeInterval = setInterval(() => {
			if (index === letters.length) {
				window.dispatchEvent(new Event('finish-streaming'))
				clearInterval(this.#activeInterval)
				this.#activeInterval = null
				return
			}
			this.#domNode.textContent = this.#domNode.textContent + letters[index]
			index++
		}, 50)
	}

	updateMiss() {
		this.setType(MessageType.DEFAULT)
		this.setContent('Miss.')
	}

	updateHit() {
		this.setType(MessageType.HIT)
		this.setContent("It's a hit!")
	}

	updateSink(shipName = 'ship') {
		this.setType(MessageType.IMPORTANT)
		this.setContent(`The ${shipName} was sunk!`)
	}

	updateWin(forComputer) {
		this.setType(MessageType.WIN)
		if (forComputer) this.setContent('The computer won!')
		else this.setContent('You won!')
	}

	updateEmpty() {
		this.setType(MessageType.EMPTY)
		this.setContent('')
	}

	show() {
		this.#domNode.classList.remove('hidden')
	}

	hide() {
		this.#domNode.classList.add('hidden')
	}
}
