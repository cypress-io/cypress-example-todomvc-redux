const findEdgeBrowser = require('./find-edge')
const findBraveBrowser = require('./find-brave')

module.exports = (on, config) => {
  on('task', require('@cypress/code-coverage/task'))
  on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))

  if (!config.browsers) {
    // we are running Cypress < v3.7.0 thus we cannot modify list of browsers
    return
  }

  return Promise.all([findEdgeBrowser(), findBraveBrowser()]).then(([edge, brave]) => {
    return {
      browsers: config.browsers.concat(edge, brave),
    }
  })
}
