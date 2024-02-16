const Posts = require("../Models/AllPosts");
// const {addtoPostLiked} = require("./auth");
const {addPostInUser} = require("./auth");
var totalPosts = 0;
const getAllPosts = async (req,res, id)=>{
    try {
        const PostsData = await Posts.find({});
        // console.log(req.session);
        totalPosts = await PostsData.length
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
            postedBy: user,
            CommentedBy: []
        });
        console.log(postCreated);
        addPostInUser(pid,id);
    } catch(error){
        console.log(error);
    }
}

const UpdatePosts = async (req,res,id)=>{
    console.log(req.body);
    try {
        console.log(req.body);
        if(req.body.liked){
            console.log("Yes");
            const PostData = await Posts.findOneAndUpdate({id: req.body.pid},{$push: { LikedBy:  id}});
            console.log(PostData);
        }
        else{
            console.log("no");
            const PostData = await Posts.findOneAndUpdate({id: req.body.pid},{$pull: { LikedBy:  id }});
            console.log(PostData);
        }
        // addtoPostLiked(id,req.body.liked,req.body.pid)
        return res.status(200).json({"msg":"success"});
    } catch (error) {
        console.log(error);
    }
}



const handletotalPosts = ()=>{
    return totalPosts;
}

module.exports = {getAllPosts, addtoPost,handletotalPosts,UpdatePosts};