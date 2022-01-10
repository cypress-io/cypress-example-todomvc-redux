import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAllTodos,
  clearCompleted,
} from '../slices/todos'
import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../slices/visibilityFilter'

const mapStateToProps = (state) => ({
  filteredTodos: getVisibleTodos(state),
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

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList)

export default VisibleTodoList
