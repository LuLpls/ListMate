import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import '../styles/shoppingListCard.css'
import RenameModal from './RenameModal'
import { ShoppingListContext } from '../components/context/ShoppingListContext'

const ShoppingListCard = ({ shoppingListData }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [timeStamp, setTimeStamp] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { shoppingLists, deleteShoppingList, restoreShoppingList  } = useContext(ShoppingListContext);

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
          <div className='shoppinglist-card-button' onClick={() => {deleteShoppingList(shoppingListData)}}>Delete</div>
        </div>
      )}
      {isDropDownOpen  && shoppingListData.deleted && (
        <div className='shoppinglist-card-dropdown'>
          <div className='shoppinglist-card-button' onClick={() => {restoreShoppingList(shoppingListData)}}>Restore</div>
          <div className='shoppinglist-card-button' onClick={() => {deleteShoppingList(shoppingListData)}} >Delete</div>
        </div>
      )}
      {isModalOpen && (<RenameModal  initialShoppingListData={shoppingListData} isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}}/>)}     
    </div>
  )
}

export default ShoppingListCard