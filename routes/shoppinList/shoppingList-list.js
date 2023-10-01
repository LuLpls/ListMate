const shoppingListList = require('express').Router();
const shoppingListModel = require('../../models/shoppingList')

shoppingListList.get('/shoppinglist/list', async (req, res) => {

    try {
        const shoppingList = await shoppingListModel.find();
        
        return res.json(shoppingList);
            
    } catch (err) {
            return res.status(500).json({ msg: 'Interní serverová chyba' })
        }

} )

module.exports = shoppingListList;