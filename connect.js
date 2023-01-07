const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDb = async (name) => {
  try {
    await mongoose
      .connect(`mongodb://localhost:27017/${name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      })
      .then(() => console.log("> DB connection successfully"))
      .catch(() => console.log("> DB connection failed"));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
