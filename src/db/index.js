const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb://localhost:27017/graphql_demo", {
    useNewUrlParser: true,
    useUnifiedTopology:true
  });

  mongoose.connection.on("error", err => {
    console.log(err);
  });

  mongoose.connection.on("on", () => {
    console.log("connect db success");
  });
};