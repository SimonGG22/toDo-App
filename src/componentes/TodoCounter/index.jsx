/* eslint-disable react/prop-types */
import './index.scss'

function TodoCounter ({ total, completed }) {
  let percentage = 0
  if (total == 0) {
    percentage = 0
  } else {
    percentage =  Math.round(((completed/total)*100))
  }

  return (
    <>
      <h1><span>{completed}</span> de <span>{total}</span> ToDos Completados</h1>
      <div className="progress-container">
        <progress className='progress-bar' max={total} value={completed}></progress>
        <span className="progress-label">{percentage}%</span>
      </div>
    </>
  )
}

export {TodoCounter}