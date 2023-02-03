const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
     stock: {
          type: Schema.Types.ObjectId,
          ref: "Stock"
     },
     amount: Number,
     time: Date
});

module.exports = mongoose.model("Transaction", TransactionSchema);