/// <reference types="cypress" />

import { getVisibleTodos } from '../../src/slices/visibilityFilter'

describe('getVisibleTodos', () => {
  it('throws an error for unknown visibility filter', () => {
    expect(() => {
      getVisibleTodos({
        todos: [],
        visibilityFilter: 'unknown-filter',
      })
    }).to.throw()
  })
})
