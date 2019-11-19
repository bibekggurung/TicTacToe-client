'use strict'

const config = require('../config')
const store = require('../store')

const createGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: '{}'
  })
}

const updateGame = (index, value, over) => {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.gameID,
    method: 'PATCH',
    headers: { Authorization: 'Token token=' + store.user.token },
    data: {
      game: {
        cell: {
          index: index,
          value: value
        },
        over: over
      }
    }
  }
  )
}

const getGames = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showGame = formData => {
  const id = formData.game.id
  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createGame,
  updateGame,
  getGames,
  showGame
}
