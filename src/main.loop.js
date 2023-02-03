
//Phase 1
//stock price updation function (each 15 minutes)
//company market capitalization updation function (each day)

//Phase 2
//schemes evaluation function (each 15 minutes)

const Company = require('../companies/companies.schema');
const Stock = require('../stocks/stocks.schema');


const eval = async function () {
     const companies = process.env.COMPANIES.split(" ");
     const api_keys = process.env.FINNHUB_API_KEYS.split(" ");
     console.log(companies);
     api_index = 0;
     const db = [];
     for (let i = 0; i < companies.length; i++) {
          //fetch stock price
          const ticker = companies[i];
          const api_key = api_keys[api_index];
          const now = Math.floor(Date.now() / 1000);
          const last = now - 20000;
          //find company
          const company = await Company.findOne({ ticker: ticker });
          if (company == null) {
               console.log("Company not found", ticker);
               continue;
          } 
          const id = company._id;

          const data = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=1&from=${last}&to=${now}&token=${api_key}`).then((response) => (response.json()));

          const historic_data = [];
          if (!data.c) {
               console.log("No data found", ticker, data);
               continue;
          }
          for (let j = 0; j < data.c.length; j++) {
               const date = new Date(data.t[j] * 1000);
               const price = {
                    open: data.o[j],
                    close: data.c[j],
                    high: data.h[j],
                    low: data.l[j]
               };
               historic_data.push({ date: date, price: price });
          }

          const stock = new Stock({
               company: id,
               historic_data: historic_data
          });

          stock.save().then((data) => {
               console.log(data);
               db.push(data);
          }).catch((error) => {
               console.log(error);
          });

          // await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${api_key}`).then((response) => (response.json()))
          //      .then((data) => {
          //           console.log(data);
          //           const company = new Company({
          //                name: data.name,
          //                ticker: data.ticker,
          //                marketcap: data.marketCapitalization,
          //                country: data.country,
          //                currency: data.currency,
          //                ipo: data.ipo,
          //                sector: data.finnhubIndustry,
          //                weburl: data.weburl,
          //                logo: data.logo,
          //           });
          //           company.save().then((data) => {
          //                console.log(data);
          //           }).catch((error) => {
          //                console.log(error);
          //           });
          //      }).catch((error) => {
          //           console.log(error);
          //      });
          api_index = (api_index + 1) % api_keys.length;
     }
     return db;
};
module.exports = { eval };