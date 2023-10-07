const { json } = require("body-parser");
const mongoose = require("mongoose");
const Jobs = require("../models/jobmodel");
const Resume = require("../models/resume");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const getDataUri = require("../utils/dataUri");
const {singleUpload} = require("../middleware/multer");
const { ObjectId } = require("mongodb");

// creating jobs
exports.createJob = catchAsyncErrors(async (req,res,next)=>{ 

    let image = [];

  if (typeof req.body.image === "string") {
    image.push(req.body.image);
  } else {
    image = req.body.image;
  }

  const imageLinks = [];

  for (let i = 0; i < image.length; i++) {
    const result = await cloudinary.v2.uploader.upload(image[i], {
      folder: "Job images",
    });

    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.image = imageLinks;
    req.body.createdBy =req.user.id;
    const jobs = await Jobs.create(req.body);
    res.status(201).json({
        success:true,
        jobs
    });
});
exports.getallJobs= catchAsyncErrors(async (req,res,next)=>{
    
    
    const apiFeatures = new ApiFeatures(Jobs.find(),req.query).search().filter();
    const jobs= await apiFeatures.query;
    res.status(200).json({
        success:true,
        jobs,

    });
});

// Get All Product (Admin)
exports.getAdminJobs = catchAsyncErrors(async (req, res, next) => {
    const jobs = await Jobs.find();
  
    res.status(200).json({
      success: true,
      jobs,
    });
  });

  
// get job details 
exports.getJobDetails = catchAsyncErrors(async(req,res,next)=>{
    const jobs = await Jobs.findById(req.params.id);
    if(!jobs){
        return next(new Errorhandler("job not found",404));
     }
     res.status(200).json({
        success:true,
        jobs
     })
});
//update jobs
exports.updateJobs= catchAsyncErrors(async (req,res,next)=>{
    let jobs= await Jobs.findById(req.params.id);
    if(!jobs){
       return next(new Errorhandler("job not found",404));
    }
    let image = [];
    if (typeof req.body.image === "string"){
      image.push(req.body.image);
    }
    else {
      image = req.body.image;
    }

    

    if(image !== undefined) {
      for (let i=0; i< jobs.image.length; i++){
        await cloudinary.v2.uploader.destroy(jobs.image[i].public_id);
      }
      let imageLinks = [];

      for (let i=0; i< image.length; i++){
        const result = await cloudinary.v2.uploader.upload(image[i], {
          folder : "Job images",
        });
        imageLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        })
      }
      req.body.image = imageLinks;
    }
    jobs = await Jobs.findByIdAndUpdate(req.params.id,req.body,{
       new:true,
       runValidators:true,
       useFindAndModify:false
    });

    res.status(200).json({
       success:true,
       jobs
    })
});


// delete job
exports.deleteJobs = catchAsyncErrors(async(req,res,next)=>{
    const jobs= await Jobs.findById(req.params.id);
    if(!jobs){
        return next(new Errorhandler("job not found",404));
     }

    // deleting images from cloudinary

    for(let i=0; i<jobs.image.length; i++){
         await cloudinary.v2.uploader.destroy(
            jobs.image[i].public_id
        );
    }
    await Jobs.findByIdAndDelete(req.params.id,req.body)
    res.status(200).json({
        success:true,
        message: "job delete successful"
    })
});

exports.UploadResume = [singleUpload, catchAsyncErrors(async(req, res, next)=>{

  const { name, email, contact,appliedFor } = req.body;
  const file = req.file;
  console.log(file);
  if(!file){
    return res.status(400).json({message: "no file uploaded"});
  }
  const fileUri = getDataUri(file);
  const submittedBy =req.user.id;
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {folder:"resumes"});
  const resume = await Resume.create({
    name,email,contact,submittedBy, appliedFor, pdf:{
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    }
  })
  res.status(201).json({
    success:true,
    resume
  })
})
]

exports.getallresume = catchAsyncErrors(async (req, res, next) => {
 // Assuming the job ID is sent as a parameter
 const resume = await Resume.find();
 res.status(200).json({
   success: true,
   resume
 })
});

exports.getresume = catchAsyncErrors(async (req, res, next)=>{
  const id = req.params;
  const validId = new ObjectId(id);

  const resume = await Resume.find({appliedFor: validId});
  res.status(200).json({
    success: true,
    resume,
  });
 
})

exports.deleteResume = catchAsyncErrors(async(req,res,next)=>{
  const resume= await Resume.findById(req.params.id);
  if(!resume){
      return next(new Errorhandler("Resume not found",404));
   }

  // deleting images from cloudinary
  
  await cloudinary.v2.uploader.destroy(
       resume.pdf.public_id
   );

  await Resume.findByIdAndDelete(req.params.id, req.body)
  res.status(200).json({
      success:true,
      message: "resume deleted successful"
  })
});

