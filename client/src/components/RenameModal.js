import React from 'react'
import { useState, useEffect, useContext } from 'react'
import '../styles/createShoppingListModal.css'
import { ShoppingListsContext } from './context/ShoppingListContext';


const RenameModal = ({ initialShoppingListData, onClose }) => {
  const [shoppingListData, setshoppingListData] = useState({...initialShoppingListData})
  const [error, setError] = useState('')
  const { updateShoppingList  } = useContext(ShoppingListsContext)

  // získání dat seznamu pomocí fetch
  useEffect(() => {
    const fetchShoppingListData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/shoppinglist/get/${shoppingListData._id}`)
        if (!response.ok) {
          throw new Error('Failed to load shopping list details')
        }
        const data = await response.json()
        setshoppingListData(data)
        } catch (error) {
          console.error('Error whyle loading shopping list details:', error)
        }
    }
    fetchShoppingListData() 
  }, [shoppingListData._id])

  const onUpdateShoppingList = async (updatedShoppingListData) => {
    try {
      const response = await fetch(`http://localhost:5000/shoppinglist/update/${shoppingListData._id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedShoppingListData),
      })

      if (response.ok) {
        onClose()
        const updatedList = await response.json()
        updateShoppingList(updatedList)
        console.log('Shopping list was succesfully updated')
      } else {
        console.error('Shopping List wasnt update.')
      }
    } catch (error) {
      console.error('Error communicating with the server:', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!error) {
      onUpdateShoppingList(shoppingListData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setshoppingListData({
      ...shoppingListData,
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
          <h2>Rename Shopping List</h2>
        </div>
        <form className='create-shoppinglist-modal-form' onSubmit={handleSubmit}>
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
              { error && <div className='create-shoppinglist-error-message'>{error}</div> }
            </label>
          </div>
          <div className='create-shoppinglist-modal-button-container'>
            <button onClick={onClose}>Cancel</button>
            <button type="submit">Rename</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RenameModal