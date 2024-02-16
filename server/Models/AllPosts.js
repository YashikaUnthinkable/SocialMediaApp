const mongoose = require("mongoose");

const AllPostsSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    LikedBy: {
        type: Object,
        required: true
    },
    postedBy: {
        type: String
    },
    CommentedBy: {
        type: Object,
        required: true
    }
})

const Posts = mongoose.model("Posts",AllPostsSchema);

module.exports = Posts;