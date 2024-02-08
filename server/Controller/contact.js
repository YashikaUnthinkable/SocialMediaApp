const Contact = require("../Models/contact-model");

const contactForm = async (req,res)=>{
    try {
        // console.log(req.body);
        const response = req.body;
        const Response = await Contact.create(response);
        console.log(Response);
        return res.status(200).json({message: "message send successfully..."})
    } catch (error) {
        return res.status(500).json({message: "message not delivered..."})
    }
}

module.exports = contactForm;
