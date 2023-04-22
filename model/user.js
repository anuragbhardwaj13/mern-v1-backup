const mongoose = require("mongoose");
//create a new mongodb schema
const UserSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
  },
  gender: {
    type: "String",
    required: true,
  },
  age: {
    type: "Number",
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
