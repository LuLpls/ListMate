import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/addModal.css'

const CreateModal = ({ initialShoppingListData, onClose }) => {
  const [shoppingListData, setshoppingListData] = useState({...initialShoppingListData})

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
        // přesměrování na nově přidaný nákupní seznam
        onClose()
        console.log('Shopping list was succesfully updated')
      } else {
        // Zpracování chyby, pokud server vrátí chybový stav.
        console.error('Shopping List wasnt update.')
      }
    } catch (error) {
      // Zpracování chyby při komunikaci se serverem.
      console.error('Error communicating with the server:', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateShoppingList(shoppingListData)
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
        <h2>Rename Shopping List</h2>
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
            <button type="submit">Rename</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateModal