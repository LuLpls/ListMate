import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect} from 'react'
import '../styles/shoppingListDetail.css'
import Item from '../components/ItemsCard'

const ShoppingListDetail = () => {

  const { id } = useParams()

  const [shoppingListData, setShoppingListData] = useState(null)
  const [itemInput, setItemInput] = useState({'name': '', 'completed': false, 'unit': '', 'quantity': ''})

  // získání dat o nákupním seznamu pomocí fetch
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
}, [ id])



// Přidání položky na nákupní seznam
const postItem = async (itemInput) => {
  try {
    const response = await fetch(`http://localhost:5000/shoppinglist/${id}/item/post`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemInput),
    })

    if (response.ok) {
      console.log('Item was succesfully added')
      const newItem = await response.json()
        setShoppingListData(prevData => {
          return {
            ...prevData,
            items: [...prevData.items, newItem]
          }
        })

        // Vymazat text v inputu
        setItemInput({ 'name': '' })
    } else {
      console.error('Item wasnt created.')
    }
  } catch (error) {
    console.error('Server communication error:', error)
  }
}

const handleChange = (e) => {
  const { name, value } = e.target
    setItemInput({
      ...itemInput,
      [name]: value,
    })
}

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    // Zde provedete akci, kterou chcete provést po stisknutí Enter
    console.log('Enter has been pushed');
    postItem(itemInput)
    
  }
}


  return (
    <div>
      { shoppingListData && (
        <div>
          <div className='shoppinglist-detail-title-box-container'>
            <div className='shoppinglist-detail-title'>
              <h2>{shoppingListData.name}</h2> 
              {shoppingListData.items && <p>0/{shoppingListData.items.length}</p>}
            </div>
          
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
          </div>
          <div>
            {shoppingListData.items.map((item, index) => {           
                 return <Item key={index} item={item}/>
            })}
          </div>
            
            
            </div>
      )}
    </div>
  )
}

export default ShoppingListDetail