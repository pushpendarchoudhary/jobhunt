const mongoose = require("mongoose");
const resumeSchema = new mongoose.Schema({

        name: {
          type: String,
          required: true,
        },
        email:{
            type: String,
            required: true,
        },
        contact:{
            type: String,
            required: true,
        },
        
        pdf:
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
        ,
        submittedBy:{
          type:mongoose.Schema.ObjectId,
          ref:"User",
          required:true
        },
        submissionDate: {
          type: Date,
          default: Date.now,
        },
        appliedFor:{
          type:mongoose.Schema.ObjectId,
          required:true
        }
      
})

const Resume = new mongoose.model("resume", resumeSchema)

module.exports = Resume;