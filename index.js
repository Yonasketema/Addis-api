require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");

const connectDb = require("./connect");
const foodRouter = require("./routes/foodRoutes");
const restaurantRouter = require("./routes/restaurantRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());

connectDb("addis");

app.use("/api/v1/foods", foodRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`> App running ... http://localhost:${PORT}`);
});
