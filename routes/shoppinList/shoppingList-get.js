const shoppingListGet = require('express').Router();
const shoppingListModel = require('../../models/shoppingList')

shoppingListGet.get('/shoppinglist/get/:id', async (req, res) => {
    const shoppingListId  = req.params.id;

    try {
        const shoppingList = await shoppingListModel.findOne({_id: shoppingListId});
        if(!shoppingList) {
            return res.status(404).json({ msg: 'Nákupní seznam nebyl nalezen'});
        }

        return res.json(shoppingList);
            
    } catch (err) {
            return res.status(500).json({ msg: 'Interní serverová chyba' })
        }

} )

module.exports = shoppingListGet;