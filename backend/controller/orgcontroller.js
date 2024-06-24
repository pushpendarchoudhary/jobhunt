const catchAsyncErrors = require("../middleware/catchAsyncError");
const Organization = require("../models/orgmodel");
const cloudinary = require('cloudinary');
const Errorhandler = require("../utils/errorhandler");



exports.orgRegister = catchAsyncErrors(async (req,res,next)=>{ 

    let image = [];

  if (typeof req.body.image === "string") {
    image.push(req.body.image);
  } else {
    image = req.body.image;
  }

  const imageLinks = [];

  for (let i = 0; i < image.length; i++) {
    const result = await cloudinary.v2.uploader.upload(image[i], {
      folder: "Org images",

    });

    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.image = imageLinks;
  req.body.requestedBy = req.user.id;
  
    const orgs = await Organization.create(req.body);
    res.status(201).json({
        success:true,
        orgs
    });
});

exports.getOrgDetailsForAdmin = catchAsyncErrors(async(req,res,next)=>{
    
    const orgs = await Organization.findById(req.params.id);
    if(!orgs){
        return next (new Errorhandler(`NO Organization is registered with id ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        orgs,
    });
});

// update user details
exports.updateOrgDetails = catchAsyncErrors(async(req,res,next)=>{
   
    const newOrgData = {
        name:req.body.name,
        industry:req.body.industry,
        registrationNumber:req.body.registrationNumber,
        address:req.body.address,
        contact:req.body.contact,
        admin:req.body.admin,
        image:req.body.image,
    };
    if(req.body.image !== ""){
        const orgs= await Organization.findById(req.params.id);
        const imageId = orgs.image.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.image,{
            folder: "Org images",
        });
        newOrgData.image = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
       }

    const orgs = await Organization.findByIdAndUpdate(req.params.id,newOrgData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true 
    }); 
});

exports.getAllOrganization = catchAsyncErrors(async(req,res,next)=>{

    const orgs = await Organization.find();
    res.status(200).json({
        success:true,
        orgs,
    });
});

exports.deleteOrganization = catchAsyncErrors(async(req, res, next)=>{
   
    const orgs = await Organization.findById(req.params.id);
    if(!orgs){
      return next(new Errorhandler("Organization does not exist with Id : " + req.params.id));
    }
    for(let i = 0; i< orgs.image.length;i++){
      await cloudinary.v2.uploader.destroy(orgs.image[i].public_id)
    }

    await orgs.deleteOne();
    
  
      res.status(200).json({
          success:true,
          message:"Organization deleted successfully"
      }); 
  });
// get job details
exports.getOrgDetail = catchAsyncErrors(async(req,res, next)=>{
  const organization = await Organization.findById(req.params.id);
  if(!organization){
    return next(new Errorhandler("job not found", 404));
  }
  res.status(200).json({
    success:true,
    organization
  })
})

