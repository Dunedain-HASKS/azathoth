// /stocks - GET
// /stocks/:id - GET

const express = require('express');
const router = express.Router();
const Stock = require('./stocks.schema');

router.get('/', (req, res) => {
     Stock.find()
          .then((stocks) => {
               res.json({
                    status: 200,
                    message: 'Stocks retrieved successfully',
                    data: stocks
               });
          })
          .catch((error) => {
               res.status(500).json(error);
          });
});

router.get('/:id', (req, res) => {
     Stock.findById(req.params.id)
          .then((stock) => {
               res.json({
                    status: 200,
                    message: 'Stock retrieved successfully',
                    data: stock
               });
          })
          .catch((error) => {
               res.status(500).json(error);
          });
});

module.exports = router;
