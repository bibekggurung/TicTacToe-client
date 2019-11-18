'use strict'
const authEvents = require('./auth/events.js')
const gameAuthEvents = require('./gameAuth/events.js')
// const exampleEvents = require('./examples/events.js')
$(() => {
  authEvents.addHandlers()
  gameAuthEvents.addHandlers()
  // exampleEvents.addHandlers()
})
