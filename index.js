const express = require("express");
const connectDb = require("./connect");
const foodRouter = require("./routes/foodRoute");
const restaurantRouter = require("./routes/restaurantRoute");

const app = express();

const PORT = 8000;

app.use(express.json());

connectDb("addis");

app.use("/api/v1/food", foodRouter);
app.use("/api/v1/restaurant", restaurantRouter);

app.get("/api/v1", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`> App running ... http://localhost:${PORT}`);
});
