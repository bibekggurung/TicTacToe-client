'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')

store.turn = 0

let turn = 0
const player1 = 'X'
const player2 = 'O'
let currentPlayer = player1

// const onNewGame = (event) => {
//   event.preventDefault()
//   turn = 0
//   currentPlayer = player1
//   api.create()
//     .then(ui.onCreateSuccess)
//     .catch(ui.onCreateFailure)
// }

// const onIndex = (event) => {
//   event.preventDefault()
//
//   api.index()
//     .then(ui.onIndexSuccess)
//     .catch(ui.onIndexFailure)
// }

const board = ['', '', '', '', '', '', '', '', '']

const winConditions = board => {
  let gameWinner = ''
  if ((board[0] === 'X' && board[1] === 'X' && board[2] === 'X') ||
    (board[3] === 'X' && board[4] === 'X' && board[5] === 'X') ||
    (board[6] === 'X' && board[7] === 'X' && board[8] === 'X') ||
    (board[0] === 'X' && board[3] === 'X' && board[6] === 'X') ||
    (board[1] === 'X' && board[4] === 'X' && board[7] === 'X') ||
    (board[2] === 'X' && board[5] === 'X' && board[8] === 'X') ||
    (board[0] === 'X' && board[4] === 'X' && board[8] === 'X') ||
    (board[2] === 'X' && board[4] === 'X' && board[6] === 'X')) {
    gameWinner = player1
    console.log('Player X has won!', 'Game winner is:', gameWinner)
    store.over = true
    return true
  } else if ((board[0] === 'O' && board[1] === 'O' && board[2] === 'O') ||
    (board[3] === 'O' && board[4] === 'O' && board[5] === 'O') ||
    (board[6] === 'O' && board[7] === 'O' && board[8] === 'O') ||
    (board[0] === 'O' && board[3] === 'O' && board[6] === 'O') ||
    (board[1] === 'O' && board[4] === 'O' && board[7] === 'O') ||
    (board[2] === 'O' && board[5] === 'O' && board[8] === 'O') ||
    (board[0] === 'O' && board[4] === 'O' && board[8] === 'O') ||
    (board[2] === 'O' && board[4] === 'O' && board[6] === 'O')) {
    console.log(`Player O has won!`, 'Game winner is:', gameWinner)
    gameWinner = player2
    store.over = true
    return true
  } else {
    console.log('Tie!')
    store.over = false
    return false
  }
}

const onBoxClick = (event) => {
  console.log('Click!')
  const $box = $(event.target)
  const cell = $box.attr('id')
  console.log('Cell filled', cell)
  board[cell] = currentPlayer
  $box.css('background', 'transparent').text(currentPlayer)
  currentPlayer = currentPlayer === 'O' ? 'X' : 'O'
  // check winConditions
  // winConditions(board)
  console.log('Game won:', winConditions(board))
  // update game api
}

// const onGameOver = (event) => {
//   if ($('.col-4').text() === 'x' || 'o') {
//     console.log('Game on')
//   } else {
//     console.log('Game over')
// }

const addHandlers = event => {
  $('.box').on('click', onBoxClick)
  // $('.box').on('click', onGameOver)
  // $('#new-game').on('submit', onNewGame)
}

// ('#message').html('Tie')
// store.over = true

// const gameOver = () => {
//   if (winConditions() !== true) {
//     return false
//   } else {
//     return true
//   }
// }

module.exports = {
  addHandlers
  // onNewGame,
  // onIndex,
  // onShow,
  // onPlay
}
