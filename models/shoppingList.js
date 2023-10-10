const mongoose = require('mongoose')


const shoppingListModel = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false
    },
    items: [
      {
        name: {
            type: String,
            default: 'New Item'
        },
        quantity: Number,
        unit: String,
        completed: {
            type: Boolean,
            default: false
        },
    },
    ],
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('ShoppingList', shoppingListModel)