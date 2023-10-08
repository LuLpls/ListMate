import React from 'react'
import { useState } from 'react'
import '../styles/addModal.css'

const CreateModal = ({ isOpen, onClose }) => {
  const [shoppingListData, setshoppingListData] = useState({
    name: '',
  })

  const onAddShoppingList = async (shoppingListData) => {
    try {
      const response = await fetch('http://localhost:5000/shoppinglist/post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shoppingListData),
      })

      if (response.ok) {
        // přesměrování na nově přidaný recept
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

    onAddShoppingList(shoppingListData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setshoppingListData({
      ...shoppingListData,
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
                value={shoppingListData.name}
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