const mongoose = require('mongoose');

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
  this.reveune = this.salePrice * this.quantity;
  next();
});

module.exports = mongoose.model('Sale', SaleSchema);
