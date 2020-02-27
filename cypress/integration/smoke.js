/// <reference types="cypress" />

/**
 * This test goes through a longer user story
 * trying to do almost everything a typical user would do.
 */
export const smokeTest = () => {
  cy.visit('/')
  cy.log('add 3 todos')
  cy.get('.new-todo')
    .type('write code{enter}')
    .type('write tests{enter}')
    .type('deploy{enter}')
  cy.get('.todo').should('have.length', 3)

  cy.log('1st todo has been done')
  cy.get('.todo').first().find('.toggle')
    .check()
  cy.get('.todo')
    .first()
    .should('have.class', 'completed')

  cy.log('by default "All" filter is active')
  cy.contains('.filters a.selected', 'All').should('be.visible')
  cy.contains('.filters a', 'Active').click()
    .should('have.class', 'selected').and('be.visible')
  cy.get('.todo').should('have.length', 2)

  cy.log('check "Completed" todos')
  cy.contains('.filters a', 'Completed').click()
    .should('have.class', 'selected').and('be.visible')
  cy.get('.todo').should('have.length', 1)

  cy.log('remove completed todos')
  cy.get('.clear-completed').click()
  cy.get('.todo').should('have.length', 0)
  cy.contains('.filters a', 'All')
    .click()
    .should('have.class', 'selected')
    .and('be.visible')
  cy.get('.todo').should('have.length', 2)
}
