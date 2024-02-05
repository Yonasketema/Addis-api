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

app.all("*", (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server`));
});

//Global error handler
app.use((error, req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`> App running ... http://localhost:${PORT}`);
});
