const mongoose = require("mongoose");

const AllPostsSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    title:{
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
    postedById:{
        type: String,
        required: true
    }
},
{timestamps: true})

const Posts = mongoose.model("Posts",AllPostsSchema);

module.exports = Posts;