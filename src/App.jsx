import { useContext } from 'react'

import './App.scss'
import { TodoCounter } from './componentes/TodoCounter';
import { TodoSearch } from './componentes/TodoSearch';
import { TodoList } from './componentes/TodoList';
import { TodosLoading } from './componentes/TodosLoading';
import { TodosError } from './componentes/TodosError';
import { EmptyTodos } from './componentes/EmptyTodos';
import { CreateTodoButton } from './componentes/CreateTodoButton';
import { TodoContext, TodoProvider } from './context';


function App() {
  const { loading, error, searchedTodos } = useContext(TodoContext)

  return (
    <div className='container'>
      <div className='background' />
      <TodoCounter />
      <TodoSearch />

      {loading && <><TodosLoading /> <TodosLoading /> <TodosLoading /></>}
      {error && <TodosError />}
      {(!loading && searchedTodos.length === 0) && <EmptyTodos />}

      {<TodoList />}

      <CreateTodoButton />
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