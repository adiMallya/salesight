const ErrorResponse = require('../utils/errorResponse');
const Inventory = require('../models/Inventory');

exports.getAllItems = async () => {
  try {
    const items = await Inventory.find();
    return items;
  } catch (err) {
    throw err;
  }
};

exports.addItem = async (itemData) => {
  try {
    const item = new Inventory({ ...itemData });
    await item.save();
    
    return await Inventory.find();
  } catch (err) {
    throw err;
  }
};

exports.editItem = async (itemId, fieldsToUpdate) => {
  try{
    const item = await Inventory.findByIdAndUpdate(itemId, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    if(!item){
      throw new ErrorResponse(`Item not found with id of ${itemId}`, 400);
    }
    
    return await Inventory.find();
  }catch(err){
    throw err;
  }
}

exports.deleteItem = async (itemId) => {
  try{
    const item = await Inventory.findByIdAndDelete(itemId);

    if(!item){
      throw new ErrorResponse(`Item not found with id of ${itemId}`, 400);
    }
  }catch(err){
    throw err;
  }
}