/// <reference types="cypress" />

it('adds todos', () => {
  cy.visit('/')
  cy.get('.new-todo')
    .type('write code{enter}')
    .type('write tests{enter}')
    .type('deploy{enter}')
  cy.get('.todo') // command
    .should('have.length', 3) // assertion
})
