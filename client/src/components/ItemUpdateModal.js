import React from 'react'
import { useState, useContext } from 'react'
import { ShoppingListDetailContext } from '../components/context/ItemContext'
import '../styles/updateItemModal.css'

const ItemUpdateModal = ({ initialItemData, onClose, shoppingListId }) => {

  const [ItemData, setItemData] = useState({...initialItemData})
  const [errors, setErrors] = useState({name: '', quantity: '', unit: ''})
  const { updateItem, deleteItem } = useContext(ShoppingListDetailContext)
  
  const handleSubmit = (e) => {
    if (!errors.name && !errors.unit) {
      updateItem(shoppingListId, initialItemData._id, ItemData  )
      onClose()
    }
    e.preventDefault()
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setItemData({
      ...ItemData,
      [name]: value
    })
    
    if (name === 'name') {
      if (value.length > 30) {
        setErrors((prevErrors) => ({ ...prevErrors, name: 'The name must not exceed 30 characters.' }))
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, name: '' }))
      }
    }
      
    if (name === 'unit') {
      if (value.length > 10) {
        setErrors((prevErrors) => ({ ...prevErrors, unit: 'The unit must not exceed 10 characters.' }))
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, unit: '' }))
      }
    }
  }

  return (
    <div className='update-item-modal-container'>
      <div className='update-item-modal-content'>
        <div className='update-item-modal-title'>
          <h2>Update Item</h2>
        </div>
        <form className='update-item-modal-form' onSubmit={handleSubmit}>
          <div className='update-item-modal-inputs-container'>
            <div className='update-item-modal-name-input'>
              <label htmlFor="name">
                Name: 
                <input 
                  placeholder='Item name'
                  type="text" 
                  name="name"
                  required
                  value={ItemData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className='update-item-modal-error-message-name'>{errors.name}</div>}
              </label>
            </div>
            <div className='update-item-modal-quantity-unit-container'>
              <div className='update-item-modal-quantity-input'>
                <label htmlFor="quantity">
                  Quantity: 
                  <input 
                    placeholder='Item quantity'
                    type="number" 
                    name="quantity"
                    max={999}
                    value={ItemData.quantity}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className='update-item-modal-unit-input'>
                <label htmlFor="unit">
                  Unit: 
                  <input 
                    placeholder='Item unit'
                    type="text" 
                    name="unit"
                    value={ItemData.unit}
                    onChange={handleChange}
                  />
                  {errors.unit && <div className='update-item-modal-error-message-unit'>{errors.unit}</div>}
                </label>
              </div>
            </div>
          </div>
          <div className='update-item-modal-button-container'>
            <button onClick={onClose}>Cancel</button>
            <button type="submit">Update</button>
            <div className='update-item-modal-delete-button'>
              <button  onClick={() => {deleteItem(shoppingListId, initialItemData._id)}}>Delete</button>  
            </div>
            
          </div>
        </form>
      </div>
    </div>
  )
}

export default ItemUpdateModal