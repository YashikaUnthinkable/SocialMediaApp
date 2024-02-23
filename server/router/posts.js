const express = require("express");
const { getAllPosts, uploadPost ,handletotalPosts,UpdateLikeDislikeOnPosts} = require("../Controller/posts");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,path.join(__dirname +'/..'+'/images/')); // Specify the destination folder
  },
  filename: function(req, file, cb) {
    cb(null, "I0"+ Number(handletotalPosts()+1) + ".jpg"); // Generate unique filename
  }
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single('image'); // Name of the field in the form

const PostRouter = express.Router();

PostRouter.get("/:count", (req,res)=>{
  const {count} = req.params;
  console.log(req.originalUrl);
  getAllPosts(req,res,req.session._id, count);
});

PostRouter.get("/:count/:title",(req,res)=>{
  const {count,title} = req.params;
  console.log(req.originalUrl);
  getAllPosts(req,res,req.session._id, count,title);
})

PostRouter.post('/upload', async (req, res) => {
  
  upload(req, res, (err) => {
    console.log(handletotalPosts());
    if (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to upload file' });
    } else {
      uploadPost(req,res,req.session.user,req.session._id);
      res.status(200).json({ filename: req.file.filename }); // Return the filename of the uploaded file
    }
  });
});

PostRouter.patch("/LikesDisLikes",(req,res)=>{
  console.log(req.session);
  console.log(req.body);
  UpdateLikeDislikeOnPosts(req,res,req.session._id);
})

module.exports = PostRouter;
