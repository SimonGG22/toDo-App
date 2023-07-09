/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider({ children }) {

  // Get localstorage data
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS', [])

  // Search ToDos input  
  const [searchValue, setSearchValue] = React.useState('')

  const searchedTodos = todos.filter(
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    }
  );

  // Completed Todo
  const completedTodos = todos.filter(
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
  const addTodo = (text) => {
    const newTodos = [...todos]
    newTodos.push({
      text,
      completed: false
    })
    saveTodos(newTodos)
  }


  // Open/Close modal create todo
  const [openModal, setOpenModal] = useState(false)


  const totalTodos = todos.length;
  
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
      openModal,
      setOpenModal,
      addTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };