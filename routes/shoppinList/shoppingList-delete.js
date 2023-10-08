const shoppingListDelete = require('express').Router();
const shoppingListModel = require('../../models/shoppingList')

shoppingListDelete.delete('/shoppinglist/delete/:id', async (req, res) => {
    const shoppingListId  = req.params.id;

    try {
        const shoppingList = await shoppingListModel.findById({_id: shoppingListId});
        if(!shoppingList) {
            return res.status(404).json({ msg: 'Nákupní seznam nebyl nalezen'});
            
        }

        shoppingList.deleted = true;
        await shoppingList.save()
        return res.json({ msg: 'Nákupní seznam byl přesunut do koše' })
            
    } catch (err) {
            return res.status(500).json({ msg: 'Interní serverová chyba' })
            
        }

} )

module.exports = shoppingListDelete;