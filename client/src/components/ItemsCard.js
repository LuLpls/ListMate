import React, { useState, useContext} from 'react'
import '../styles/itemsCard.css'
import { useParams } from 'react-router-dom'
import ItemUpdateModal from './ItemUpdateModal'
import { ShoppingListDetailContext } from '../components/context/ItemContext'

const ItemsCard = ({ item }) => {

  const { id } = useParams()
  
  const [isCompleted, setIsCompleted] = useState(item.completed)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { completeItem } = useContext(ShoppingListDetailContext);



  const onComplete = async () => {
    setIsCompleted(!isCompleted)
    completeItem(id, item._id, isCompleted )
  } 
  
  return (
    <div className='item-card-wrapper'>
      <div className='item-card-container'> 
      
        <div className='item-card-label-name-container'>
          <label className='item-card-label'>

            <input className='item-card-input'
                  type="checkbox"
                  checked={isCompleted}
                  onChange={onComplete}
                />
            <span className='item-card-checkmark'></span>
            </label>
            

          <div className='item-card-name'>{item.name}</div>
        

          <div className='item-card-quantity-unit-container'>
            <div className='item-card-quantity'>
              {item.quantity}
            </div>
            <div className='item-card-unit'>
              {item.unit}
            </div>
          </div>
        </div>

        <div className='item-card-button'>
          <div onClick={() => {setIsModalOpen(true)}}><img src='/option_wheel.png' alt='options'/></div>
        </div>
        
      </div>

      {isModalOpen && <ItemUpdateModal 
          initialItemData={item} 
          onClose={() => {setIsModalOpen(false)}} 
          shoppingListId={id}
          />}
    </div>
  )
}

export default ItemsCard