module.exports = (on, config) => {
  if (config.testingType === 'component') {
    console.log("HERE")
    const injectDevServer = require('@cypress/react/plugins/react-scripts')
    injectDevServer(on, config)
  } else {
    require('@cypress/code-coverage/task')(on, config)
    on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
  }

  return config
}
