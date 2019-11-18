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

const onNewGame = (event) => {
  event.preventDefault()
  turn = 0
  currentPlayer = player_x
  api.create()
  .then(ui.onCreateSuccess)
  .catch(ui.onCreateFailure)
}

const onIndex = (event) => {
  event.preventDefault()

  api.index()
    .then(ui.onIndexSuccess)
    .catch(ui.onIndexFailure)
}

const winConditions = board => {
  if ((board[0] === 'X' && board[1] === 'X' && board[2] === 'X') ||
  (board[3] === 'X' && board[4] === 'X' && board[5] === 'X') ||
(board[6] === 'X' && board[7] === 'X' && board[8] === 'X') ||
(board[0] === 'X' && board[3] === 'X' && board[6] === 'X') ||
(board[1] === 'X' && board[4] === 'X' && board[7] === 'X') ||
(board[2] === 'X' && board[5] === 'X' && board[8] === 'X') ||
(board[0] === 'X' && board[4] === 'X' && board[8] === 'X') ||
(board[2] === 'X' && board[4] === 'X' && board[6] === 'X')) {
    $('#message').html('Winner: Player X')
    currentPlayer = player1
    store.over = true
    return true
  } else if ((board[0] === 'O' && board[1] === 'O' && board[2] === 'O') ||
  (board[3] === 'O' && board[4] === 'O' && board[5] === 'O') ||
(board[6] === 'O' && board[7] === 'O' && board[8] === 'O') ||
(board[0] === 'O' && board[3] === 'O' && board[6] === 'O') ||
(board[1] === 'O' && board[4] === 'O' && board[7] === 'O') ||
(board[2] === 'O' && board[5] === 'O' && board[8] === 'O') ||
(board[0] === 'O' && board[4] === 'O' && board[8] === 'O') ||
(board[2] === 'O' && board[4] === 'O' && board[6] === 'O')){
  $('#message').html('Winner: Player 0')
  store.over = true
  return true
} else {
  ('#message').html('Tie')
  store.over = false
  return false
}

module.exports = {
  onCreate,
  onIndex,
  onShow,
  onPlay
}
