const Comments = require("../Models/comments.js");


const getComments = async (req, res) => {
  try {
      const { pid } = req.params;
      
      const comments = await Comments.find({onPost: pid});
      return res.status(200).json({ Comments: comments });
  } catch (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
}

const addToComments = async (req, res, user) => {
  try {
      const { pid, message } = req.body;

      if (!pid || !message) {
          return res.status(400).json({ error: 'Missing required parameters' });
      }

      const comment = await Comments.create({
          commentedBy: user,
          message: message,
          onPost: pid
      });
      console.log(comment);

      return res.status(200).json({"msg": "success"});
  } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {getComments, addToComments};