const express = require('express');
const router = express.Router();
const { updateStockPrice } = require('./updation');
module.exports = router;

const Company = require('../companies/companies.schema');
const News = require('../news/news.schema')

eval = async () => {
     

     updateStockPrice();
};

module.exports = { evaluate: eval };
