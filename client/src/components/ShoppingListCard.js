import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/shoppingListCard.css'
import RenameModal from './RenameModal'

const ShoppingListCard = ({ shoppingListData }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [timeStamp, setTimeStamp] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const deleteShoppingList = async () => {
    if(shoppingListData.deleted) {
      try {
        const response = await fetch(`http://localhost:5000/shoppinglist/permanent-delete/${shoppingListData._id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          console.log('Shopping List has been permanently deleted');
        } else {
          console.error('Error during permanent deletion of the shopping list');
        }
      } catch (error) {
        console.error('Error communicating with the server:', error);
      }
    } else {
      try {
        const response = await fetch(`http://localhost:5000/shoppinglist/delete/${shoppingListData._id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          // Zde můžete provést aktualizaci seznamu, pokud je to nutné
          console.log('Shopping List has been moved to the trash');
        } else {
          console.error('Error during the movingt into the trash');
        }
      } catch (error) {
        console.error('Error communicating with the server:', error);
      }
    }
  };

  const restoreShoppingList = async () => {
    try { 
      const response = await fetch(`http://localhost:5000/shoppinglist/update/${shoppingListData._id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...shoppingListData, deleted: false}),
      })
      if (response.ok) {
        console.log('Shopping List has been restored.')
      } else {
        console.error('Error during the restoration.')
      }
    } catch (error) {
      console.error('Error communicating with the server:', error)
    }
  };

  const toggleDropDown =(e) => {
    e.preventDefault()
    e.stopPropagation();
    setIsDropDownOpen(!isDropDownOpen)
  }

  useEffect(() => {
    if (shoppingListData.updatedAt > shoppingListData.createdAt) {
      const date = new Date(shoppingListData.updatedAt)
      const month = date.getMonth() + 1
      const dayOfMonth = date.getDate()
      const formattedDate = `${dayOfMonth}. ${month}.`
      setTimeStamp(formattedDate) 
    } else {
      const date = new Date(shoppingListData.createdAt)
      const month = date.getMonth() + 1
      const dayOfMonth = date.getDate()
      const formattedDate = `${dayOfMonth}. ${month}.`
      setTimeStamp(formattedDate)
    }
  }, [shoppingListData.updatedAt, shoppingListData.createdAt])


  return (
    <div className='shoppinglist-card-container'>
      <Link className='shoppinglist-card-link' to={shoppingListData.deleted ? '#' : `/shoppinglist/${shoppingListData._id}`}>
        <div className='shoppinglist-card-data-container'>
          <div className='shoppinglist-card-name-wrapper'>
            <h2>{shoppingListData.name}</h2>
          </div>
          <div>
            <p>{timeStamp}</p>
          </div>
          <button onClick={toggleDropDown} ><img src="./option_dots.png" alt="options" /></button>
        </div>
      </Link>
      {isDropDownOpen  && !shoppingListData.deleted && (
        <div className='shoppinglist-card-dropdown'>
          <div className='shoppinglist-card-button' onClick={() => setIsModalOpen(true)} >Rename</div>
          <div className='shoppinglist-card-button' >Share</div>
          <div className='shoppinglist-card-button' onClick={deleteShoppingList}>Delete</div>
        </div>
      )}
      {isDropDownOpen  && shoppingListData.deleted && (
        <div className='shoppinglist-card-dropdown'>
          <div className='shoppinglist-card-button' onClick={restoreShoppingList}>Restore</div>
          <div className='shoppinglist-card-button' onClick={deleteShoppingList}>Delete</div>
        </div>
      )}
      {isModalOpen && (<RenameModal  initialShoppingListData={shoppingListData} isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}}/>)}     
    </div>
  )
}

export default ShoppingListCard