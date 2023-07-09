import { useContext } from 'react'
import './index.scss'
import { TodoContext } from '../../context'

function CreateTodoButton () {
    const { openModal, setOpenModal } = useContext(TodoContext)

    return (
        <button onClick={() => setOpenModal(!openModal)}>Nuevo To Do</button>
    )
}

export {CreateTodoButton}