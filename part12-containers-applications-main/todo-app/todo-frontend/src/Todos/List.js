import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map((todo, index) => {
        const doneInfo = (
          <>
            <span>This todo is done</span>
            <span>
              <button onClick={onClickDelete(todo)}> Delete </button>
            </span>
          </>
        )

        const notDoneInfo = (
          <>
            <span>
              This todo is not done
            </span>
            <span>
              <button onClick={onClickDelete(todo)}> Delete </button>
              <button onClick={onClickComplete(todo)}> Set as done </button>
            </span>
          </>
        )

        return (
          // <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
          //   <span>
          //     {todo.text} 
          //   </span>
          //   {todo.done ? doneInfo : notDoneInfo}
          // </div>
          <Todo key={index} doneInfo={doneInfo} notDoneInfo={notDoneInfo} todo={todo} />
        )
      }).reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  )
}

export default TodoList
