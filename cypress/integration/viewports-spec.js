/// <reference types="cypress" />

;['macbook-15', 'iphone-6'].forEach(viewport => {
  it(`works on ${viewport}`, () => {
    cy.viewport(viewport)
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
  })
})
