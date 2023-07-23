import { useContext } from 'react'

import './App.scss'
import { TodoCounter } from './componentes/TodoCounter';
import { TodoSearch } from './componentes/TodoSearch';
import { TodoList } from './componentes/TodoList';
import { TodosLoading } from './componentes/TodosLoading';
import { TodosError } from './componentes/TodosError';
import { EmptyTodos } from './componentes/EmptyTodos';
import { CreateTodoButton } from './componentes/CreateTodoButton';
import { Modal } from './componentes/Modal';
import { TodoForm } from './componentes/TodoForm';
import { TodoContext, TodoProvider } from './context';
import { EditTodoForm } from './componentes/EditTodoForm';
import { EmptySearch } from './componentes/EmptySearch';


function App() {
  const { loading, error, searchedTodos, openModal, openEditModal, todos } = useContext(TodoContext)

  return (
    <div className='container'>
      <div className='background' />
      <TodoCounter />
      <TodoSearch />

      {loading && <><TodosLoading /> <TodosLoading /> <TodosLoading /></>}
      {error && <TodosError />}
      
      {(!loading && todos?.length === 0 && searchedTodos?.length === 0) && <EmptyTodos />}
    {(searchedTodos?.length === 0 && todos?.length !== 0) && <EmptySearch />}

      {<TodoList />}

      <CreateTodoButton />

      {openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}

      {openEditModal && (
        <Modal>
          <EditTodoForm />
        </Modal>
      )}
    </div>
  )
}

export default function AppWithProvider() {
  return (
    <TodoProvider>
      <App />
    </TodoProvider>
  );
}