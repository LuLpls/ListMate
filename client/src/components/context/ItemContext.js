import { createContext, useContext, useState } from 'react';

export const ShoppingListDetailContext = createContext();

export const useShoppingListDetail = () => {
  return useContext(ShoppingListDetailContext);
}

export const ShoppingListDetailProvider = ({ children }) => {

  // stav kde je uložen nákupnho seznamu
  const [shoppingList, setShoppingList] = useState(null);
  
  // funkce pro načtení nákupního seznamu na základě id
  const loadShoppingList = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/shoppinglist/get/${id}`)
      if (!response.ok) {
        throw new Error('Failed to load shopping list details.')
      }
      const data = await response.json()
      setShoppingList(data)
      
    } catch (error) {
      console.error('Error while loading shopping list details:', error)
      throw error
    }
  }

  // funkce pro přidání položky do nákupního seznamu
  const postItem = async (id, item) => {
    try {
      const response = await fetch(`http://localhost:5000/shoppinglist/${id}/item/post`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      })

      if (response.ok) {
        console.log('Item was succesfully added')
        const newShoppingList = await response.json()
          setShoppingList(newShoppingList)
      } else {
        console.error('Item wasnt created.')
      }
    } catch (error) {
      console.error('Server communication error:', error)
    }
  }

  // funkce pro odškrutnutí položky nákupního seznamu
  const completeItem = async (shoppingListId, itemId, isCompleted) => {
      try {
        const response = await fetch(`http://localhost:5000/shoppinglist/${shoppingListId}/item/complete/${itemId}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({completed: !isCompleted}),
        })
    
        if (response.ok) {
          console.log('Item was succesfully completed')
          loadShoppingList(shoppingListId)
        } else {
          console.error('Item wasnt updated.')
        }
      } catch (error) {
        console.error('Server communication error:', error)
      }
    
  } 

  // funkce pro updatování položky nákupního seznamu
  const updateItem = async (shoppingListId, itemId, updatedItem) => {
   
    try {
      const response = await fetch(`http://localhost:5000/shoppinglist/${shoppingListId}/item/update/${itemId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedItem),
      })

      if (response.ok) {
        console.log('Item was succesfully updated')
        loadShoppingList(shoppingListId)
      } else {
        // Zpracování chyby, pokud server vrátí chybový stav.
        console.error('Item wasnt updated.')
      }
    } catch (error) {
      // Zpracování chyby při komunikaci se serverem.
      console.error('Error communicating with the server:', error)
    }
  }

  const deleteItem = async (shoppingListId, itemId) =>  {
    try {
      const response = await fetch(`http://localhost:5000/shoppinglist/${shoppingListId}/item/delete/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadShoppingList(shoppingListId);
        console.log('Shopping List has been deleted');
      } else {
        console.error('Error during deletion of the shopping list');
      }
    } catch (error) {
      console.error('Error communicating with the server:', error);
    }
  }



  return (
    <ShoppingListDetailContext.Provider value={{ shoppingList, setShoppingList, loadShoppingList, postItem, completeItem, updateItem, deleteItem }}>
      {children}
    </ShoppingListDetailContext.Provider>
  );
};

