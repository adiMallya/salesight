const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, "Please add item name"]
  },
  quantity: {
    type: Number,
    required: [true, "Please add the quantity"]
  },
  price: {
    type: Number,
    required: [true, "Please add the price"]
  },
  category: {
    type: String,
    required: [true, "Please select category"],
    enum: ["Electronics", "Clothing", "Furniture", "Toys", "Books", "Groceries"],
    default: "Groceries"
  }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', InventorySchema);