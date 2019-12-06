'use strict'
const store = require('../store')

const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui.js')

const onSignup = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signUp(formData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signIn(formData)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onChangePassword = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const onSignOut = (event) => {
  event.preventDefault()
  store.over = true
  $('.box').text('')
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const addHandlers = event => {
  $('#sign-up').on('submit', onSignup)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
}

module.exports = {
  addHandlers
}
