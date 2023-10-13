const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse');

const SaleSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true
  },
  salePrice: {
    type: Number,
    required: [true, "Please add the price sold at"]
  },
  quantity: {
    type: Number,
    required: [true, "Please add sale amount"]
  },
  revenue: {
    type: Number
  }
}, { timestamps: true });

SaleSchema.pre('save', function (next) {
  //calculate total rev
  this.revenue = this.salePrice * this.quantity;
  next();
});

SaleSchema.pre('save', async function (next) {
  //check & decrement stock of item sold
  try{
    const item = await mongoose.model('Inventory').findById(this.item);

    if(item && item.quantity < this.quantity){
      throw new ErrorResponse(`Not enough stock available`, 404);  
    }

    item.quantity -= this.quantity;
    await item.save();
    
    next();
  } catch(err){
    next(err);
  } 
});

module.exports = mongoose.model('Sale', SaleSchema);
