const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.Mongo_Url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to Database"))
.catch((error) => console.log("Error in Connecting to Database:", error));

const User = mongoose.model("user", {
  name: String,
  username: String,
  password: String,
});

module.exports = User;