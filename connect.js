const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      })
      .then(() => console.log("> DB connection successfully"))
      .catch((e) => console.log("> DB connection failed", e.message));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
