const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const gUser = require("../models/googleUserModel");

// password hash function
const hashPassword = async (password) => {
  try {
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

// compare entered password with hashedpassword
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// generate a token
const generateJWTToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
  };

const verifyJWTToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
        if (err) {
          return "token_expired";
        } else {
          return res;
        }
      });

      if (decoded === "token_expired") {
        return res.status(400).json({ message: "Token expired login again" });
      }
      req.user = await User.findOne({ email: decoded.email }).select(
        "-password"
      );

      if(!req.user){
        req.user = await gUser.findOne({email : decoded.email});
      }
      
      next();
    } catch (err) {
      res.status(400).json({ message: "Not logged in or invalid token" });
    }
  }

  if (!token) {
    return res.status(400).json({ message: "Not authorized or Invalid Token" });
  }
};


module.exports = { hashPassword, comparePassword, generateJWTToken, verifyJWTToken};