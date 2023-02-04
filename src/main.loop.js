const express = require('express');
const router = express.Router();
const { updateStockPrice } = require('./updation');
module.exports = router;

const Company = require('../companies/companies.schema');
const News = require('../news/news.schema')

eval = async () => {
     const companies = await Company.find();
     // var api_index = 0;

     companies.map(async(company) => {
          const data1 = await fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${company.ticker}&metric=all&token=cfenj61r01qoicaf7a0gcfenj61r01qoicaf7a10`)
          const resJson = data1.json()

          company = {...company, financials: { basic:  resJson.series }}
          await Company.findByIdAndUpdate(company._id, company)


     })
     // await Company.updateMany({}, { $set: { financials: [] } }).exec();

     // for (let i = 0; i < companies.length; i++) {
     //      const ticker = companies[i].ticker;

                    

          // const news = await News.find({ related: ticker }).exec()
          // news.map((news) => news._id)
          // const company = await Company.findByIdAndUpdate(companies[i]._id, {
          //      $push: { news: { $each: news } }
          // });
          // console.log(company, news);

     // }



     // updateStockPrice();
};

module.exports = { evaluate: eval };
