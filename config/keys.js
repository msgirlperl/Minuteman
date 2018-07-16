// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // return prod keys (this environment variable is set by Heroku)
  module.exports = require('./prod')
} else {
  // we are in development - return dev keys
  module.exports = require('./dev')
}
