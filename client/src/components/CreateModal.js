import React from 'react'
import { useState, useContext } from 'react'
import '../styles/createModal.css'
import {  ShoppingListContext } from './context/ShoppingListContext'

const CreateModal = ({ onClose }) => {
  const [shoppingListName, setshoppingListName] = useState({
    name: '',
  })

  const { addShoppingList } = useContext(ShoppingListContext)

  const onAddShoppingList = async (shoppingListName) => {
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
        addShoppingList(createdShoppingList)
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

    onAddShoppingList(shoppingListName)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setshoppingListName({
      ...shoppingListName,
      [name]: value,
    })
  }

  return (
    <div className='add-shoppinglist-modal-container'>
      <div className='add-shoppinglist-modal-content'>
        <h2>Create Shopping List</h2>
        
        <form className='add-shoppinglist-modal-form' onSubmit={handleSubmit}>
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
            </label>
          </div>
          <div className='add-shoppinglist-modal-button-container'>
            <button onClick={onClose}>Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
      
    </div>
  )
}

export default CreateModal