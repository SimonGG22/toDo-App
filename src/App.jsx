import { useState } from 'react'

import './App.scss'
import { TodoCounter } from './componentes/TodoCounter';
import { TodoSearch } from './componentes/TodoSearch';
import { TodoList } from './componentes/TodoList';
import { TodosLoading } from './componentes/TodosLoading';
import { TodosError } from './componentes/TodosError';
import { EmptyTodos } from './componentes/EmptyTodos';
import { CreateTodoButton } from './componentes/CreateTodoButton';

import { useLocalStorage } from './context/useLocalStorage'


function App() {
  const {
    item: todos, 
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS', [])
  const [searchValue, setSearchValue] = useState('')

  const completedTodos = todos.filter(todo => todo.completed).length

  const searchedTodos = todos.filter(todo => {
    return todo.text.toLowerCase().includes(searchValue.toLowerCase())
  })

  return (
    <div className='container'>
      <div className='background'/>
      <TodoCounter completed={completedTodos} total={todos.length} />
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      {loading && <><TodosLoading /> <TodosLoading /> <TodosLoading /></> }
      {error && <TodosError />}
      {(!loading && searchedTodos.length == 0) && <EmptyTodos /> }

      {<TodoList todos={searchedTodos} setTodos={saveTodos} />}
       
      <CreateTodoButton />
    </div>
  )
}

export default App
