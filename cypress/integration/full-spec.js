// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />

// check this file using TypeScript if available
// @ts-check

// ***********************************************
// All of these tests are written to implement
// the official TodoMVC tests written for Selenium.
//
// The Cypress tests cover the exact same functionality,
// and match the same test names as TodoMVC.
// Please read our getting started guide
// https://on.cypress.io/introduction-to-cypress
//
// You can find the original TodoMVC tests here:
// https://github.com/tastejs/todomvc/blob/master/tests/test.js
// ***********************************************

// setup these constants to match what TodoMVC does
const TODO_ITEM_ONE = 'buy some cheese'
const TODO_ITEM_TWO = 'feed the cat'
const TODO_ITEM_THREE = 'book a doctors appointment'
// if you need 3 todos created instantly on load
const initialState = [
  {
    id: 0,
    text: TODO_ITEM_ONE,
    completed: false
  },
  {
    id: 1,
    text: TODO_ITEM_TWO,
    completed: false
  },
  {
    id: 2,
    text: TODO_ITEM_THREE,
    completed: false
  }
]

const visitWithInitialTodos = () => {
  cy.visit('/', {
    onBeforeLoad (win) {
      // @ts-ignore
      win.initialState = initialState
    }
  })
  cy.get('.todo').as('todos')
}

