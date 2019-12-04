'use strict'
const config = require('../config')
const store = require('../store')

const create = () => {
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

// token is x or o
// cell is 1-8
// over is true or false
const updateGame = (token, cell, over) => {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      game: {
        cell: {
          index: cell,
          value: token
        },
        over: over
      }
    }
  })
}
//
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
//
// const show = (formData) => {
//   return $.ajax({
//     url: config.apiUrl + '/games/' + formData.game.id,
//     method: 'GET',
//     data: formData,
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

module.exports = {
  create,
  updateGame,
  getGames
  // show
}
