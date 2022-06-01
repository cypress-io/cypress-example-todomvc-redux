const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    'cypress-plugin-snapshots': {},
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)

      on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
    
      return config
    },
    baseUrl: 'http://localhost:1234',
    excludeSpecPattern: ['**/*.snap', '**/__snapshot__/*', '**/smoke.js'],
  },
})
