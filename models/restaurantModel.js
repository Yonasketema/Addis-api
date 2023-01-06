const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    location: GeoSchema,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// restaurantSchema.createIndex({ location: "2dsphere" });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
