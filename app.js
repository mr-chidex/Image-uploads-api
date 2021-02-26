const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const imageRoutes = require("./routes/image");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect db and start server
mongoose
  .connect(process.env.IMAGE_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
    app.listen(process.env.PORT || 5050, () => console.log("server running.."));
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ message: "error connecting to db" });
  });

app.use(imageRoutes);

app.use((error, rea, res, next) => {
  console.log(error.message);
  console.log(error);
  return res.status(500).json({ message: error.message });
});
