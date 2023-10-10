const itemComplete = require('express').Router();
const shoppingListModel = require('../../models/shoppingList')

itemComplete.put('/shoppinglist/:shoppingListId/item/complete/:itemId', async (req, res) => {
    const shoppinglistId  = req.params.shoppingListId
    const itemId = req.params.itemId
    const {completed} = req.body

    try {
        const shoppingList = await shoppingListModel.findOneAndUpdate(
          {
            _id: shoppinglistId,
            'items._id': itemId,
          },
            { $set: { 
              'items.$.completed': completed,
             }
            },
            { new: true } 
            );
        if(!shoppingList) {
            return res.status(404).json({ msg: 'Položka nebyla nalezena'});
        }

        return res.json(shoppingList);
            
    } catch (err) {
            return res.status(500).json({ msg: 'Interní serverová chyba' })
        }

} )

module.exports = itemComplete;