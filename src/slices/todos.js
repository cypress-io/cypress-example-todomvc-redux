import { createSlice, createSelector } from '@reduxjs/toolkit'

export const TODOS_FEATURE_KEY = 'todos'

const initialState = (window.Cypress && window.initialState) || []

const todosSlice = createSlice({
  name: TODOS_FEATURE_KEY,
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: action.payload.text,
      })
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id)
    },
    editTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      state[index] = { ...state[index], text: action.payload.text }
    },
    completeTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      state[index] = { ...state[index], completed: !state[index].completed }
    },
    completeAllTodos: (state) => {
      const areAllMarked = state.every((todo) => todo.completed)

      return state.map((todo) => ({
        ...todo,
        completed: !areAllMarked,
      }))
    },
    clearCompleted: (state) => state.filter((todo) => todo.completed === false),
  },
})

export const {
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAllTodos,
  clearCompleted,
} = todosSlice.actions

export default todosSlice.reducer

export const getTodos = (state) => state[TODOS_FEATURE_KEY]

export const getCompletedTodoCount = createSelector(getTodos, (todos) =>
  todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
)
