const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

//json web token
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,          
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d"
        }
        );
    } catch (error) {
        console.log(error);
    }
}

//securing the password with bcrypt
// userSchema.pre('save',async function(next){
//     console.log("pre data: "+this);
//     const user = this;
//     if(user.isModified("password")){
//         next();
//     }

//     try {
//         const saltRound = await bcrypt.genSalt(10);
//         const hash_password = await bcrypt.hash(user.password,saltRound);
//         user.password = hash_password
//     } catch (error) {
//         next(error);
//     }
// })

const User =  new mongoose.model("User",userSchema);

module.exports = User;