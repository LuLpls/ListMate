const mongoose = require('mongoose')

const itemModel = new mongoose.Schema({
  shoppingListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShoppingList', 
    required: true,
  },
    name: {
      type: String,
      required: true,
    },
    quantity: Number,
    unit: String,
    completed: {
      type: Boolean,
      required: true
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Item', itemModel)