require("dotenv").config();
const express = require("express");
const {mongoDbConnection} = require("./db/conn.js");
const authRoute = require("./router/auth.js");
const contactRount = require("./router/contact.js");


const app = express();

//middleware to use json
app.use(express.json());

//using Router
app.use("/api/auth",authRoute);
app.use("/api/form",contactRount);

//for mongoDB Connection
mongoDbConnection();



app.listen(5000,()=>{
    console.log("Sever is running at port 5000");
})
