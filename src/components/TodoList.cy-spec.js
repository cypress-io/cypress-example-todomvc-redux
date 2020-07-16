/// <reference types="cypress" />
import React from 'react'
import TodoList from './TodoList'
// an alternative to boilerplate code
// re-use app's store creation method
import { StoreProvider } from '../store'
import {mount} from 'cypress-react-unit-test'

const setup = () => {
  const props = {
    filteredTodos: [
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }, {
        text: 'Run the tests',
        completed: true,
        id: 1
      }
    ],
    // we need to create stubs
    // because the component runs validation on props
    actions: {
      editTodo: cy.stub(),
      deleteTodo: cy.stub(),
      completeTodo: cy.stub(),
      completeAll: cy.stub(),
      clearCompleted: cy.stub()
    }
  }

  mount(
    <StoreProvider>
      <TodoList {...props} />
    </StoreProvider>,
    { cssFile: 'node_modules/todomvc-app-css/index.css' }
  )
}

describe('components', () => {
  describe('TodoList', () => {
    it('should render container', () => {
      setup()
      cy.get('ul').should('have.class', 'todo-list')
    })

    it('should render todos', () => {
      setup()
      cy.get('li').should('have.length', 2)
        .first().should('have.class', 'todo').and('have.text', 'Use Redux')
        .find('input[type=checkbox]').should('not.be.checked')

      cy.get('li')
        .eq(1).should('have.class', 'todo').and('have.text', 'Run the tests')
        .find('input[type=checkbox]').should('be.checked')
    })
  })
})
