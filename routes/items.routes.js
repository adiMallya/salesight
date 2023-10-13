const express = require('express');
const { getAllItems, addItem } = require('../controllers/items.controller');

const router = express.Router();

// @desc : Get all items in inventory
// @route : GET /api/v1/items
// @acces : Public
router.get('/', async (req, res, next) => {
  try{
    const items = await getAllItems();

    res.status(200).json({
      success: true,
      data: items
    });
  }catch(err){
    next(err);
  }
});

// @desc : Add item to inventory
// @rout : POST /api/v1/items
// @accss : Public
router.post('/', async (req, res, next) => {
  try{
    const items = await addItem(req.body);

    res.status(201).json({
      success: true,
      data: items
    });
  }catch(err){
    next(err);
  }
});


module.exports = router;