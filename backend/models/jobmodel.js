const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
    // design schema here
    jobtitle:{
        type: String,
        required: [true,"please enter job titile"]
    },
    department:{
        type: String,
        required: [true,"pleasse enter department or company name"]
    },
    salary:{
        type: String,
        required: [true,"please enter salary "],
    },
    posts:{
        type: String,
        required:[true,"enter the posts "]
    },
    description:{
        type:String,
        required:[true,"enter job description"]
    },
    requirements:{ 
        type:String,
        required: [true,"enter requirements"]
    },
    responsibilities:{
        type: String,
        required: [true,"enter the responsibilites"]
    },
    benefits:{
        type: String,
        required: [true,"enter benefits of job"]
    },
    apply:{
        type: String,
        required: [true,"enter how to apply"]
    },
    pathway:{
        type: String,
        required: [true,"enter the pathway or roadmap to get the job"]
    },
    image:[
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})
const Jobs = new mongoose.model("Jobs",jobSchema);

module.exports= Jobs;