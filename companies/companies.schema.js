const mangoose = require("mongoose");
const Schema = mangoose.Schema;


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
     financials: {
          type: Map,
          of: {
               basic: {
                    type: Map,
                    of: {
                         annual: {
                              type: Map,
                              of: {
                                   currentRatio: [{
                                        period: Date,
                                        v: Number
                                   }],
                                   salesPerShare: [{
                                        period: Date,
                                        v: Number
                                   }],
                                   netMargin: [{
                                        period: Date,
                                        v: Number
                                   }],
                              }
                         }
                    }
               },
               report: [{
                    concept: String,
                    unit: String,
                    label: String,
                    value: Number
               }]
          }
     }
});

module.exports = mangoose.model("Company", CompanySchema);