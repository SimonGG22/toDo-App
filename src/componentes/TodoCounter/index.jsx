/* eslint-disable react/prop-types */
import { useContext } from 'react'
import './index.scss'
import { TodoContext } from '../../context'

function TodoCounter () {
  const {totalTodos, completedTodos } = useContext(TodoContext)

  let percentage = 0
  if (totalTodos == 0) {
    percentage = 0
  } else {
    percentage =  Math.round(((completedTodos/totalTodos)*100))
  }

  return (
    <>
      <h1><span>{completedTodos}</span> de <span>{totalTodos}</span> ToDos Completados</h1>
      <div className="progress-container">
        <progress className='progress-bar' max={totalTodos} value={completedTodos}></progress>
        <span className="progress-label">{percentage}%</span>
      </div>
    </>
  )
}

export {TodoCounter}