const StockSchema = new Schema({
     company: {
          type: Schema.Types.ObjectId,
          ref: "Company",
          required: true
     },
     historic_data: {
          type: [{
               type: Map,
               of: {
                    date: {
                         type: Date,
                         required: true
                    },
                    price: {
                         type: Map,
                         of: {
                              open: Number,
                              close: Number,
                              high: Number,
                              low: Number
                         }
                    }
               }
          }]
     }
});

module.exports = mangoose.model("Stock", StockSchema);