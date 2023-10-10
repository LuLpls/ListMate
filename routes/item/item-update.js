const itemUpdate = require('express').Router();
const shoppingListModel = require('../../models/shoppingList')

itemUpdate.put('/shoppinglist/:shoppingListId/item/update/:itemId', async (req, res) => {
    const shoppinglistId  = req.params.shoppingListId
    const itemId = req.params.itemId
    const { name, quantity, unit } = req.body

    try {
      const shoppingList = await shoppingListModel.findOneAndUpdate(
        {
          _id: shoppinglistId,
          'items._id': itemId,
        },
          { $set: { 
            'items.$.name': name,
            'items.$.quantity': quantity,
            'items.$.unit': unit,
           }
          },
          { 
            new: true,
            returnOriginal: false
          } 
          );
      if(!shoppingList) {
          return res.status(404).json({ msg: 'Nákupní seznam nebyl nalezen'});
      }

      const updatedItem = await shoppingListModel.findOne({
        _id: shoppinglistId,
        'items._id': itemId,
      }, {
        'items.$': 1, // Vrátí pouze aktualizovanou položku
      })
      return res.json(updatedItem.items[0])
            
    } catch (err) {
            return res.status(500).json({ msg: 'Interní serverová chyba' })
        }

} )

module.exports = itemUpdate;