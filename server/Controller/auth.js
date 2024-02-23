const User = require("../Models/user-model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");




const home = async (req, res) => {
  try {
    res.status(200);
    res.send("Hello from server...");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ msg: "email already exist..." });
    }
    // hashing the password
    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    const UserCreated = await User.create({
      username,
      email,
      password: hash_password,
    });
    console.log(UserCreated);

    res.status(200).send({
      msg: "registered Successfull",
      token: await UserCreated.generateToken(),
      userid: UserCreated._id.toString(),
    });
  } catch (error) {}
};

const login = async (req, res) => {
  
};




module.exports = { home, register, login};
