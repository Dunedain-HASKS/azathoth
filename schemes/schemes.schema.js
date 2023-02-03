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
     
});
// {
//           "name": "//investment schemes to auto buy and sell when total price gets lower or higher then a certain value",
//           "stocks": [
//                {
//                     "id": "#stockid",
//                     "amount": 0
//                }
//           ],
//           "add_percent": 0,
//           "interval": {
//                "hours": 0,
//                "minutes": 0
//           },
//           "initial_value": 0,
//           "last evaluation": "//last evaluation time",
//           "lower_short": "sell when gets lower then value",
//           "upper_short": "sell when gets higher then value"
//      }
module.exports = mangoose.model("Transaction", SchemeSchema);