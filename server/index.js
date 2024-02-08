require("dotenv").config();
const express = require("express");
const {mongoDbConnection} = require("./db/conn.js");
const router = require("./router/auth.js");


const app = express();

//middleware to use json
app.use(express.json());

//using Router
app.use("/api/auth",router);

//for mongoDB Connection
mongoDbConnection();



app.listen(5000,()=>{
    console.log("Sever is running at port 5000");
})
