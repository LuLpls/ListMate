import React, { useState, useEffect} from 'react'
import '../styles/itemsCard.css'
import { useParams } from 'react-router-dom'
import ItemUpdateModal from './ItemUpdateModal'

const ItemsCard = ({ item }) => {

  const shoppingListId = useParams()
  
  const [isCompleted, setIsCompleted] = useState(item.completed)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    console.log('zmena stavu item')
  },[item])

  const onComplete = async () => {
    setIsCompleted(!isCompleted)
      try {
        const response = await fetch(`http://localhost:5000/shoppinglist/${shoppingListId.id}/item/complete/${item._id}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({completed: !isCompleted}),
        })
    
        if (response.ok) {
          console.log('Item was succesfully completed')
        } else {
          // Zpracování chyby, pokud server vrátí chybový stav.
          console.error('Item wasnt updated.')
        }
      } catch (error) {
        // Zpracování chyby při komunikaci se serverem.
        console.error('Server communication error:', error)
      }
    
  } 
  
  return (
    <div className='item-card-wrapper'>
      <div className='item-card-container'>
        
      <input 
        type="checkbox"
        checked={isCompleted}
        onChange={onComplete}
      />
      <div>{item.quantity}</div>
      <div>
        {item.name}
      </div>
      
      <button onClick={() => {setIsModalOpen(true)}}>...</button>
      </div>

      {isModalOpen && <ItemUpdateModal 
          initialItemData={item} 
          onClose={() => {setIsModalOpen(false)}} 
          shoppingListId={shoppingListId.id}
          />}
    </div>
  )
}

export default ItemsCard