const Posts = require("../Models/AllPosts");
// const {addtoPostLiked} = require("./auth");
const {addPostInUser} = require("./auth");

var totalPosts = 0;
const getAllPosts = async (req,res, id)=>{
    try {
        const PostsData = await Posts.find({});
        // console.log(req.session);
        totalPosts = PostsData.length
        return res.status(200).json({Posts: PostsData, totalPosts: totalPosts, id: id});
        
    } catch (error) {
        console.log(error)
    }
}

const addtoPost = async (req,res,user,id)=>{
    try{
        console.log(req.file.filename);
        let pid = "P"+Number(totalPosts+1)
        const postCreated = await Posts.create({
            id: pid,
            img: req.file.filename.replace(".jpg",""),
            LikedBy: [],
            postedBy: user
        });
        console.log(postCreated);
        addPostInUser(pid,id);
    } catch(error){
        console.log(error);
    }
}

const UpdatePosts = async (req,res,id)=>{
    try {
        if(req.body.liked){
            console.log("Yes");
            const PostData = await Posts.findOneAndUpdate({id: req.body.pid},{$push: { LikedBy:  id}});
        }
        else{
            console.log("no");
            const PostData = await Posts.findOneAndUpdate({id: req.body.pid},{$pull: { LikedBy:  id }});
        }
        return res.status(200).json({"msg":"success"});
    } catch (error) {
        console.log(error);
    }
}



const handletotalPosts = ()=>{
    return totalPosts;
}

module.exports = {getAllPosts, addtoPost,handletotalPosts,UpdatePosts};