import React from 'react'
import { useEffect, useState } from 'react'
import ShoppingListCard from '../components/ShoppingListCard'
import '../styles/shoppingListList.css'

const ShoppingListList = () => {

  // deklarace stavů
  const [shoppingListData, setShoppingListData] = useState([])
  
  // načtení dat ze serveru
  useEffect(() => {
    fetch('http://localhost:5000/shoppinglist/list')
      .then(response => response.json())
      .then(data => setShoppingListData(data.filter(shoppingList => shoppingList.deleted)))
  }, [shoppingListData])

  return (
      <div className='shoppinglist-list-container'>
          {shoppingListData.map((shoppingList) => (
              <ShoppingListCard key={shoppingList._id} shoppingListData={shoppingList}/> 
          ))}
      </div>
  )
}

export default ShoppingListList