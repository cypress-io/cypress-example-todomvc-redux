/// <reference types="cypress" />
import {completeAllTodos} from '../../src/actions'
describe('data store', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad (win) {
        win.skipRender = true
      }
    })
  })

  it('adds todos', () => {
    cy.window().its('store').invoke('dispatch', {
      type: 'ADD_TODO',
      text: 'My todo'
    })

    cy.window().its('store').invoke('dispatch', {
      type: 'ADD_TODO',
      text: 'second todo'
    })

    cy.window().its('store').invoke('dispatch', {
      type: 'ADD_TODO',
      text: 'third todo'
    })

    cy.window().its('store').invoke('getState')
      .its('todos')
      .should('have.length', 3)

    cy.window().its('store').invoke('dispatch', completeAllTodos())

    cy.window().its('store').invoke('getState')
      .its('todos').should('deep.equal', [{id: 0, completed: true, text: "My todo"},
      {id: 1, completed: true, text: "second todo"},
      {id: 2, completed: true, text: "third todo"},])
  })
})
