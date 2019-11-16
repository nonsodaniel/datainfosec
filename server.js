const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("./config/database");
var jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const path = require("path");

const admin = require("./admin/routes/is_admin");


app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

app.set("secretKey", "nodeRestApi"); // JWT secret key

//connection to mongodb
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error")
);
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

//Public route
app.use("/api/admin", admin);

app.get("/favicon.ico", (req, res) => {
  res.sendStatus(204);
});

//for production use only
//get all request that are not /api and returns index file
//client app will take care of other routes i.e loaclhost:4000/somepage
//somepage will be taken care of by the server


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
//express doesn't really consider  not found 404 as an error so we need to handle 404 explicitly

//handle 404 error
app.use((req, res, next) => {
  let err = new Error("Not found!");
  err.status = 404;
  next(err);
});

//handle errors
app.use((err, req, res, next) => {
  console.log(err);
  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something went wrong" });
});

let port = process.env.PORT || 4000;
app.listen(port, () => {
  // console.log(port)
  console.log(`We are live on port ${port}`);
});
