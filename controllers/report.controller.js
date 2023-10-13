const ErrorResponse = require('../utils/errorResponse');
const Inventory = require('../models/Inventory');
const Sale = require('../models/Sales');

exports.fetchInventoryDetails = async () => {
  try {
    const result = await Inventory.aggregate([
      {
        $group: {
          _id: { category: "$category", itemName: "$itemName" },
          itemCount: { $sum: 1 },
          totalStock: { $sum: "$quantity" },
        },
      },
      {
        $group: {
            _id: "$_id.category",
            items: {
                $push: {
                    itemName: "$_id.itemName",
                    totalStock: "$totalStock",
                }
            },
            totalStockForCategory: { $sum: "$totalStock" },
            totalItemCountForCategory: { $sum: "$itemCount" }
        }
      },
      {
        $sort: {
          totalStockForCategory: -1
        }
      },
      {
        $project: {
          category: "$_id",
          totalStockForCategory: 1,
          totalItemCountForCategory: 1,
          items: 1,
          _id: 0
        }
      }
    ]).exec();

    return result;
  } catch (err) {
    throw err;
  }
};

exports.fetchSalesDetails = async () => {
  try {
    const result = await Sale.aggregate([
      {
        $lookup: {
          from: "inventories",
          localField: "item",
          foreignField: "_id",
          as: "itemDetails"
        },
      },
      {
        $unwind: "$itemDetails"
      },
      {
        $facet: {
          revenueDetails: [
            {
              $group: {
                _id: "$itemDetails.category",
                totalRevenue: { $sum: "$revenue" }
              }
            },
            {
              $sort: { totalRevenue: -1 }
            }
          ],
          highestSellingItems: [
            {
              $group: {
                _id: "$itemDetails.category",
                itemName: { $first: "$itemDetails.itemName" },
                totalQuantity: { $sum: "$quantity" },
                totalRevenue: { $sum: "$revenue" },
              }
            },
            {
              $sort: { totalQuantity: -1 }
            },
            {
              $limit: 3
            }
          ]
        }
      },
      {
        $project: {
          revenuDetails: {
            $map: {
              input: "$revenueDetails",
              as: "revenue",
              in: {
                category: "$$revenue._id",
                totalRevenue: "$$revenue.totalRevenue"
              }
            }
          },
          highestSellingItems: {
            $map: {
              input: "$highestSellingItems",
              as: "item",
              in: {
                itemName: "$$item.itemName",
                totalQuantity: "$$item.totalQuantity",
                totalRevenue: "$$item.totalRevenue"
              }
            }
          }
        }
      }
    ]).exec();

    return result;
  } catch (err) {
    next(err);
  }
};