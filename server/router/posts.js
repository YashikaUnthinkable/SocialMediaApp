const express = require("express");
const { getAllPosts, addtoPost } = require("../Controller/posts");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set storage engine
let totalimages = 14;
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,path.join(__dirname+"/.."+"/.."+"/Client"+"/public"+'/images/')); // Specify the destination folder
  },
  filename: function(req, file, cb) {
    cb(null, "I0"+ (totalimages+1) + ".jpg"); // Generate unique filename
  }
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single('image'); // Name of the field in the form

const PostRouter = express.Router();

PostRouter.get("/", getAllPosts);

PostRouter.post('/upload', async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to upload file' });
    } else {
      console.log(req.file);
      res.status(200).json({ filename: req.file.filename }); // Return the filename of the uploaded file
    }
  });
});

module.exports = PostRouter;
