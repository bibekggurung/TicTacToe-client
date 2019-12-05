'use strict'

const store = require('../store')
const onCreateFailure = () => {
  $('#message').html('Whoops! Could not create game.')
}

const onCreateSuccess = (responseData) => {
  store.game = responseData.game
  $('form').trigger('reset')
  $('#gameID').text(`Game ID: ${store.game.id}`)
  $('.box').html('')
  $('#message').text('New game started')
}

const onGetGamesSuccess = (responseData) => {
  $('#message').text('You played ' + responseData.games.length + ' games.')
}

const onGetGamesFailure = () => {
  $('#message').html('Whoops! Could not get games.')
}

module.exports = {
  onCreateSuccess,
  onCreateFailure,
  onGetGamesSuccess,
  onGetGamesFailure
}
