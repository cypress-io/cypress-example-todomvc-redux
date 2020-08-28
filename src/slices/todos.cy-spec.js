/// <reference types="cypress" />
import todosReducer, {
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAllTodos,
  clearCompleted,
} from './todos'

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(todosReducer(undefined, {})).to.deep.equal([])
  })

  it(`should handle ${addTodo}`, () => {
    expect(todosReducer([], addTodo({ text: 'Run the tests' }))).to.deep.equal([
      {
        text: 'Run the tests',
        completed: false,
        id: 0,
      },
    ])

    expect(
      todosReducer(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
        ],
        addTodo({
          text: 'Run the tests',
        })
      )
    ).to.deep.equal([
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
      {
        text: 'Run the tests',
        completed: false,
        id: 1,
      },
    ])

    expect(
      todosReducer(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
          {
            text: 'Run the tests',
            completed: false,
            id: 1,
          },
        ],
        addTodo({
          text: 'Fix the tests',
        })
      )
    ).to.deep.equal([
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
      {
        text: 'Run the tests',
        completed: false,
        id: 1,
      },
      {
        text: 'Fix the tests',
        completed: false,
        id: 2,
      },
    ])
  })

  it(`should handle ${deleteTodo}`, () => {
    expect(
      todosReducer(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
          {
            text: 'Run the tests',
            completed: false,
            id: 1,
          },
        ],
        deleteTodo({
          id: 1,
        })
      )
    ).to.deep.equal([
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
    ])
  })

  it(`should handle ${editTodo}`, () => {
    expect(
      todosReducer(
        [
          {
            text: 'Run the tests',
            completed: false,
            id: 1,
          },
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
        ],
        editTodo({
          text: 'Fix the tests',
          id: 1,
        })
      )
    ).to.deep.equal([
      {
        text: 'Fix the tests',
        completed: false,
        id: 1,
      },
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
    ])
  })

  it(`should handle ${completeTodo}`, () => {
    expect(
      todosReducer(
        [
          {
            text: 'Run the tests',
            completed: false,
            id: 1,
          },
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
        ],
        completeTodo({
          id: 1,
        })
      )
    ).to.deep.equal([
      {
        text: 'Run the tests',
        completed: true,
        id: 1,
      },
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
    ])
  })

  it(`should handle ${completeAllTodos}`, () => {
    expect(
      todosReducer(
        [
          {
            text: 'Run the tests',
            completed: true,
            id: 1,
          },
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
        ],
        completeAllTodos()
      )
    ).to.deep.equal([
      {
        text: 'Run the tests',
        completed: true,
        id: 1,
      },
      {
        text: 'Use Redux',
        completed: true,
        id: 0,
      },
    ])

    // Unmark if all todos are currently completed
    expect(
      todosReducer(
        [
          {
            text: 'Run the tests',
            completed: true,
            id: 1,
          },
          {
            text: 'Use Redux',
            completed: true,
            id: 0,
          },
        ],
        completeAllTodos()
      )
    ).to.deep.equal([
      {
        text: 'Run the tests',
        completed: false,
        id: 1,
      },
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
    ])
  })

  it(`should handle ${clearCompleted}`, () => {
    expect(
      todosReducer(
        [
          {
            text: 'Run the tests',
            completed: true,
            id: 1,
          },
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
        ],
        clearCompleted()
      )
    ).to.deep.equal([
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
    ])
  })

  it(`should not generate duplicate ids after ${clearCompleted}`, () => {
    expect(
      [
        completeTodo({
          id: 0,
        }),
        clearCompleted(),
        addTodo({
          text: 'Write more tests',
        }),
      ].reduce(todosReducer, [
        {
          id: 0,
          completed: false,
          text: 'Use Redux',
        },
        {
          id: 1,
          completed: false,
          text: 'Write tests',
        },
      ])
    ).to.deep.equal([
      {
        text: 'Write tests',
        completed: false,
        id: 1,
      },
      {
        text: 'Write more tests',
        completed: false,
        id: 2,
      },
    ])
  })
})
