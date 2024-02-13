const express = require("express");
const { getAllPosts, addtoPost } = require("../Controller/posts");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'Client', 'public', 'images'), // Destination folder
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original file name
  },
});

const upload = multer({ 
    storage: storage // Your storage configuration
  });

const PostRouter = express.Router();

PostRouter.get("/", getAllPosts);

PostRouter.post('/imageUpload', async (req, res) => {
//   try {
    const { file,filename } = req.body;
    console.log(file[0],filename);
    res.send("ok");
});

module.exports = PostRouter;
