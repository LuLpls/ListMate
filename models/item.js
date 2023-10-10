const mongoose = require('mongoose')

const itemModel = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    quantity: Number,
    unit: String,
    completed: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Item', itemModel)