describe('TodoMVC - React', function () {
  beforeEach(function () {
    // By default Cypress will automatically
    // clear the Local Storage prior to each
    // test which ensures no todos carry over
    // between tests.
    //
    // Go out and visit our local web server
    // before each test, which serves us the
    // TodoMVC App we want to test against
    //
    // We've set our baseUrl to be http://localhost:8888
    // which is automatically prepended to cy.visit
    //
    // https://on.cypress.io/api/visit
    cy.visit('/')
  })

  // a very simple example helpful during presentations
  it('adds 2 todos', function () {
    cy.get('.new-todo')
      .type('learn testing{enter}')
      .type('be cool{enter}')
    cy.get('.todo-list li').should('have.length', 2)
  })

  context('When page is initially opened', function () {
    it('should focus on the todo input field', function () {
      // get the currently focused element and assert
      // that it has class='new-todo'
      //
      // http://on.cypress.io/focused
      cy.focused().should('have.class', 'new-todo')
    })
  })

  context('No Todos', function () {
    it('should hide #main and #footer', function () {
      // Unlike the TodoMVC tests, we don't need to create
      // a gazillion helper functions which are difficult to
      // parse through. Instead we'll opt to use real selectors
      // so as to make our testing intentions as clear as possible.
      //
      // http://on.cypress.io/get
      cy.get('.todo-list li').should('not.exist')
      cy.get('.footer').should('not.exist')
    })
  })

  context('New Todo', function () {
    // New commands used here:
    // https://on.cypress.io/type
    // https://on.cypress.io/eq
    // https://on.cypress.io/find
    // https://on.cypress.io/contains
    // https://on.cypress.io/should
    // https://on.cypress.io/as

    it('should allow me to add todo items', function () {
      // create 1st todo
      cy.get('.new-todo')
        .type(TODO_ITEM_ONE)
        .type('{enter}')

      // make sure the 1st label contains the 1st todo text
      cy.get('.todo-list li')
        .eq(0)
        .find('label')
        .should('contain', TODO_ITEM_ONE)

      // create 2nd todo
      cy.get('.new-todo')
        .type(TODO_ITEM_TWO)
        .type('{enter}')

      // make sure the 2nd label contains the 2nd todo text
      cy.get('.todo-list li')
        .eq(1)
        .find('label')
        .should('contain', TODO_ITEM_TWO)
    })

    it('adds items', function () {
      // create several todos then check the number of items in the list
      cy.get('.new-todo')
        .type('todo A{enter}')
        .type('todo B{enter}') // we can continue working with same element
        .type('todo C{enter}') // and keep adding new items
        .type('todo D{enter}')
      cy.get('.todo-list li').should('have.length', 4)
    })

    it('should clear text input field when an item is added', function () {
      cy.get('.new-todo')
        .type(TODO_ITEM_ONE)
        .type('{enter}')
      cy.get('.new-todo').should('have.text', '')
    })

    it('should append new items to the bottom of the list', function () {
      // this is an example of a custom command
      // defined in cypress/support/commands.js
      cy.createDefaultTodos().as('todos')

      // even though the text content is split across
      // multiple <span> and <strong> elements
      // `cy.contains` can verify this correctly
      cy.get('.todo-count').contains('3 items left')

      cy.get('@todos')
        .eq(0)
        .find('label')
        .should('contain', TODO_ITEM_ONE)
      cy.get('@todos')
        .eq(1)
        .find('label')
        .should('contain', TODO_ITEM_TWO)
      cy.get('@todos')
        .eq(2)
        .find('label')
        .should('contain', TODO_ITEM_THREE)
    })

    it('should trim text input', function () {
      // this is an example of another custom command
      // since we repeat the todo creation over and over
      // again. It's up to you to decide when to abstract
      // repetitive behavior and roll that up into a custom
      // command vs explicitly writing the code.
      cy.createTodo(`    ${TODO_ITEM_ONE}    `)

      // we use as explicit assertion here about the text instead of
      // using 'contain' so we can specify the exact text of the element
      // does not have any whitespace around it
      cy.get('.todo-list li')
        .eq(0)
        .should('have.text', TODO_ITEM_ONE)
    })

    it('should show #main and #footer when items added', function () {
      cy.createTodo(TODO_ITEM_ONE)
      cy.get('.main').should('be.visible')
      cy.get('.footer').should('be.visible')
    })

    it('does nothing without entered text', () => {
      cy.get('.new-todo').type('{enter}')
    })
  })

  context('Item', function () {
    // New commands used here:
    // - cy.clear    https://on.cypress.io/api/clear

    it('should allow me to mark items as complete', function () {
      // we are aliasing the return value of
      // our custom command 'createTodo'
      //
      // the return value is the <li> in the <ul.todos-list>
      cy.createTodo(TODO_ITEM_ONE).as('firstTodo')
      cy.createTodo(TODO_ITEM_TWO).as('secondTodo')

      cy.get('@firstTodo')
        .find('.toggle')
        .check()
      cy.get('@firstTodo').should('have.class', 'completed')

      cy.get('@secondTodo').should('not.have.class', 'completed')
      cy.get('@secondTodo')
        .find('.toggle')
        .check()

      cy.get('@firstTodo').should('have.class', 'completed')
      cy.get('@secondTodo').should('have.class', 'completed')
    })

    it('should allow me to un-mark items as complete', function () {
      cy.createTodo(TODO_ITEM_ONE).as('firstTodo')
      cy.createTodo(TODO_ITEM_TWO).as('secondTodo')

      cy.get('@firstTodo')
        .find('.toggle')
        .check()
      cy.get('@firstTodo').should('have.class', 'completed')
      cy.get('@secondTodo').should('not.have.class', 'completed')

      cy.get('@firstTodo')
        .find('.toggle')
        .uncheck()
      cy.get('@firstTodo').should('not.have.class', 'completed')
      cy.get('@secondTodo').should('not.have.class', 'completed')
    })

    it('should allow me to edit an item', function () {
      cy.createDefaultTodos().as('todos')

      cy.get('@todos')
        .eq(1)
        .as('secondTodo')
        // TODO: fix this, dblclick should
        // have been issued to label
        .find('label')
        .dblclick()

      // clear out the inputs current value
      // and type a new value
      cy.get('@secondTodo')
        .find('.edit')
        .clear()
        .type('buy some sausages')
        .type('{enter}')

      // explicitly assert about the text value
      cy.get('@todos')
        .eq(0)
        .should('contain', TODO_ITEM_ONE)
      cy.get('@secondTodo').should('contain', 'buy some sausages')
      cy.get('@todos')
        .eq(2)
        .should('contain', TODO_ITEM_THREE)
    })

    it('should delete item', () => {
      cy.createDefaultTodos().as('todos')
      // the destroy element only becomes visible on hover
      cy.get('@todos')
        .eq(1)
        .find('.destroy')
        .click({ force: true })
      cy.get('@todos').should('have.length', 2)
      cy.get('@todos')
        .eq(0)
        .should('contain', TODO_ITEM_ONE)
      cy.get('@todos')
        .eq(1)
        .should('contain', TODO_ITEM_THREE)
    })
  })

  context('Counter', function () {
    it('should display the current number of todo items', function () {
      cy.createTodo(TODO_ITEM_ONE)
      cy.get('.todo-count').contains('1 item left')
      cy.createTodo(TODO_ITEM_TWO)
      cy.get('.todo-count').contains('2 items left')
    })
  })
})

