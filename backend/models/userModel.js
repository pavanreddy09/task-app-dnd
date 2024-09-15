const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: false,
      default: ""
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: Object,
      required: false,
      default: {},
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;