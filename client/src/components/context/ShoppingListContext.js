import { createContext, useContext, useState, useEffect } from 'react';

export const ShoppingListContext = createContext();

export const useShoppingList = () => {
  return useContext(ShoppingListContext);
}

export const ShoppingListProvider = ({ children }) => {

  // stav kde je pole všech nákupních seznamu
  const [shoppingLists, setShoppingLists] = useState([]);

  // funkce pro načítání seznamu nákupních seznamů
  const loadShoppingLists = async (isDeleted) => {
    try {
      const response = await fetch('http://localhost:5000/shoppinglist/list');
      if (!response.ok) {
        throw new Error('Failed to fetch shopping lists');
      }
      const data = await response.json();
      const filteredLists = data.filter(shoppingList => shoppingList.deleted === isDeleted);
      setShoppingLists(filteredLists);
    } catch (error) {
      console.error('Error fetching shopping lists:', error);
      throw error;
    }
  };

  useEffect(() => {
    
  }, [])

  // funkce pro přidání nového seznamu
  const addShoppingList = (newList) => {
    setShoppingLists([...shoppingLists, newList])
  }

// funkce pro rename seznamu
const updateShoppingList = (updatedList) => {
  const updatedLists = shoppingLists.map((list) => {
    if (list._id === updatedList._id) {
      return updatedList
    }
    return list
  });
  setShoppingLists(updatedLists)
};

// funkce pro smazaní (přesunutí do koše) nákoupního seznamu
const deleteShoppingList = async (shoppingList) => {
  if (!shoppingList.deleted) {
    try {
      const response = await fetch(`http://localhost:5000/shoppinglist/delete/${shoppingList._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadShoppingLists(false);
        console.log('Shopping List has been deleted');
      } else {
        console.error('Error during deletion of the shopping list');
      }
    } catch (error) {
      console.error('Error communicating with the server:', error);
    }
  } else {
    try {
      const response = await fetch(`http://localhost:5000/shoppinglist/permanent-delete/${shoppingList._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadShoppingLists(true);
        console.log('Shopping List has been deleted');
      } else {
        console.error('Error during deletion of the shopping list');
      }
    } catch (error) {
      console.error('Error communicating with the server:', error);
    }
  }
}

// obnovení seznamu (přesun z koše zpět)
const restoreShoppingList = async (shoppingList) => {
  try { 
    const response = await fetch(`http://localhost:5000/shoppinglist/update/${shoppingList._id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...shoppingList, deleted: false}),
    })
    if (response.ok) {
      console.log('Shopping List has been restored.')
      loadShoppingLists(true);
    } else {
      console.error('Error during the restoration.')
    }
  } catch (error) {
    console.error('Error communicating with the server:', error)
  }
};

  return (
    <ShoppingListContext.Provider value={{ shoppingLists, loadShoppingLists, addShoppingList, updateShoppingList, deleteShoppingList, restoreShoppingList }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

