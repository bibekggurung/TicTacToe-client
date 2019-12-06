'use strict'
const store = require('../store')

const onSuccess = message => {
  $('#message').text(message).addClass('success').removeClass('failure')
  $('form').trigger('reset')
}

const onFailure = message => {
  $('#message').text(message).addClass('failure').removeClass('success')
  $('form').trigger('reset')
}

const onSignUpSuccess = () => {
  onSuccess('New account created! Now sign in below.')
}

const onSignUpFailure = () => {
  onFailure('Not created')
}

const onSignInSuccess = (responseData) => {
  store.user = responseData.user
  onSuccess('Welcome! Click new game!')
  $('.after-auth').show()
  $('.before-auth').hide()
}

const onSignInFailure = () => {
  onFailure('Access denied.')
}

const onChangePasswordSuccess = () => {
  onSuccess('Changed password successfully')
}

const onChangePasswordFailure = () => {
  onFailure('You failed to change password.')
}

const onSignOutSuccess = () => {
  store.user = store
  onSuccess('See ya!')

  store.user = {}
  $('.after-auth').hide()
  $('.before-auth').show()
}

const onSignOutFailure = () => {
  onFailure('You\'re still here.')
}

module.exports = {
  onSignInFailure,
  onSignInSuccess,
  onSignOutFailure,
  onSignOutSuccess,
  onSignUpFailure,
  onSignUpSuccess,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
