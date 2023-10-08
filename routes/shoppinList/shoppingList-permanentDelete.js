const shoppingListDelete = require('express').Router();
const shoppingListModel = require('../../models/shoppingList')

shoppingListDelete.delete('/shoppinglist/permanent-delete/:id', async (req, res) => {
    const shoppingListId  = req.params.id;

    try {
        const shoppingList = await shoppingListModel.findByIdAndDelete({_id: shoppingListId});
        if(!shoppingList) {
            return res.status(404).json({ msg: 'Shopping List was not found'});
            
        }

        return res.json({ msg: `Shopping List ${shoppingList.name} was succesfully deleted` })
            
    } catch (err) {
            return res.status(500).json({ msg: 'Internal server error' })
            
        }

} )

module.exports = shoppingListDelete;