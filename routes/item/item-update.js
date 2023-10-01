const itemUpdate = require('express').Router();
const itemModel = require('../../models/item')

itemUpdate.put('/shoppinglist/:shoppingListId/item/update/:itemId', async (req, res) => {
    const shoppinglistId  = req.params.shoppingListId
    const itemId = req.params.itemId
    const { name, completed, quantity, unit } = req.body

    try {
        const item = await itemModel.findByIdAndUpdate(
          itemId, 
            { $set: { 
                name: name,
                completed: completed,
                quantity: quantity,
                unit: unit
             }
            },
            { new: true } 
            );
        if(!item) {
            return res.status(404).json({ msg: 'Položka nebyla nalezena'});
        }

        return res.json(item);
            
    } catch (err) {
            return res.status(500).json({ msg: 'Interní serverová chyba' })
        }

} )

module.exports = itemUpdate;