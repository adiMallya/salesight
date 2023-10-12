const fs = require('fs');
const mongoose = require('mongoose');
const connectDb = require('./config/db');

const Inventory = require('./models/Inventory');
const Sale = require('./models/Sales');

//Connect to DB
connectDb();

//Read data from files
const items = JSON.parse(fs.readFileSync('./_data/items.json', 'utf-8'));
const salesData = JSON.parse(fs.readFileSync('./_data/sales.json', 'utf-8'));

//Import data
const importData = async () => {
  try {
    await Inventory.create(items);
    await Sale.create(salesData);
   
    console.log('Data imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect()
  }
}
//Delete data
const deleteData = async () => {
  try {
    await Inventory.deleteMany();
    await Sale.deleteMany();

    console.log("Data destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect()
  }
}

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}