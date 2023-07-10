import { useContext } from 'react'

import './index.scss'
import { TodoContext } from '../../context'

function EditTodoForm () {
    const { setOpenEditModal, openEditModal, newTodoValue, setNewTodoValue, editTodoText} = useContext(TodoContext)
    
    const onSubmit = (event) => {
        event.preventDefault()
        editTodoText(newTodoValue)
        setOpenEditModal(!openEditModal)
    }

    const onChange = (event) => {
        setNewTodoValue(event.target.value)
    }

    const onCancel = () => {
        setOpenEditModal(!openEditModal)
    }

    return (
            <form onSubmit={onSubmit}>
                <label>Escribe un nuevo todo</label>
                <textarea value={newTodoValue} onChange={onChange}/>
                <div className='todoForm-buttonContainer'>
                    <button type='button' onClick={onCancel} className='todoForm-button cancel'>Cancelar</button>
                    <button type='submit' className='todoForm-button add'>Editar</button>
                </div>
            </form>
    )
}

export { EditTodoForm }