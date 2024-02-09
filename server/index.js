require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {mongoDbConnection} = require("./db/conn.js");
const authRoute = require("./router/auth.js");
const contactRount = require("./router/contact.js");
const PostRouter = require("./router/posts.js");
 

const app = express();

//handling cors policy
const corsOption = {
    origin: "http://localhost:3000",
    method: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
};
app.use(cors(corsOption));

//middleware to use json
app.use(express.json());

//using Router
app.use("/api/auth",authRoute);
app.use("/api/form",contactRount);
app.use("/api/posts",PostRouter);

//for mongoDB Connection
mongoDbConnection();

app.listen(5000,()=>{
    console.log("Sever is running at port 5000");
})
