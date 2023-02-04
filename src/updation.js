//company market and stock price updation functions
const Stock = require('../stocks/stocks.schema');
const User = require('../user/user.schema');

const updateStockPrice = async () => {
     const stocks = await Stock.find().populate('company').exec();
     const api_keys = process.env.FINNHUB_API_KEYS.split(' ');
     var api_index = 0;
     const now = Math.round(Number(new Date()) / 1000);
     stocks.map(async (stock) => {
          const last = Math.round(stock.historic_data[stock.historic_data.length - 1].get('date') / 1000);
          const ticker = stock.company.ticker;
          const res = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=1&token=${api_keys[api_index]}&from=${last}&to=${now}`);
          const data = await res.json();
          for (let j = 0; j < data.c.length; j++) {
               const date = new Date(data.t[j] * 1000);
               const price = {
                    open: data.o[j],
                    close: data.c[j],
                    high: data.h[j],
                    low: data.l[j]
               };
               historic_data.push({ date: date, price: price });
          };
          Stock.findByIdAndUpdate(stock._id, { $set: { historic_data: stock.historic_data } }, { new: true }, (err, doc) => {
               if (err) {
                    console.log(err);
               }
          }).exec();

          const users = await User.find({}).exec();
          users.forEach(async (user) => {
               const previousNetWorth = user.net_worth;



               const newNetWorth = user.net_worth;
               User.findByIdAndUpdate(user._id, { $set: { portfolio: user.portfolio } }, { new: true }, (err, doc) => {
                    if (err) {
                         console.log(err);
                    }
               }).exec();
          });
     });
}

module.exports = {
     updateStockPrice
};