context('Mark all as completed', function () {
  // New commands used here:
  // - cy.check    https://on.cypress.io/api/check
  // - cy.uncheck  https://on.cypress.io/api/uncheck
  const completeAll = () => {
    // complete all todos
    cy.get('[data-cy-toggle-all]').click({ force: true })
  }

  beforeEach(visitWithInitialTodos)

  it('should allow me to mark all items as completed', function () {
    completeAll()

    // get each todo li and ensure its class is 'completed'
    cy.get('@todos')
      .eq(0)
      .should('have.class', 'completed')
    cy.get('@todos')
      .eq(1)
      .should('have.class', 'completed')
    cy.get('@todos')
      .eq(2)
      .should('have.class', 'completed')
  })

  it('should allow me to clear the complete state of all items', function () {
    // check and then immediately uncheck
    cy.get('.toggle-all')
      .check()
      .uncheck()

    cy.get('@todos')
      .eq(0)
      .should('not.have.class', 'completed')
    cy.get('@todos')
      .eq(1)
      .should('not.have.class', 'completed')
    cy.get('@todos')
      .eq(2)
      .should('not.have.class', 'completed')
  })

  it('complete all checkbox should update state when items are completed / cleared', function () {
    completeAll()

    // alias the .toggle-all for reuse later
    cy.get('.toggle-all')
      .as('toggleAll')
      // this assertion is silly here IMO but
      // it is what TodoMVC does
      .should('be.checked')

    // alias the first todo and then click it
    cy.get('.todo-list li')
      .eq(0)
      .as('firstTodo')
      .find('.toggle')
      .uncheck()

    // reference the .toggle-all element again
    // and make sure its not checked
    cy.get('@toggleAll').should('not.be.checked')

    // reference the first todo again and now toggle it
    cy.get('@firstTodo')
      .find('.toggle')
      .check()

    // assert the toggle all is checked again
    cy.get('@toggleAll').should('be.checked')
  })
})

context('Editing', function () {
  // New commands used here:
  // - cy.blur    https://on.cypress.io/api/blur

  beforeEach(visitWithInitialTodos)

  it('should hide other controls when editing', function () {
    cy.get('@todos')
      .eq(1)
      .as('secondTodo')
      .find('label')
      .dblclick()

    cy.get('@secondTodo')
      .find('.toggle')
      .should('not.exist')
    cy.get('@secondTodo')
      .find('label')
      .should('not.exist')
  })

  it('should save edits on blur', function () {
    cy.get('@todos')
      .eq(1)
      .as('secondTodo')
      .find('label')
      .dblclick()

    cy.get('@secondTodo')
      .find('.edit')
      .clear()
      .type('buy some sausages')
      // we can just send the blur event directly
      // to the input instead of having to click
      // on another button on the page. though you
      // could do that its just more mental work
      .blur()

    cy.get('@todos')
      .eq(0)
      .should('contain', TODO_ITEM_ONE)
    cy.get('@secondTodo').should('contain', 'buy some sausages')
    cy.get('@todos')
      .eq(2)
      .should('contain', TODO_ITEM_THREE)
  })

  it('should trim entered text', function () {
    cy.get('@todos')
      .eq(1)
      .as('secondTodo')
      .find('label')
      .dblclick()

    cy.get('@secondTodo')
      .find('.edit')
      .clear()
      .type('    buy some sausages    ')
      .type('{enter}')

    cy.get('@todos')
      .eq(0)
      .should('contain', TODO_ITEM_ONE)
    cy.get('@secondTodo').should('contain', 'buy some sausages')
    cy.get('@todos')
      .eq(2)
      .should('contain', TODO_ITEM_THREE)
  })

  it('should remove the item if an empty text string was entered', function () {
    cy.get('@todos')
      .eq(1)
      .as('secondTodo')
      .find('label')
      .dblclick()

    cy.get('@secondTodo')
      .find('.edit')
      .clear()
      .type('{enter}')

    cy.get('@todos').should('have.length', 2)
  })
})

