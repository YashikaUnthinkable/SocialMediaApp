const Comments = require("../Models/comments.js");
const Posts = require("../Models/AllPosts");

const getComments = async (req, res) => {
    const { pid } = req.params;
    const post = await Posts.find({ id: pid });
    const data = post[0].CommentedBy;
    console.log(data);
    const comments = await Comments.find({ _id: data });
    console.log(comments);
    return res.status(200).json({ Comments: comments });
  }

 const addToComments =  async (req, res, user) => {
    console.log(req.body);
    const comment = await Comments.create({
      commentedBy: user,
      message: req.body.message,
    });
    console.log(comment);
    console.log(comment._id.toString());
  
    const post = await Posts.findOneAndUpdate(
      { id: req.body.pid },
      { $push: { CommentedBy: comment._id.toString() } }
    );
    res.status(200).json({ commentId: comment._id.toString() });
  }

module.exports = {getComments, addToComments};