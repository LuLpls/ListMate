const itemDelete = require('express').Router();
const shoppingListModel = require('../../models/shoppingList')

itemDelete.delete('/shoppinglist/:shoppingListId/item/delete/:itemId', async (req, res) => {
    const shoppingListId = req.params.shoppingListId
    const itemId  = req.params.itemId

    try {
      const shoppingList = await shoppingListModel.findById(shoppingListId);
      if (!shoppingList) {
          return res.status(404).json({ msg: 'Nákupní seznam nebyl nalezen' });
      }

      const itemIndex = shoppingList.items.findIndex(item => item._id.toString() === itemId);
      if (itemIndex === -1) {
          return res.status(404).json({ msg: 'Položka nebyla nalezena' });
      }
      
      shoppingList.items.splice(itemIndex, 1);
      await shoppingList.save();

      return res.json({ msg: `Položka byla úspěšně smazána` });
  } catch (err) {
      return res.status(500).json({ msg: 'Interní serverová chyba' });
  }

} )

module.exports = itemDelete;