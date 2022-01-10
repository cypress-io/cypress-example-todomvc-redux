/// <reference types="cypress" />
// compare to App.spec.js
import React from 'react'
import App from './App'
import { mount } from 'cypress-react-unit-test'
// we are making mini application - thus we need a store!
import { Provider } from 'react-redux'
import { store } from '../store'
import { addTodo, completeTodo } from '../slices/todos'

describe('components', () => {
  const setup = () => {
    cy.viewport(600, 700)
    // our CSS styles assume the app is inside
    // a DIV element with class "todoapp"
    mount(
      <Provider store={store}>
        <div className="todoapp">
          <App></App>
        </div>
      </Provider>,
      { cssFile: 'node_modules/todomvc-app-css/index.css' }
    )
  }

  it('should render', () => {
    setup()
    cy.get('header').should('be.visible')
    // you can see that without any todos, the main section is empty
    // and thus invisible
    cy.get('.main').should('exist')
  })

  it('should render a couple todos', () => {
    // use application code to interact with store
    store.dispatch(addTodo({ text: 'write app code' }))
    store.dispatch(addTodo({ text: 'test components using Cypress' }))
    store.dispatch(completeTodo({ id: 1 }))
    setup()

    // make sure the list of items is correctly checked
    cy.get('.todo').should('have.length', 2)
    cy.contains('.todo', 'write app code').should('not.have.class', 'completed')
    cy.contains('.todo', 'test components using Cypress').should(
      'have.class',
      'completed'
    )
  })
})
