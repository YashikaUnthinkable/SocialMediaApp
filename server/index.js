require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {mongoDbConnection} = require("./db/conn.js");
const cookieParser = require('cookie-parser'); 
const authRoute = require("./router/auth.js");
const contactRount = require("./router/contact.js");
const PostRouter = require("./router/posts.js");
const session = require('express-session');
 

const app = express();

//handling cors policy
const corsOption = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true
};
app.use(cors(corsOption));

//middleware to use json
app.use(express.json());

app.use(cookieParser());
// Set up session middleware
app.use(session({
    secret: 'your_secret_here',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000 // Cookie expiration time in milliseconds (1 day)
    }
  }));

//using Router
app.use("/api/auth",authRoute);
app.use("/api/form",contactRount);
app.use("/api/posts",PostRouter);

//for mongoDB Connection
mongoDbConnection();

app.listen(5000,()=>{
    console.log("Sever is running at port 5000");
})
