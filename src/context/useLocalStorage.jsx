import { useState, useEffect } from "react"

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = useState(initialValue)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName)
        let parsedItem
        if (!localStorageItem) {
          // Initialize with initialValue and save to LocalStorage
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        if (Array.isArray(parsedItem)) {
          setItem(parsedItem);
        } else {
          // If parsedItem is not an array, reset LocalStorage and state to initialValue
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          setItem(initialValue);
        }

        setLoading(false);
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