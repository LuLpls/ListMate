import React from 'react'
import { useState } from 'react'

const ItemUpdateModal = ({ initialItemData, onClose, shoppingListId }) => {

  const [ItemData, setItemData] = useState({...initialItemData})
  

  const onUpdateItem = async (updatedItem) => {
   
    try {
      const response = await fetch(`http://localhost:5000/shoppinglist/${shoppingListId}/item/update/${ItemData._id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedItem),
      })

      if (response.ok) {
        console.log('Item was succesfully updated')
      } else {
        // Zpracování chyby, pokud server vrátí chybový stav.
        console.error('Item wasnt updated.')
      }
    } catch (error) {
      // Zpracování chyby při komunikaci se serverem.
      console.error('Error communicating with the server:', error)
    }
  }

  const handleSubmit = () => {
    onUpdateItem(ItemData)
    onClose()
    
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setItemData({
      ...ItemData,
      [name]: value
    })
  }

  return (
    <div className='add-shoppinglist-modal-container'>
      <div className='add-shoppinglist-modal-content'>
        <h2>Update Item</h2>
        <form className='add-shoppinglist-modal-form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              Name: 
              <input 
                placeholder='Item name'
                type="text" 
                name="name"
                value={ItemData.name}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="name">
              Quantity: 
              <input 
                placeholder='Item quantity'
                type="text" 
                name="quantity"
                value={ItemData.quantity}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="name">
              Unit: 
              <input 
                placeholder='Item quantity'
                type="text" 
                name="unit"
                value={ItemData.unit}
                onChange={handleChange}
              />
            </label>
            <div><button>delete</button></div>
            
          </div>
          <div className='add-shoppinglist-modal-button-container'>
            <button onClick={onClose}>Cancel</button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ItemUpdateModal