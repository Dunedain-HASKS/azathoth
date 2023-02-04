const express = require('express');
const router = express.Router();
const { updateStockPrice } = require('./updation');
module.exports = router;

const Company = require('../companies/companies.schema');
const News = require('../news/news.schema')

eval = async () => {
     // const companies = await Company.find();
     // var api_index = 0;


     // await Company.updateMany({}, { $set: { news: [] } }).exec();
     // for (let i = 0; i < companies.length; i++) {
     //      const ticker = companies[i].ticker;

     //      const news = await News.find({ related: ticker }).exec()
     //      news.map((news) => news._id)
     //      const company = await Company.findByIdAndUpdate(companies[i]._id, {
     //           $push: { news: { $each: news } }
     //      });
     //      console.log(company, news);

     // }

     updateStockPrice();
};

module.exports = { evaluate: eval };
