const TransactionSchema = new Schema({
     stock: {
          type: Schema.Types.ObjectId,
          ref: "Stock"
     },
     amount: Number,
     time: Date
});

module.exports = mongoose.model("Transaction", TransactionSchema);