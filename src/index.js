import './styles/reset.css'
import './styles/main.css'
import './styles/util.css'
import Player from './lib/player'
import { ComponentBoard } from './components/board'

const playerOne = new Player('John', false, 1)
const playerTwo = new Player('COMPUTER', true, 2)

const playerOneBoard = new ComponentBoard(playerOne.gameboard, false)
const playerTwoBoard = new ComponentBoard(playerTwo.gameboard, true)

document.body.appendChild(playerOneBoard.getComponent())
document.body.appendChild(playerTwoBoard.getComponent())
