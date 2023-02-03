const mangoose = require("mongoose");
const { map } = require("..");
const Schema = mangoose.Schema;

const UserSchema = new Schema({
     name: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          required: true
     },
     password: {
          type: String,
          required: true
     },
     portfolio: {
          type: [{
               type: Map,
               of: {
                    //stock id and amount
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

module.exports = mangoose.model("User", UserSchema);