const Posts = require("../Models/AllPosts");

var totalPosts = 0;
var PostsCount = 0
const getAllPosts = async (req,res, id, skips,title)=>{

    try {
        PostsCount = await Posts.countDocuments({});
        let PostsData = "";
        if(title){
            PostsData = await Posts.find({ $text: { $search: title } }).sort({_id: -1}).limit(10).skip(Number(skips));
            
        }
        else{
            PostsData = await Posts.find({}).sort({_id: -1}).limit(10).skip(Number(skips));
        }
        totalPosts = PostsData.length
        return res.status(200).json({Posts: PostsData, totalPosts: totalPosts, id: id, PostsCount: PostsCount});
        
    } catch (error) {
        console.log(error)
    }
}


const uploadPost = async (req,res,user,id)=>{
    try{
        console.log(req.body);
        console.log(req.file.filename);
        let pid = "P"+Number(PostsCount+1)
        const postCreated = await Posts.create({
            id: pid,
            img: req.file.filename.replace(".jpg",""),
            title: req.body.title,
            LikedBy: [],
            postedBy: user,
            postedById: id
        });
        console.log(postCreated);
    } catch(error){
        console.log(error);
    }
}

const UpdateLikeDislikeOnPosts = async (req,res,id)=>{
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


const UpdateTitle = async (req,res)=>{
    try{
        const {pid, title} = req.body;
    const PostData = await Posts.findOneAndUpdate({id: pid},{title: title})
    return res.status(200).json({"msg": "success"})
    }
    catch(error){
        console.log(error);
    }
    
}


const handletotalPosts = ()=>{
    return PostsCount;
}

module.exports = {getAllPosts, uploadPost,handletotalPosts,UpdateLikeDislikeOnPosts, UpdateTitle};