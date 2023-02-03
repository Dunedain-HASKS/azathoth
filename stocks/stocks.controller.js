const express = require('express');
const router = express.Router();
const Stock = require('./stocks.schema');

router.get("/", async (req, res) => {
     await Stock.find({})
          .then((stocks) => {
               res.json({
                    status: 200,
                    message: 'Stocks retrieved successfully',
                    data: stocks
               });
          })
          .catch((error) => {
               res.json({
                    status: 404,
                    message: 'Stocks not found',
                    data: error.message
               });
          });
});

router.get("/:id", async (req, res) => {
     Stock.findById(req.params.id)
          .then((stock) => {
               res.json({
                    status: 200,
                    message: 'Stock retrieved successfully',
                    data: stock
               });
          })
          .catch((error) => {
               res.json({
                    status: 404,
                    message: 'Stocks not found',
                    data: error.message
               });
          });
});

module.exports = router;