const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const gUser = mongoose.model("guser", userSchema);
module.exports = gUser;