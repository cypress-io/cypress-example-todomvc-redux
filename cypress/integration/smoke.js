/// <reference types="cypress" />

/**
 * This test goes through a longer user story
 * trying to do almost everything a typical user would do.
 */
export const smokeTest = () => {
  cy.visit('/')
  cy.get('.new-todo')
    .type('write code{enter}')
    .type('write tests{enter}')
    .type('deploy{enter}')
  cy.get('.todo').should('have.length', 3)

  cy.get('.todo')
    .first()
    .find('.toggle')
    .check()
  cy.get('.todo')
    .first()
    .should('have.class', 'completed')

  // by default "All" filter is active
  cy.contains('.filters a.selected', 'All').should('be.visible')
  // check "Active" todos
  cy.contains('.filters a', 'Active')
    .click()
    .should('have.class', 'selected')
    .should('be.visible')
  cy.get('.todo').should('have.length', 2)
  // check "Completed" todos
  cy.contains('.filters a', 'Completed')
    .click()
    .should('have.class', 'selected')
    .should('be.visible')
  cy.get('.todo').should('have.length', 1)

  // remove completed todos
  cy.get('.clear-completed').click()
  cy.get('.todo').should('have.length', 0)
  cy.contains('.filters a', 'All')
    .click()
    .should('have.class', 'selected')
    .should('be.visible')
  cy.get('.todo').should('have.length', 2)
}
