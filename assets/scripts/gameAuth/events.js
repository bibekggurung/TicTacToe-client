'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const player1 = 'X'
const player2 = 'O'
let currentPlayer = player1

let board = ['', '', '', '', '', '', '', '', '']

const onNewGame = (event) => {
  event.preventDefault()
  currentPlayer = player1
  store.over = false
  board = ['', '', '', '', '', '', '', '', '']
  api.create()
    .then(ui.onCreateSuccess)
    .catch(ui.onCreateFailure)
}

const onGetGames = (event) => {
  event.preventDefault()

  api.getGames()
    .then(ui.onGetGamesSuccess)
    .catch(ui.nGetGamesFailure)
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
    $('#message').text('Player X wins!')
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
    $('#message').text('Player O wins!')
    store.over = true
    return true
  } else if (!board.includes('')) {
    $('#message').text('Tie!')
    store.over = false
    return false
  }
}

const onBoxClick = (event) => {
  const $box = $(event.target)
  const cell = $box.attr('id')
  if (store.over === false) {
    if ($(event.target).html() === '') {
      board[cell] = currentPlayer
      $box.css('background', 'transparent').text(currentPlayer)
      api.updateGame(currentPlayer, cell, winConditions(board))
      currentPlayer = currentPlayer === 'O' ? 'X' : 'O'
    } else {
      $('#message').text('Invalid move, bucko.')
    }
  } else {
    $('#message').text('Click New Game to proceed.')
  }
}

const addHandlers = event => {
  $('.box').on('click', onBoxClick)
  $('#new-game').on('submit', onNewGame)
  $('#get-games').on('submit', onGetGames)
}

module.exports = {
  addHandlers
}
