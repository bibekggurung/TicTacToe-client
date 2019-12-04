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
  // May need to reset board variable and currentPlayer and store.over
  // let turn = 0
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

// const onIndex = (event) => {
//   event.preventDefault()
//
//   api.index()
//     .then(ui.onIndexSuccess)
//     .catch(ui.onIndexFailure)
// }
//
// const onShow = (event) => {
//   event.preventDefault()
//
//   const form = event.target
//   const formData = getFormFields(form)
//
//   api.show(formData)
//     .then(ui.onShowSuccess)
//     .catch(ui.onShowFailure)
// }

const winConditions = board => {
  // let gameWinner = ''
  if ((board[0] === 'X' && board[1] === 'X' && board[2] === 'X') ||
    (board[3] === 'X' && board[4] === 'X' && board[5] === 'X') ||
    (board[6] === 'X' && board[7] === 'X' && board[8] === 'X') ||
    (board[0] === 'X' && board[3] === 'X' && board[6] === 'X') ||
    (board[1] === 'X' && board[4] === 'X' && board[7] === 'X') ||
    (board[2] === 'X' && board[5] === 'X' && board[8] === 'X') ||
    (board[0] === 'X' && board[4] === 'X' && board[8] === 'X') ||
    (board[2] === 'X' && board[4] === 'X' && board[6] === 'X')) {
    // gameWinner = player1
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
    // gameWinner = player2
    $('#message').text('Player O wins!')
    store.over = true
    return true
  } else if (!board.includes('')) {
    // if ((board[0] === 'X' || board[0] === 'O' && board[1] === 'X' || board[1] === 'O' && board[2] === 'X' || 'O') ||
    $('#message').text('Tie!')
    store.over = false
    return false
  }
}

const onBoxClick = (event) => {
  console.log('Click!')
  const $box = $(event.target)
  const cell = $box.attr('id')
  console.log('Cell filled', cell)
  if (store.over === false) {
    if ($(event.target).html() === '') {
      board[cell] = currentPlayer
      $box.css('background', 'transparent').text(currentPlayer)
      // console.log('Game won:', winConditions(board))
      api.updateGame(currentPlayer, cell, winConditions(board))
      currentPlayer = currentPlayer === 'O' ? 'X' : 'O'
    } else {
      $('#message').text('Invalid move, bucko.')
    }
  } else {
    $('#message').text('Click New Game to proceed.')
  }
}

// const gameData = {
//   game: {
//     cell: {
//       index: 0,
//       value: currentPlayer
//     },
//     over: false
//   }
// }

const addHandlers = event => {
  $('.box').on('click', onBoxClick)
  // $('.box').on('click', onGameOver)
  $('#new-game').on('submit', onNewGame)
  $('#get-games').on('submit', onGetGames)
}

module.exports = {
  addHandlers
  // onNewGame,
  // onIndex,
  // onShow
}
