 const express = require("express"); //this line imports the express module and assigns it to the 'express' variable
 const cookieParser = require("cookie-parser");

 

const app= express(); //this line creates an instance of the express application and assigns it to the 'app' variable. this "app" object will be used to define routes and handle http requests 
// Route imports s
const errorMiddleware = require("./middleware/error");


app.use(express.json({
    limit:'50mb'
})); //this line adds middleware to express application that parses incoming requests with json payloads. it allows you to access the request body as 'req.body' in your route handlers
app.use(cookieParser());



const jobs = require("./routes/jobroute"); // imports router module for handling job related routes. The './routes/jobroute' is the relative path to the file containing the router module
const user= require("./routes/userroute");
const organization = require("./routes/orgroutes");

app.use("/api/v1",jobs); //this line mounts the job router at the "/api/v1" path . Any requests that match this path , such as "/api/v1/jobs" or "/api/v1/jobs/123", will be passed to the job router for further handling
app.use("/api/v1",user);
app.use("/api/v1",organization);
app.use(errorMiddleware); 
//middleware for error 


module.exports = app;// exports the "app" object available to other modules that require or import this module