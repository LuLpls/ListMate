const mongoose = require('mongoose')

const shoppingListModel = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('ShoppingList', shoppingListModel)