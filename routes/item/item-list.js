const itemList = require('express').Router();
const itemModel = require('../../models/item')

itemList.get('/shoppinglist/:id/item/list', async (req, res) => {
  const shoppingListId = req.params.id

    try {
        const items = await itemModel.find({shoppingListId: shoppingListId});
        
        return res.json(items);
            
    } catch (err) {
            return res.status(500).json({ msg: 'Interní serverová chyba' })
        }

} )

module.exports = itemList;