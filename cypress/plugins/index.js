module.exports = (on, config) => {
  on('task', require('cypress-istanbul/task'))
  on('file:preprocessor', require('cypress-istanbul/use-babelrc'))

  return config
}
