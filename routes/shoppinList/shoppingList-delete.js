const shoppingListDelete = require('express').Router();
const shoppingListModel = require('../../models/shoppingList')

shoppingListDelete.delete('/shoppinglist/delete/:id', async (req, res) => {
    const shoppingListId  = req.params.id;

    try {
        const shoppingList = await shoppingListModel.findByIdAndDelete({_id: shoppingListId});
        if(!shoppingList) {
            return res.status(404).json({ msg: 'Nákupní seznam nebyl nalezen'});
            
        }

        return res.json({msg: `Nákupní seznam: ${shoppingList.name} byl úspěšně smazán`});
            
    } catch (err) {
            return res.status(500).json({ msg: 'Interní serverová chyba' })
            
        }

} )

module.exports = shoppingListDelete;