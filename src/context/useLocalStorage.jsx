import { useState, useEffect } from "react"

//  const defaultTodos = [
//    {
//      text: "Tomar el curso de React.js",
//      completed: true
//    },
//    {
//      text: "Aprender HTML/CSS",
//      completed: false
//    },
//    {
//      text: "Llorar con la llorona",
//      completed: false
//    },
//    {
//      text: "JavaScript",
//      completed: false
//    },
//  ];

//  localStorage.setItem('TODOS', JSON.stringify(defaultTodos))

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = useState(initialValue)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName)
        let parsedItem
        if (!localStorage) {
          localStorage.setItem(itemName, JSON.stringify(initialValue))
          parsedItem = initialValue
        } else {
          parsedItem = JSON.parse(localStorageItem)
          setItem(parsedItem)
        }
    
        setLoading(false)
      } catch(error) {
        setLoading(false)
        setError(true)
      }
    }, 2000)
  },[itemName, initialValue])
  
  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem))
    setItem(newItem)
  }

  return {
    item, 
    saveItem, 
    loading, 
    error
  }
}

export {useLocalStorage}