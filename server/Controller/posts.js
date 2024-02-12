const Posts = require("../Models/AllPosts");

let totalPosts = 14;
const getAllPosts = async (req,res)=>{
    try {
        const PostsData = await Posts.find({});
        console.log(req.session);
        return res.status(200).json({Posts: PostsData, totalPosts: totalPosts});
        
    } catch (error) {
        console.log(error)
    }
}

const addtoPost = async (req,res)=>{
    try{
        const {img, postedBy} = req.body;
        totalPosts = totalPosts++;

    } catch(error){
        console.log(error);
    }
}

module.exports = {getAllPosts};