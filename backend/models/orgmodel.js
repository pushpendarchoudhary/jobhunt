const mongoose = require("mongoose");
const orgSchema = new mongoose.Schema({

        name: {
          type: String,
          required: true,
        },
        industry: {
          type: String,
          required: true,
        },
        registrationNumber: {
          type: String,
          required: true,
          unique: true,
        },
        address: {
          street: String,
          city: String,
          state: String,
          postalCode: Number,
          country: String,
        },
        contact: {
          email: String,
          phone: String,
          website: String,
        },
        admin: {
          firstName: String,
          lastName: String,
          email: String,
          contact: String, 
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
        requestedBy:{
          type:mongoose.Schema.ObjectId,
          ref:"User",
          required:true
        },
        registrationDate: {
          type: Date,
          default: Date.now,
        },
      
})

const Organization = new mongoose.model("Organization", orgSchema)

module.exports = Organization;