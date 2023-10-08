import React from 'react'
import { useEffect, useState } from 'react'
import ShoppingListCard from '../components/ShoppingListCard'
import '../styles/shoppingListList.css'
import CreateModal from '../components/CreateModal'

const ShoppingListList = () => {

  // deklarace stavů
  const [shoppingListData, setShoppingListData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // načtení dat ze serveru
  useEffect(() => {
    fetch('http://localhost:5000/shoppinglist/list')
      .then(response => response.json())
      .then(data => setShoppingListData(data.filter(shoppingList => !shoppingList.deleted)))
  }, [shoppingListData])

  return (
    <div>
      <div className='shoppinglist-list-button-wrapper'>
        <button onClick={() => {setIsModalOpen(true)}}>Create List</button>
      </div>
      <div className='shoppinglist-list-container'>
          {shoppingListData.map((shoppingList) => (
            <ShoppingListCard key={shoppingList._id} shoppingListData={shoppingList}/>
          ))}
      </div>
          {isModalOpen && (<CreateModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}}/>)}
    </div>
  )
}

export default ShoppingListList