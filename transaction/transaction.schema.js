const TransactionSchema = new Schema({
     stock: {
          type: Schema.Types.ObjectId,
          ref: "Stock"
     },
     amount: Number,
     time: Date
});

module.exports = mangoose.model("Transaction", TransactionSchema);