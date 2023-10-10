import React from 'react'
import { useEffect, useState, useContext } from 'react'
import ShoppingListCard from '../components/ShoppingListCard'
import '../styles/shoppingListList.css'
import CreateModal from '../components/CreateModal'
import { ShoppingListContext } from '../components/context/ShoppingListContext'

const ShoppingListList = () => {

  // deklarace stavů
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { shoppingLists, loadShoppingLists  } = useContext(ShoppingListContext);

  useEffect(() => {
    loadShoppingLists(false)
  },[])

  return (
    <div>
      <div className='shoppinglist-list-button-wrapper'>
        <button onClick={() => {setIsModalOpen(true)}}>Create List</button>
      </div>
      <div className='shoppinglist-list-container'>
          {shoppingLists.map((shoppingList) => (
            <ShoppingListCard key={shoppingList._id} shoppingListData={shoppingList}/>
          ))}
      </div>
          {isModalOpen && (<CreateModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}}/>)}
    </div>
  )
}

export default ShoppingListList