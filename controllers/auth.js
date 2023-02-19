const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  postSignup: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      //hashed the password
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SEC_PASS
      ).toString(),
    });
    try {
      //save a new user to the user database
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getSignup: (req, res) => {
    console.log("get signup");
  },
  postLogin: async (req, res) => {
    try {
      //find the user data
      const user = await User.findOne({ username: req.body.username });
      //check if the username is correct or the user is existed
      !user && res.status(401).json("wrong username!");
      //decrypt teh existed user's hashed password
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SEC_PASS
      );
      const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      //check if the password correct
      decryptedPassword !== req.body.password &&
        res.status(401).json("wrong password!");
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        {
          //users need to login again after 3 days
          expiresIn: "3d",
        }
      );
      //to not send password in the response for more security
      //using _doc so that we only receive the data we want, not all of the res
      const { password, ...others } = user._doc;
      //only send others than the password as the response
      res.status(200).json({ ...others, accessToken });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getLogin: (req, res) => {
    console.log("getlogin");
  },
  logout: (req, res) => {
    console.log("logout");
  },
};
