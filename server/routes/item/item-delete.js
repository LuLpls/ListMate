const itemDelete = require('express').Router();
const itemModel = require('../../models/item')

itemDelete.delete('/shoppinglist/:shoppingListId/item/delete/:itemId', async (req, res) => {
    const shoppingListId = req.params.shoppingListId
    const itemId  = req.params.itemId

    try {
        const item = await itemModel.findByIdAndDelete({_id: itemId});
        if(!item) {
            return res.status(404).json({ msg: 'Položka nebyla nalezena'});
            
        }

        return res.json({msg: `Položka: ${item.name} byla úspěšně smazána`});
            
    } catch (err) {
            return res.status(500).json({ msg: 'Interní serverová chyba' })
            
        }

} )

module.exports = itemDelete;