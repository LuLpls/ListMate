const shoppingListPost = require('express').Router();
const shoppingListModel = require('../../models/shoppingList');


shoppingListPost.post('/shoppinglist/post', async (req, res) => {
    let { name } = req.body;
    if(!name || name.trim() === '')  {
      name = 'New List'
    }
    
    const shoppingList = new shoppingListModel(
        {
            name: name,
        }
    )

    // uložení do databáze 
    try {
        const savedShoppingList = await shoppingList.save();
        return res.json(savedShoppingList);
    } catch (err) {
            return res.status(500).json({ msg: 'Interní serverová chyba' })
    }
})

module.exports = shoppingListPost