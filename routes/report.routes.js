const express = require('express');
const { fetchInventoryDetails, fetchSalesDetails } = require('../controllers/report.controller');

const router = express.Router();

// @desc : Get insight on Inventory
// @route : GET /api/v1/report/inventory
// @access : Public
router.get('/inventory', async (req, res, next) => {
  try{
    const data = await fetchInventoryDetails();

    res.status(200).json({
      succcess: true,
      data
    });
  }catch(err){
    next(err);
  }
});

// @desc : Get insight on Sales
// @route : GET /api/v1/report/sales
// @access : Public
router.get('/sales', async (req, res, next) => {
  try{
    const data = await fetchSalesDetails();

    res.status(200).json({
      success: true,
      data
    });
  }catch(err){
    next(err);
  }
});

module.exports = router;