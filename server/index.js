require("dotenv").config();
const express = require("express");
// const cors = require("cors");
const {mongoDbConnection} = require("./db/conn.js");
const authRoute = require("./router/auth.js");
const contactRount = require("./router/contact.js");
const PostRouter = require("./router/posts.js");
const session = require('express-session');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
 

const app = express();

//handling cors policy
// const corsOption = {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
//     credentials: true
// };
// app.use(cors(corsOption));

//middleware to use json
app.use(express.json());


// Set up session middleware
app.use(session({
    secret: 'your_secret_here',
    resave: false,
    saveUninitialized: false,
  }));

app.get("/api/userExist",(req,res)=>{
  if(req.session.user){
    console.log(req.session.user);
    res.status(200);
    return res.json({"msg": "ok"})
    // return res.status(200).json({"msg":"success"});
  }
  else{
    console.log("not there");
    res.status(400)
    return res.json({"msg": "not ok"})
    // return res.status(200).json("msg","failed");
  }
})
app.post("/api/logout",(req,res)=>{
  try{
    req.session.destroy(); 
    res.send("success");
    res.status(200);
  }
  catch(err){
    console.log(err);
  }
});
const imageSchema = new mongoose.Schema({
  imageUrl: String,
});

// Create a model based on the schema
const Image = mongoose.model('Image', imageSchema);

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: './images/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1000000 } // 1 MB limit
}).single('image');

// Route to handle image upload
app.post('/api/upload', (req, res) => {
  console.log(req.body);
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const newImage = new Image({
        imageUrl: req.file.path
      });
      await newImage.save();
      res.json({ imageUrl: req.file.path });
    } catch (error) {
      console.error('Error saving image to database:', error);
      res.status(500).json({ error: 'Failed to save image to database' });
    }
  });
});

// Route to get all images
app.get('/api/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});
//using Router
app.use("/api/auth",authRoute);
app.use("/api/form",contactRount);
app.use("/api/posts",PostRouter);

//for mongoDB Connection
mongoDbConnection();

app.listen(5000,()=>{
    console.log("Sever is running at port 5000");
})
app.get("/full" , (req , res) => {
  console.log("hello");
})
