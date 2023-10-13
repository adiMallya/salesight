const express = require('express');
const { createSale } = require('../controllers/sales.controller');

const router = express.Router();

// @desc : Record a Sale
// @route : POST /api/v1/sales
// @access : Public
router.post('/', async (req, res, next) => {
  try{
    const sales = await createSale(req.body);

    res.status(201).json({
      success: true,
      data: sales
    });
  }catch(err){
    next(err);
  }  
});

module.exports = router;