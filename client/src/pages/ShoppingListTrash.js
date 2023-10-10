import React from 'react'
import { useEffect, useState, useContext } from 'react'
import ShoppingListCard from '../components/ShoppingListCard'
import '../styles/shoppingListList.css'
import { ShoppingListContext } from '../components/context/ShoppingListContext'

const ShoppingListList = () => {

  const { shoppingLists, loadShoppingLists  } = useContext(ShoppingListContext);

  useEffect(() => {
    loadShoppingLists(true)
  },[])

  return (
      <div className='shoppinglist-list-container'>
          {shoppingLists.map((shoppingList) => (
              <ShoppingListCard key={shoppingList._id} shoppingListData={shoppingList}/> 
          ))}
      </div>
  )
}

export default ShoppingListList