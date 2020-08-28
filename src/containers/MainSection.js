import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MainSection from '../components/MainSection'
import {
  getTodos,
  getCompletedTodoCount,
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAllTodos,
  clearCompleted,
} from '../slices/todos'

const mapStateToProps = (state) => ({
  todosCount: getTodos(state).length,
  completedCount: getCompletedTodoCount(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      addTodo,
      deleteTodo,
      editTodo,
      completeTodo,
      completeAllTodos,
      clearCompleted,
    },
    dispatch
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainSection)
