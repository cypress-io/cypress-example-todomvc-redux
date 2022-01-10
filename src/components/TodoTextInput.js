import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function TodoTextInput(props) {
  const [text, setText] = useState(props.text || '')

  const handleSubmit = (event) => {
    const text = event.target.value.trim()
    if (event.which === 13) {
      props.onSave(text)
      if (props.newTodo) {
        setText('')
      }
    }
  }

  const handleChange = (event) => {
    setText(event.target.value)
  }

  const handleBlur = (event) => {
    if (!props.newTodo) {
      props.onSave(event.target.value)
    }
  }

  return (
    <input
      className={classnames({
        edit: props.editing,
        'new-todo': props.newTodo,
      })}
      type="text"
      placeholder={props.placeholder}
      autoFocus
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  )
}
TodoTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool,
}

export default TodoTextInput
