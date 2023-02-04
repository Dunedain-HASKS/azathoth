//company market and stock price updation functions
const Stock = require('../stocks/stocks.schema');
const User = require('../user/user.schema');

const updateStockPrice = async () => {
     const stocks = await Stock.find().populate('company').exec();
     const api_keys = process.env.FINNHUB_API_KEYS.split(' ');
     var api_index = 0;
     const now = Math.round(Number(new Date()) / 1000);
     stocks.map(async (stock) => {
          var historic_data = stock.historic_data;
          const last = Math.round(historic_data[historic_data.length - 1].get('date') / 1000);
          const prevPrice = (historic_data[historic_data.length - 1].get('price')).close;
          const ticker = stock.company.ticker;
          console.log(ticker);
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
          console.log(historic_data);

          const users = await User.find({}).exec();
          users.forEach(async (user) => {
               if (user.net_worth.length === 0) return;
               var newNetWorth = user.net_worth[user.net_worth.length - 1].get('value');
               user.portfolio.forEach((pair) => {
                    if (pair.get('stock').toString() === stock._id.toString()) {
                         const amount = pair.get('amount');
                         const newPrice = stock.historic_data[stock.historic_data.length - 1].get('price').close;
                         newNetWorth += (newPrice - prevPrice) * amount / prevPrice;
                         pair.set('amount', (newPrice / prevPrice) * amount);
                    }
                    console.log(user);
                    User.findByIdAndUpdate(user._id, { $set: { portfolio: user.portfolio }, $push: { newNetWorth } }, { new: true }).exec();
               });
          });
          Stock.findByIdAndUpdate(stock._id, { $set: { historic_data: stock.historic_data } }, { new: true }).exec();
     });


     
}

module.exports = {
     updateStockPrice
};