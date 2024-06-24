
const app = require("./app");//imports the module located at relative path "./app" it assigns the exported value of that module (this pattern is used where you want to separate your express application setup and routing logic into different modules.By exporting the "app" object, you can import it into another file (such as the main entry point of your application ) and start the server with the defined routes and middleware)
//dotenv module is commonly used for loading environment variables from a '.env' file into Node.js applications
const connectDatabase = require("./config/database"); 
const cloudinary = require("cloudinary");
process.on("uncaughtException",(err)=>{
    console.log("error : "+ err.message);
    console.log("shutting down the server due to uncaught exception");
    process.exit(1);
});

// if(process.env.NODE_ENV!=="PRODUCTION"){
//     require("dotenv").config({path:"backend/config/config.env"});
// }

// connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


app.on('error',(err)=>{
    console.error('unhandled error:',err);
});


const server = app.listen(process.env.PORT, () => {
        console.log('server is working on http://localhost:' + process.env.PORT); // 'process.env.PORT' is used dynamically set the port number for the server. The 'app.listen()' method starts the server and listents on the specified port.once the server is up and running the provided callback function is executed which in this case logs a message to the console indicating that the server is working and specifies the URL where it can be accessed
}); 

// unhandled promise rejections
process.on("unhandledRejection",(err)=>{
    console.log("error : " + err.message);
    console.log("shutting down the server due to unhandled Promise rejection");
    server.close(()=>{
        process.exit(1)
    });
});