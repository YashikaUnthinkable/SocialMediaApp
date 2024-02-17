const express = require("express");
const {getComments, addToComments} = require("../Controller/comment");
const Commentrouter = express.Router();
// const contactForm = require("../Controller/contact.js")

Commentrouter.get("/:pid", getComments);
Commentrouter.post("/", (req,res)=>{
    addToComments(req,res,req.session.user)
});



module.exports = Commentrouter;
