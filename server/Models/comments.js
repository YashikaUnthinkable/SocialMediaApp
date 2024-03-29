const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentedBy:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    onPost: {
        type: String,
        required: true
    },
    
},
{timestamps: true})

const Comments = mongoose.model("Comment",commentSchema);

module.exports = Comments;