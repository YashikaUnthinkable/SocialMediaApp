const Posts = require("../Models/AllPosts");

var totalPosts = 0;
const getAllPosts = async (req,res)=>{
    try {
        const PostsData = await Posts.find({});
        // console.log(req.session);
        totalPosts = await PostsData.length
        return res.status(200).json({Posts: PostsData, totalPosts: totalPosts});
        
    } catch (error) {
        console.log(error)
    }
}

const addtoPost = async (req,res)=>{
    try{
        console.log(req.file.filename);
        const postCreated = await Posts.create({
            id: "P"+Number(totalPosts),
            img: req.file.filename.replace(".jpg",""),
            noOfLikes: 0,
            postedBy: ""
        });
        console.log(postCreated);
    } catch(error){
        console.log(error);
    }
}

const handletotalPosts = ()=>{
    return totalPosts;
}

module.exports = {getAllPosts, addtoPost,handletotalPosts};