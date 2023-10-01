const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/usermodel");
const sendToken= require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");



// register a user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: "avatars",
        width: 150,
        height: 150,
        crop: "scale",

    }); 
    const {name , email, phone, password}= req.body;
    
    const user= await User.create({
        name,email,password,phone,
        avatar:{
            public_id:myCloud.public_id,
            url: myCloud.secure_url,
        }
    });
    
    sendToken(user,201,res)
});
// login user
exports.loginUser = catchAsyncErrors(async ( req , res , next)=>{
    const {  email,password} = req.body;
    // checking if user has given password and email both
    if(!email || !password){
        return next(new Errorhandler("please Enter Email & Password",400))
    }
    const user = await User.findOne({email}).select("+password"); 
    if(!user){
        return next(new Errorhandler("invalid email or password",401));
        
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new Errorhandler("invalid email or password",401));
    }
    sendToken(user,200,res);
})

//logout user
exports.logOut = catchAsyncErrors(async (req,res,next)=>{
    
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true,
    })
    
    
    res.status(200).json({
        success: true,
        message: "logged Out", 
    })
})
// forgot password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user= await User.findOne({email:req.body.email});
    if(!user){
        return next(new Errorhandler("user not found",404));
    }
    // getreset password token  
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave:false});
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl}\n\n If you have not requested this email then , please ignore it `;
    try{
        await sendEmail({
            email:user.email,
            subject:"Your Jobhunt Account Password Recovery Mail",
            message,
        });
        res.status(200).json({
            success: true,
            message: "Email sent to " +user.email+ " successfully",
            url: resetPasswordUrl,
        })
  
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new Errorhandler(error.message, 500));
    }
});

//reset password

exports.resetPassword = catchAsyncErrors(async (req, res, next)=>{
    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt : Date.now() } 
     
    });
    if(!user){
        return next(new Errorhandler("Reset password token is Invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new Errorhandler("Password does not match",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);

});

// get user detail
 
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});
// update user password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next (new Errorhandler("Old Password is Incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next (new Errorhandler("password does not match",400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
    
});
// update user details
exports.updateUserProfile = catchAsyncErrors(async(req,res,next)=>{
   
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
      
    };
    if(req.body.avatar !== ""){
        const user= await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: "avatars",
            width: 150,
            height: 150,
            crop: "scale",
    
        });
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
       }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true 
    }); 
});

// get all users access by admin

exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{

    const users = await User.find();
    res.status(200).json({
        success:true,
        users,
    });
});
// get single user detail access by admin
exports.getAUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new Errorhandler("user does not exist with Id : "+ req.params.id));
    }

    res.status(200).json({
        success:true,
        user,
    });
});

// update user details by admin like role
exports.updateUser = catchAsyncErrors(async(req,res,next)=>{
   
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
        
    };
    await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
    }); 
});

// Delete a user account -- admin 
exports.deleteUser = catchAsyncErrors(async(req, res, next)=>{
   
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new Errorhandler("user does not exist with Id : " + req.params.id));
  }
  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);
  
  await user.deleteOne();

    res.status(200).json({
        success:true,
        message:"user deleted successfully"
    }); 
});

