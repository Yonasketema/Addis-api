const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  price: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    require: true,
  },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
