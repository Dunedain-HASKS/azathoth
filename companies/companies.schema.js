const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CompanySchema = new Schema({
     name: {
          type: String,
          required: true
     }
     ,
     ticker: {
          type: String,
          required: true
     },
     marketcap: Number,
     sector: String,
     subsector: String,
     description: String,
     ipo: Date,
     country: String,
     weburl: String,
     logo: String,
     news: [{
          type: Schema.Types.ObjectId,
          ref: "News"
     }],
     financials: [{
          type: Map,
          of: {
               key: String,
               value: String
          }
     }]
});

module.exports = mongoose.model("Company", CompanySchema);