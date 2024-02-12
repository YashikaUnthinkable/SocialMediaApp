const User = require("../Models/user-model");
const bcrypt = require("bcrypt");




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
      console.log(userExist);
      return res.status(400).json({ msg: "email already exist..." });
    }
    // hashing the password
    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    const UserCreated = await User.create({
      username,
      email,
      password: hash_password,
      Posts: [],
    });
    res.status(200).send({
      msg: "registered Successfull",
      token: await UserCreated.generateToken(),
      userid: UserCreated._id.toString(),
    });
  } catch (error) {}
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare plaintext password with hashed password
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token and set it in session
    const token = await userExist.generateToken();
    req.session.token = token;
    console.log(req.session);

    res.status(200).json({
      msg: "Login Successful",
      token: token,
      userId: userExist._id.toString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { home, register, login };
