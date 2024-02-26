const environment = process.env.NODE_ENV;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

if (environment == "development") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/product", require("./src/routes/ProductRoute"));
app.use("/api/user", require("./src/routes/UserRoute"));
app.use("/api/order", require("./src/routes/OrderRoute"));

app.get("/api/health", (req, res) => {
  res.status(200).send({
    message: "Server is running fine.",
    status: 200,
  });
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

module.exports = app;
