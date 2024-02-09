const mongoose = require("mongoose");

const AllPostsSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    noOfLikes: {
        type: Number,
        required: true
    },
    postedBy: {
        type: String
    }
})

const Posts = mongoose.model("Posts",AllPostsSchema);

module.exports = Posts;