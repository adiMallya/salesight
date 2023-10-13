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


