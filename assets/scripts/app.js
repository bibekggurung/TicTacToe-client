'use strict'
const authEvents = require('./auth/events.js')
// const exampleEvents = require('./examples/events.js')
$(() => {
  authEvents.addHandlers()
  // exampleEvents.addHandlers()
})
