# Battleship

![Screenshot](/public/screenshot.png)

## About

`Battleship` is a game in which your goal is to fight and defeat the opponent's fleet. It can be played both against a human player and against the computer.

### Features

- A minimalist design featuring pixel art.
- A smart computer algorithm that is tough to beat.
- A powerful menu for placing ships on the board.
- Feedback after each action.
- The option to have a rematch with the previous players or to change the gamemode after each round.
- An intuitive interface that guides the player to the next stage.
- Minimal markup code.

## What I learned

I have used enums to track the current stage of the game, among other things:

```js
export class GameStage {
	static CONFIG = Symbol('GameStage.CONFIG') // setAgainstComputer, setPlayers
	static PLACING = Symbol('GameStage.PLACING') // placeShip, autoPlace, randomPlace
	static BATTLE = Symbol('GameStage.BATTLE') // makeAttack, attackFromComputer
	static FINISHED = Symbol('GameStage.FINISHED') // rematch, restart
}
```

The code is kept `DRY` through the use of some gnarly helper functions:

```js
export function directionToClassName(direction) {
	const text = direction.toString().slice(7, -1).split('.')[1].toLowerCase()
	return `facing-${text}`
}
```

The `slice(7, -1)` removes the `Symbol(` and `)` from the text and only leaves the name of the enum value.

The notifications shown after each action have a `streaming` effect. It is achieved by setting up an interval and then clearing it when the whole message is visible.

```js
this.#domNode.textContent = '' // Resets the text
if (this.#activeInterval !== null) {
	clearInterval(this.#activeInterval) // Prevents multiple intervals at the same time
}
const letters = this.#content.split('')
let index = 0
this.#activeInterval = setInterval(() => {
	if (index === letters.length) {
		// After all characters have been added
		window.dispatchEvent(new Event('finish-streaming'))
		clearInterval(this.#activeInterval)
		this.#activeInterval = null
		return
	}
	this.#domNode.textContent = this.#domNode.textContent + letters[index]
	index++
}, 50) // Adds one character every 50ms
```

Sometimes, messages are passed between components using dispatched custom events. This creates sort of an implementation for the PubSub model.

```js
// lib/game.js
window.dispatchEvent(new Event('first-placing-finish'))

// index.js
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
```

Some code that references UI components breaks the tests so I need to only run that code in the browser. Here is how I achieve this:

```js
try {
	process
	// Only runs in node
} catch() {
	// Only runs in browser
}
```

This is possible since `process` is a global variable from the Node runtime, and is therefore only recognised by Node.

### Computer algorithm

When playing against the computer, you will notice that it keeps track of hits and will try to triangulate the positions of other parts of the ship.

```js
static attackFromComputer() {
	if (computer.lastHits.length === 0) { // If no recent hits
		while (result === null) { // While it does not try to attack an invalid location
			coords = getRandomCoordinates() // Attack at random
			result = Game.makeAttack(2, ...coords)
		}
	} else if (computer.lastHits.length === 1) { // If it just hit something
		const neighbours = [
			[0, 1],
			[0, -1],
			[-1, 0],
			[1, 0],
		]
		let index = 0
		while (result === null && index < 4) {
			coords = [
				computer.lastHits[0][0] + neighbours[index][0],
				computer.lastHits[0][1] + neighbours[index][1],
			]
			result = Game.makeAttack(2, ...coords) // It will look at the surrounding cells
			index++
		}
		if (index === 4) { // If it cannot hit a surrounding cell it will attack at random
			// ...
		}
	} else if (computer.lastHits.length > 1) { // If more than one recent hit
		let diff = [
			computer.lastHits[1][0] - computer.lastHits[0][0],
			computer.lastHits[1][1] - computer.lastHits[0][1],
		]
		coords = [
			computer.lastHits[computer.lastHits.length - 1][0] + diff[0],
			computer.lastHits[computer.lastHits.length - 1][1] + diff[1],
		]
		result = Game.makeAttack(2, ...coords) // It will move in the same direction while it keeps hitting cells
		if (result === null) { // If it encountered something it will look at the other end of the ship
			computer.lastHits = [computer.lastHits[1], computer.lastHits[0]]
			diff = [
				computer.lastHits[0][0] - computer.lastHits[1][0],
				computer.lastHits[0][1] - computer.lastHits[1][1],
			]
			coords = [
				computer.lastHits[computer.lastHits.length - 1][0] + diff[0],
				computer.lastHits[computer.lastHits.length - 1][1] + diff[1],
			]
			result = Game.makeAttack(2, ...coords)
			if (!result) { // If there is nothing at the other end of the ship it will start from scratch next round
				computer.lastHits = []
			}
		} else if (result === false) { // If it missed it will look at the other end of the ship next round
			computer.lastHits = [computer.lastHits[1], computer.lastHits[0]]
		}
		while (result === null) { // If the algorithm does not produce results, it gives up and attacks at random again
			coords = getRandomCoordinates()
			result = Game.makeAttack(2, ...coords)
		}
	}
	if (result !== false) { // Tracks successful hits
		computer.lastHits.push(coords)
	}
	return result
}
```

## Further development

A list of features to polish and improve the app.

- Establish a testing plan and rewrite outdated tests.
- Add a menu and allow players to navigate back to the menu at any point.
- Implement more meaningful errors.
- Display instructions for new users.
- Improve the user experience when placing ships on the board.
