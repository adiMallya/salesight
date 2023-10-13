const ErrorResponse = require('../utils/errorResponse');
const Sale = require('../models/Sales');
const Inventory = require('../models/Inventory');

exports.createSale = async (saleDetail) => {
  try{
    const item = await Inventory.findOne({ _id: saleDetail.item });

    if(!item){
      throw new ErrorResponse(`Item not found with id of ${saleDetail.item}`, 404);
    }
    
    const newSale = await Sale.create(saleDetail);

    return await Sale.find({}).populate('item', 'itemName category');
  }catch(err){
    throw err;
  }
}