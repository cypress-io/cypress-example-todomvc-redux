import { createSlice, createSelector } from '@reduxjs/toolkit'

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import { getTodos } from './todos'

export const VISIBILITY_FILTER_FEATURE_KEY = 'visibilityFilter'

const visibilityFilterSlice = createSlice({
  name: VISIBILITY_FILTER_FEATURE_KEY,
  initialState: SHOW_ALL,
  reducers: {
    setVisibilityFilter: (_, action) => action.payload,
  },
})

export const {
  setVisibilityFilter,
  showAll,
  showCompleted,
  showActive,
} = visibilityFilterSlice.actions

export default visibilityFilterSlice.reducer

const getVisibilityFilter = (state) => state[VISIBILITY_FILTER_FEATURE_KEY]

export const getVisibleTodos = createSelector(
  getVisibilityFilter,
  getTodos,
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case SHOW_ALL:
        return todos
      case SHOW_COMPLETED:
        return todos.filter((t) => t.completed)
      case SHOW_ACTIVE:
        return todos.filter((t) => !t.completed)
      default:
        throw new Error('Unknown filter: ' + visibilityFilter)
    }
  }
)
