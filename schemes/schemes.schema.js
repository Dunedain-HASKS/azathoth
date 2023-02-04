const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const SchemeSchema = new Schema({
     name: {
          type: String,
          required: true
     },
     stocks: [{
          type: Map,
          of: {
               id: {
                    type: Schema.Types.ObjectId,
                    ref: "Stock"
               },
               amount: {
                    type: Number,
                    required: true,
                    default: 0
               }
          }
     }],
     add_percent: {
          type: Number,
          required: true,
          default: 0
     },
     interval: {
          type: Map,
          of: {
               hours: Number,
               minutes: Number
          }
     },
     lower_limit: Number,
     upper_limit: Number,
});


module.exports = mongoose.model("Transaction", SchemeSchema);