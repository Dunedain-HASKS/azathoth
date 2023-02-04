const express = require('express');
const router = express.Router();
const { updateStockPrice } = require('./updation');
module.exports = router;

const Company = require('../companies/companies.schema');
const News = require('../news/news.schema')

eval = async () => {
     const companies = await Company.find().exec();
     const api_keys = process.env.FINNHUB_API_KEYS.split(' ');
     let api_index = 0;
     companies.forEach(async (company) => {
          const ticker = company.ticker;
          const res = await fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=all&token=${api_keys[api_index]}`);
          const data = await res.json();
          const financials = data.metric;
          const newCompany = await Company.findOneAndUpdate({ ticker }, { financials }, { new: true });
          console.log(newCompany);
          api_index = (api_index + 1) % api_keys.length;
     });

     updateStockPrice();
};

module.exports = { evaluate: eval };
