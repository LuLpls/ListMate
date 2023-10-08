const shoppingListUpdate = require('express').Router();
const shoppingListModel = require('../../models/shoppingList')

shoppingListUpdate.put('/shoppinglist/update/:id', async (req, res) => {
    const shoppinglistId  = req.params.id;

    try {
        const shoppinglist = await shoppingListModel.findByIdAndUpdate(
          shoppinglistId, 
            { $set: { 
                name: req.body.name,
                deleted: req.body.deleted
             }
            },
            { new: true } 
            );
        if(!shoppinglist) {
            return res.status(404).json({ msg: 'Nákupní seznam nebyl nalezen'});
        }

        return res.json(shoppinglist);
            
    } catch (err) {
            return res.status(500).json({ msg: 'Interní serverová chyba' })
        }

} )

module.exports = shoppingListUpdate;