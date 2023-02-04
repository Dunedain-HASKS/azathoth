const express = require('express');
const router = express.Router();
const Stock = require('./stocks.schema');
const User = require('../user/user.schema');
const Transaction = require('../transactions/transactions.schema');
const { Schema } = require('mongoose');
router.get("/", async (req, res) => {
     await Stock.find({}).populate('company')
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
     Stock.findById(req.params.id).populate('company')
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

//"/stocks/:id/buy": "buy stock",

router.post("/:id/buy", async (req, res) => {
     const { id } = req.params;
     if (Schema.Types.ObjectId.isValid(id) == false) {
          return res.json({
               status: 404,
               message: 'Invalid stock id',
          });
     };
     const stock = await Stock.findById(id).exec();
     const stockId = stock._id;
     const amount = req.body.amount;
     const user = await User.findById(req.body.id).exec();
     const currentNetWorth = user.net_worth[user.net_worth.length - 1].value;
     const portfolio = user.portfolio;
     const holdings = portfolio.reduce((acc, stock) => {
          return acc + stock.amount;
     }, 0);
     if (amount > currentNetWorth - holdings) {
          return res.json({
               status: 401,
               message: 'Insufficient funds',
               data: {}
          });
     }

     const stockIndex = portfolio.findIndex((pair) => {
          console.log(pair.get('stock'), stockId);
          return String(pair.get('stock')) == String(stockId);
     });

     if (stockIndex === -1) {
          portfolio.push({ stock: stockId, amount });
     }
     else {
          portfolio[stockIndex].set('amount', portfolio[stockIndex].get('amount') + amount);
     }
     const document = new Transaction({
          stock: stockId,
          amount: amount,
          date: new Date(),
     });
     const transaction = await document.save();
     user.transactions.push(transaction._id);
     const newuser = await User.updateOne({ _id: req.body.id }, { portfolio: portfolio, transactions: user.transactions }, { new: true }).exec();
     res.json({
          status: 200,
          message: 'Stock bought successfully',
          data: {
               transaction,
               user: newuser
          }
     });
});

router.post("/:id/sell", async (req, res) => {
     const { id } = req.params;
     const stock = await Stock.findById(id).exec();
     const stockId = stock._id;
     const amount = req.body.amount;
     const user = await User.findById(req.body.id).exec();
     const portfolio = user.portfolio;

     const stockIndex = portfolio.findIndex((pair) => {
          console.log(pair.get('stock'), stockId);
          return String(pair.get('stock')) == String(stockId);
     });

     portfolio[stockIndex].set('amount', portfolio[stockIndex].get('amount') - amount);

     const document = new Transaction({
          stock: stockId,
          amount: -amount,
          date: new Date(),
     });

     const transaction = await document.save();
     user.transactions.push(transaction._id);
     const newuser = await User.updateOne({ _id: req.body.id }, { portfolio: portfolio, transactions: user.transactions }, { new: true }).exec();
     res.json({
          status: 200,
          message: 'Stock sold successfully',
          data: {
               transaction,
               user: newuser
          }
     });
});
module.exports = router;