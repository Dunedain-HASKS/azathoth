const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
     category: String,
     datetime: Date,
     headline: String,
     image: String,
     related: String,
     source: String,
     summary: String,
     url: String
});


module.exports = mongoose.model("News", NewsSchema);