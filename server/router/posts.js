const express = require("express");
const getAllPosts = require("../Controller/posts");

const PostRouter = express.Router();

PostRouter.get("/",getAllPosts);

module.exports = PostRouter;