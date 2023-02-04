//company market and stock price updation functions
const Stock = require('./stocks/stocks.schema');
const User = require('./user/user.schema');

 const updateStockPrice = async () => {
     const stocks = await Stock.find().exec();
     const api_keys = process.env.FINNHUB_API_KEY.split(' ');
     const api_index = 0;
     api_index.forEach(async (stock) => {
          const ticker = stock.ticker;
          const req = fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${api_keys[api_index]}`);
          const res = await req.json();
          console.log(res, api_keys[api_index]);
     });

     // stocks.forEach(async (stock) => {
     //      const ticker = stock.ticker;
     //      const last = Math.round(stock.historic_data[stock.historic_data.length - 1].date);
     //      const now = Math.round((new Date())/1000);
     //      const req = fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${last}&to=${now}&token=${process.env.FINNHUB_API_KEY}`);
     //      await Stock.updateOne({ _id: stock._id }, { $push :  }).exec();
     // });
}

module.exports = {
     updateStockPrice
};