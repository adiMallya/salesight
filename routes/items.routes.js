const express = require('express');
const { getAllItems, addItem, editItem, deleteItem } = require('../controllers/items.controller');

const router = express.Router();

// @desc : Get all items in inventory
// @route : GET /api/v1/items
// @access : Public
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
// @route : POST /api/v1/items
// @access : Public
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

// @desc : Edit item in inventory
// @route : POST /api/v1/items/:id
// @access : Public
router.post('/:id', async (req, res, next) => {
  try{
    const items = await editItem(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: items
    });
  } catch(err){
    next(err);
  } 
});

// @desc : Delete an item from inventory
// @route : DELETE /api/v1/items/:id
// @access : Public
router.delete('/:id', async (req, res, next) => {
  try{
    await deleteItem(req.params.id);

    res.status(204).json({
      success: true,
      data: {}
    });
  } catch(err){
    next(err);
  } 
});

module.exports = router;