 const express = require("express"); //this line imports the express module and assigns it to the 'express' variable
 const app= express();
 const cookieParser = require("cookie-parser"); 
 const bodyParser = require("body-parser");
 const path = require("path");
//  const fileUpload = require("express-fileupload");
 //this line creates an instance of the express application and assigns it to the 'app' variable. this "app" object will be used to define routes and handle http requests 
const errorMiddleware = require("./middleware/error");

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path: "backend/config/config.env"})
}
app.use(express.json({
    limit:'50mb'
})); 
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(fileUpload());



const jobs = require("./routes/jobroute"); // imports router module for handling job related routes. The './routes/jobroute' is the relative path to the file containing the router module
const user= require("./routes/userroute");
const organization = require("./routes/orgroutes");


app.use("/api/v1",jobs); //this line mounts the job router at the "/api/v1" path . Any requests that match this path , such as "/api/v1/jobs" or "/api/v1/jobs/123", will be passed to the job router for further handling
app.use("/api/v1",user);
app.use("/api/v1",organization);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res)=> {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})
//middleware for error 
app.use(errorMiddleware); 

module.exports = app;// exports the "app" object available to other modules that require or import this module