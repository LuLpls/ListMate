const itemtPost = require('express').Router();

const shoppingListModel = require('../../models/shoppingList');

itemtPost.post('/shoppinglist/:id/item/post', async (req, res) => {
    const shoppingListId = req.params.id;
    const { name, completed} = req.body
    const item = 
        {
            name: name,
            completed: completed,
            quantity: '',
            unit: '',
        }
    

    // uložení do databáze 
    try {

        const shoppingList = await shoppingListModel.findByIdAndUpdate(
          shoppingListId,
          { $push: { items: item } },
          { new: true }
        )

    return res.json(shoppingList) 
    
    } catch (err) {
            return res.status(500).json({ msg: 'Interní serverová chyba' })
    }
})

module.exports = itemtPost