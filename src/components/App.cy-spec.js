// compare to App.spec.js
import React from 'react'
import App from './App'

// we are making mini application - thus we need a store!
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../reducers'
const store = createStore(reducer)

describe('components', () => {
  it('should render', () => {
    cy.mount(
      <Provider store={store}>
        <App></App>
      </Provider>
    )
    cy.get('header').should('be.visible')
    // you can see that without any todos, the main section is empty
    // and thus invisible
    cy.get('.main').should('exist')
  })
})
