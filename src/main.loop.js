
//Phase 1
//stock price updation function (each 15 minutes)
//company market capitalization updation function (each day)

//Phase 2
//schemes evaluation function (each 15 minutes)

const Company = require('../companies/companies.schema');

eval = async () => {
     const companies = await Company.find();
     const tickers = companies.map(company => company.ticker);
     var api_index = 0;
     var api_keys = process.env.FINNHUB_API_KEYS.split(' ');
     await Company.updateMany({}, { $set: { news: [] } }).exec() ;
     // for (let i = 0; i < tickers.length; i++) {
     //      const ticker = tickers[i];
     //      const api_key = api_keys[api_index];
     //      const res = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=2022-02-02&to=2023-02-02&token=${api_key}`);
     //      const data = await res.json();
          
     // }
};

module.exports = { eval };