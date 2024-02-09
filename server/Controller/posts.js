const Posts = require("../Models/AllPosts");

const getAllPosts = async (req,res)=>{
    try {
        const PostsData = await Posts.find({});
        return res.status(200).json(PostsData);
    } catch (error) {
        console.log(error)
    }
}

module.exports = getAllPosts;