context('Clear completed button', function () {
  beforeEach(visitWithInitialTodos)

  it('should display the correct text', function () {
    cy.get('@todos')
      .eq(0)
      .find('.toggle')
      .check()
    cy.get('.clear-completed').contains('Clear completed')
  })

  it('should remove completed items when clicked', function () {
    cy.get('@todos')
      .eq(1)
      .find('.toggle')
      .check()
    cy.get('.clear-completed').click()
    cy.get('@todos').should('have.length', 2)
    cy.get('@todos')
      .eq(0)
      .should('contain', TODO_ITEM_ONE)
    cy.get('@todos')
      .eq(1)
      .should('contain', TODO_ITEM_THREE)
  })

  it('should be hidden when there are no items that are completed', function () {
    cy.get('@todos')
      .eq(1)
      .find('.toggle')
      .check()
    cy.get('.clear-completed')
      .should('be.visible')
      .click()
    cy.get('.clear-completed').should('not.exist')
  })
})

context('Routing', function () {
  beforeEach(visitWithInitialTodos)

  it('should allow me to display active items', function () {
    cy.get('@todos')
      .eq(1)
      .find('.toggle')
      .check()
    cy.get('.filters')
      .contains('Active')
      .click()
    cy.get('@todos')
      .eq(0)
      .should('contain', TODO_ITEM_ONE)
    cy.get('@todos')
      .eq(1)
      .should('contain', TODO_ITEM_THREE)
  })

  it.skip('should respect the back button', function () {
    cy.get('@todos')
      .eq(1)
      .find('.toggle')
      .check()
    cy.get('.filters')
      .contains('Active')
      .click()
    cy.get('.filters')
      .contains('Completed')
      .click()
    cy.get('@todos').should('have.length', 1)
    cy.go('back')
    cy.get('@todos').should('have.length', 2)
    cy.go('back')
    cy.get('@todos').should('have.length', 3)
  })

  it('should allow me to display completed items', function () {
    cy.get('@todos')
      .eq(1)
      .find('.toggle')
      .check()
    cy.get('.filters')
      .contains('Completed')
      .click()
    cy.get('@todos').should('have.length', 1)
  })

  it('should allow me to display all items', function () {
    cy.get('@todos')
      .eq(1)
      .find('.toggle')
      .check()
    cy.get('.filters')
      .contains('Active')
      .click()
    cy.get('.filters')
      .contains('Completed')
      .click()
    cy.get('.filters')
      .contains('All')
      .click()
    cy.get('@todos').should('have.length', 3)
  })

  it('should highlight the currently applied filter', function () {
    // using a within here which will automatically scope
    // nested 'cy' queries to our parent element <ul.filters>
    cy.get('.filters').within(function () {
      cy.contains('All').should('have.class', 'selected')
      cy.contains('Active')
        .click()
        .should('have.class', 'selected')
      cy.contains('Completed')
        .click()
        .should('have.class', 'selected')
    })
  })
})
