/* eslint-disable react/prop-types */
import { useState, createContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = createContext();

function TodoProvider({ children }) {

  // Get localstorage data
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS', [])

  // Search ToDos input  
  const [searchValue, setSearchValue] = useState('')

  const searchedTodos = todos?.filter(
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    }
  );


  // Completed Todo
  const completedTodos = todos?.filter(
    todo => !!todo.completed
  ).length;
  
  const completeTodo = (text) => {
    const newTodos = [...todos]
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    )
    if (newTodos[todoIndex].completed == false) {
      newTodos[todoIndex].completed = true
      saveTodos(newTodos)
    } else {
      newTodos[todoIndex].completed = false
      saveTodos(newTodos)
    }

  }
  
  // Delete Todo     
  const deleteTodo = (text) => {
    const newTodos = [...todos]
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    )
    newTodos.splice(todoIndex, 1)
    saveTodos(newTodos)
  }

  // Add Todo
  const [newTodoValue, setNewTodoValue] = useState('')
  
  const addTodo = (text) => {
    const newTodos = [...todos]
    newTodos.push({
      text,
      completed: false
    })
    saveTodos(newTodos)
  }

  // Edit Todo 
  const [index,setIndex] = useState(0)

  const editTodo = (text) => {
    setOpenEditModal(!openEditModal)
    setNewTodoValue(text);
    const indexValue = todos?.findIndex((todo) => todo.text === text)
    setIndex (indexValue);
  }

  const editTodoText = () => {
    const newTodos = [...todos];
    const updatedTodo = { ...newTodos[index], text: newTodoValue , completed: false }
    newTodos.splice(index, 1, updatedTodo);
    saveTodos(newTodos)
  }

  // Open/Close modal create todo
  const [openModal, setOpenModal] = useState(false)

  // Open/Close modal Edit todo
  const [openEditModal, setOpenEditModal] = useState(false)


  const totalTodos = todos?.length;
  
  return (
    <TodoContext.Provider value={{
      todos,
      loading,
      error,
      saveTodos,
      completedTodos,
      totalTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      completeTodo,
      deleteTodo,
      openEditModal,
      setOpenEditModal,
      openModal,
      setOpenModal,
      addTodo,
      newTodoValue,
      setNewTodoValue,
      editTodo,
      editTodoText,
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };