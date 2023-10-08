import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect} from 'react'

const ShoppingListDetail = () => {

  const { id } = useParams()

  const [shoppingListData, setShoppingListData] = useState(null)

  // získání dat seznamu pomocí fetch
  useEffect(() => {
    if (id) {
        const fetchShoppingListData = async () => {
            try {
              const response = await fetch(`http://localhost:5000/shoppinglist/get/${id}`)
              if (!response.ok) {
                throw new Error('Failed to load shopping list details.')
              }
              const data = await response.json()
              setShoppingListData(data)
            } catch (error) {
                console.error('Error whyle loading shopping list details:', error)
            }
        }
        fetchShoppingListData() 
    }
}, [id])

  return (
    <div>
      { shoppingListData && (<h1>{shoppingListData.name}</h1> )}
    </div>
  )
}

export default ShoppingListDetail