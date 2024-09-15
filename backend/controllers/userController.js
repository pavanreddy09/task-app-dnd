const { hashPassword, comparePassword, generateJWTToken } = require("../helpers/authHelpers");
const gUser = require("../models/googleUserModel");
const User = require("../models/userModel");
const { oauth2Client } = require("../utils/oauth2client");
const axios = require('axios');

const userSignup = async (req, res) => {
    try {
        const { firstname,lastname, email, password, avatar } = req.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) {
          return res.status(200).json({
            success: false,
            message: "User already exists Please Login",
          });
        }
    
        const hashedPassword = await hashPassword(password);
        const userReg = new User({
          firstname,
          lastname,
          email,
          password: hashedPassword,
          avatar,
        });
        await userReg.save();
    
        res.status(201).json({
        success: true,
        message: "Sign up was successfull Please login to continue"
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Something went wrong! Please try again later.",
          error,
        });
      }
    
}

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not registered",
      });
    }

    const matchpassword = await comparePassword(password, user.password);

    if (!matchpassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    res.status(200).json({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname : user.lastname,
        avatar: user.avatar,
        access_token: generateJWTToken(user.email),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again later.",
      error,
    });
  }
}

const googleAuth = async (req, res, next) => {

  const code = req.query.code;
  const hook = req.query.hook;

  const googleRes = await oauth2Client.getToken(code);
  
  oauth2Client.setCredentials(googleRes.tokens);

  const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
);

  let user = await gUser.findOne({ email: userRes.data.email });

  if(user && hook === 'signup') {
    return res.status(400).json({
      success: false,
      message: "User already exists Please Login",
    });
  }
  if(!user && hook === 'login'){
    return res.status(400).json({
      success: false,
      message: "Email is not registered, Please Signup",
    });
  }
  if (!user) {
      user = await gUser.create({
        displayName: userRes.data.name,
          email: userRes.data.email,
          image: userRes.data.picture,
      });
     return res.status(201).json({
        success: true,
        message: "Sign up was successfull Please login to continue"
        });
  }

  res.status(200).json({
    success: true,
    message: "login successfully",
    user: {
      _id: user._id,
      email: user.email,
      firstname: user.displayName,
      image: user.image,
      access_token: generateJWTToken(user.email) 
    },
  });

};


module.exports = {userSignup, userLogin, googleAuth}