require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");

const connectDb = require("./connect");
const foodRouter = require("./routes/foodRoute");
const restaurantRouter = require("./routes/restaurantRoute");
const reviewRouter = require("./routes/foodRoute");
const userRouter = require("./routes/userRoutes");

const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());

connectDb("addis");

app.use("/api/v1/food", foodRouter);
app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`> App running ... http://localhost:${PORT}`);
});
