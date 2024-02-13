const express = require('express');
const router = express.Router();
const authControllers = require("../Controller/auth");
const User = require("../Models/user-model");
const bcrypt = require("bcrypt");

router.get("/",authControllers.home);

router.post("/register",authControllers.register);

// router.post("/login",authControllers.login);
router.post("/login" , async(req , res) => {
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
        // const token = await userExist.generateToken();
        console.log(userExist.email);
          req.session.user = userExist.email;

        // req.session.user = "yashika";
        
    
        res.status(200).json({
          msg: "Login Successful",
          userId: userExist._id.toString()
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
      }
}) 

module.exports = router;