import { useContext, useState } from 'react'

import './index.scss'
import { TodoContext } from '../../context'

function TodoForm () {
    const { setOpenModal, openModal, addTodo } = useContext(TodoContext)
    const [newTodoValue, setNewTodoValue] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        addTodo(newTodoValue)
        setOpenModal(!openModal)
    }

    const onChange = (event) => {
        setNewTodoValue(event.target.value)
    }

    const onCancel = () => {
        setOpenModal(!openModal)
    }

    return (
            <form onSubmit={onSubmit}>
                <label>Escribe un nuevo todo</label>
                <textarea value={newTodoValue} onChange={onChange}/>
                <div className='todoForm-buttonContainer'>
                    <button type='button' onClick={onCancel} className='todoForm-button cancel'>Cancelar</button>
                    <button type='submit' className='todoForm-button add'>Agregar</button>
                </div>
            </form>
    )
}

export { TodoForm }