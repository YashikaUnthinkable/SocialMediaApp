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
    LikedBy: [{
        type: String // Assuming liked users are identified by their IDs
    }],
    postedBy: {
        type: String
    },
    postedById:{
        type: String,
        required: true
    }
},
{timestamps: true});

AllPostsSchema.index({title: "text"});

const Posts = mongoose.model("Posts",AllPostsSchema);

module.exports = Posts;