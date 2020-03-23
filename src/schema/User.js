const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  age: Number,
  sex: Boolean,
  from: String,
  about:{
      favorite:String,
      job:String
  }
});

module.exports = mongoose.model('User',schema)