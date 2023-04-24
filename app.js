const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/task-route");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://kmshyam7991:shyamsrinivasan@cluster.7yn4oig.mongodb.net/task-api?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err.message));

app.use("/v1/tasks", taskRoutes);

app.listen(8080, () => console.log("Server is running up at 8080"));
