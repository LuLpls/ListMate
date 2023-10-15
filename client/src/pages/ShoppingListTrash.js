import React from 'react'
import { useEffect, useState, useContext } from 'react'
import ShoppingListCard from '../components/ShoppingListCard'
import '../styles/shoppingListList.css'
import { ShoppingListsContext } from '../components/context/ShoppingListContext'

const ShoppingListList = () => {

  const { shoppingLists, loadShoppingLists  } = useContext(ShoppingListsContext);

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