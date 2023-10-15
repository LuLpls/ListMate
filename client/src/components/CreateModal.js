import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/createShoppingListModal.css'
import {  ShoppingListsContext } from './context/ShoppingListContext'

const CreateModal = ({ onClose }) => {
  const [shoppingListName, setshoppingListName] = useState({ name: '' })
  const [error, setError] = useState('')

  const { createShoppingList } = useContext(ShoppingListsContext)
 const navigate = useNavigate()

  const onCreateShoppingList = async (shoppingListName) => {
    try {
      const response = await fetch('http://localhost:5000/shoppinglist/post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shoppingListName),
      })

      if (response.ok) {
        const createdShoppingList = await response.json()
        createShoppingList(createdShoppingList)
        navigate(`/shoppinglist/${createdShoppingList._id}`);
        onClose()
        console.log('ShoppingList was succesfully created')
      } else {
        // Zpracování chyby, pokud server vrátí chybový stav.
        console.error('Shopping List wasnt craeated.')
      }
    } catch (error) {
      // Zpracování chyby při komunikaci se serverem.
      console.error('Chyba při komunikaci se serverem:', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!error) {
      onCreateShoppingList(shoppingListName)
    }
    
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setshoppingListName({
      ...shoppingListName,
      [name]: value,
    })

    if (value.length > 30) {
      setError('The name must not exceed 30 characters.')
    } else {
      setError('')
    }
  }

  return (
    <div className='create-shoppinglist-modal-container'>
      <div className='create-shoppinglist-modal-content'>
        <div className='create-shoppinglist-modal-title'>
          <h2>Create Shopping List</h2>
        </div>
        
        
        <form className='create-shoppinglist-modal-form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              Name: 
              <input 
                placeholder='New list'
                type="text" 
                name="name"
                value={shoppingListName.name}
                onChange={handleChange}
              />
              { error && <div className='create-shoppinglist-error-message'>{error}</div> }
            </label>
          </div>
          <div className='create-shoppinglist-modal-button-container'>
            <button onClick={onClose}>Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
      
    </div>
  )
}

export default CreateModal