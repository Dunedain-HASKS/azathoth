const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
     name: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          required: true,
     },
     password: {
          type: String,
          required: true
     },
     portfolio: {
          type: [{
               type: Map,
               of: {
                    stock: {
                         type: Schema.Types.ObjectId,
                         ref: "Stock"
                    },
                    amount: {
                         type: Number,
                         required: true,
                         default: 0
                    }
               }
          }]
     }
     ,
     net_worth: {
          type: [{
               type: Map,
               of: {
                    date: {
                         type: Date,
                         required: true
                    },
                    value: {
                         type: Number,
                         required: true,
                         default: 0
                    }
               }
          }]
     },
     active_schemes: {
          type: [{
               type: Schema.Types.ObjectId,
               ref: "Scheme"
          }]
     },
     transactions: {
          type: [{
               type: Schema.Types.ObjectId,
               ref: "Transaction"
          }]
     }
});

module.exports = mongoose.model("User", UserSchema);