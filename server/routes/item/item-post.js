const itemtPost = require('express').Router();
const itemModel = require('../../models/item');


itemtPost.post('/shoppinglist/:id/item/post', async (req, res) => {
    const shoppingListId = req.params.id;
    const { name, completed, quantity, unit } = req.body
    const item = new itemModel(
        {
            shoppingListId: shoppingListId,
            name: name,
            completed: completed,
            quantity: quantity,
            unit: unit,
        }
    )

    // uložení do databáze 
    try {
        const savedItem = await item.save();
        return res.json(savedItem);
    } catch (err) {
            return res.status(500).json({ msg: 'Interní serverová chyba' })
    }
})

module.exports = itemtPost