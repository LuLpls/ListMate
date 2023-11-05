import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import '../styles/shoppingListDetail.css'
import Item from '../components/ItemsCard'
import { ShoppingListDetailContext } from '../components/context/ItemContext'

const ShoppingListDetail = () => {

  const { id } = useParams()

  const [itemInput, setItemInput] = useState({'name': '', 'completed': false, 'unit': '', 'quantity': ''})
  const [error, setError] = useState('')
  const { shoppingList, loadShoppingList, postItem  } = useContext(ShoppingListDetailContext)

  // získání dat o nákupním seznamu pomocí fetch
  useEffect(() => {
    if (id) {
      loadShoppingList(id);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target
      setItemInput({
        ...itemInput,
        [name]: value,
      })

    if (value.length > 30) {
      setError('The name must not exceed 30 characters')
    } else {
      setError('')
    }
  }

  const handlePost = () => {
    if(!error) {
      postItem(id, itemInput)
      setItemInput({name: ''})
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePost()
    }
  }

  return (
    <div>
      { shoppingList ? (
        <div>
          <div className='shoppinglist-detail-title-box-container'>
            <div className='shoppinglist-detail-title'>
              <h2>{shoppingList.name}</h2> 
              <div className='shoppinglist-detail-completed-index'>
                {shoppingList?.items && <p>{shoppingList.items.filter((item) => item.completed).length}/{shoppingList.items.length}</p>}
              </div>
            </div>
            <div className='shoppinglist-detail-iput-plus-container'>
              <div className='shoppinglist-detail-input'>
                <label htmlFor="name">
                  <input 
                    placeholder='New item'
                    type="text" 
                    name="name"
                    value={itemInput.name}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                  />
                </label>
              </div>          
              <div className='shoppinglist-detail-plus-icon' onClick={handlePost}><img src="/plus_icon.png" alt="plus" /></div> 
            </div>
            { error && <div className='create-item-error-message'>{error}</div> }
            <div className='shoppinglist-detail-items'>
              {shoppingList?.items && shoppingList.items.map((item, index) => {   
                if (!item.completed) {   
                  return <Item key={index} item={item}/>
                }
              })}
            </div>
          </div>
          {shoppingList?.items && shoppingList.items.some((item) => item.completed) ? (
            <div className='shoppinglist-detail-completed-items'>
              {shoppingList?.items && shoppingList.items.map((item, index) => {   
                if (item.completed) {   
                  return <Item key={index} item={item}/>
                }
              })}
            </div>
          ) : null }
        </div>
      ) : <div>pending</div> }
    </div>
  )
}

export default ShoppingListDetail