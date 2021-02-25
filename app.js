const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

app.use(morgan("dev"));

//connect db and start server
mongoose
  .connect(process.env.IMAGE_DB)
  .then(() => {
    console.log("db connected");
    app.listen(process.env.PORT || 5050, () => console.log("server running.."));
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ message: "error connecting to db" });
  });
