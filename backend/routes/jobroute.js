const express = require("express");
const { getallJobs, createJob ,updateJobs, deleteJobs, getJobDetails,getAdminJobs, UploadResume } = require("../controller/jobcontroller"); //this line imports the getallJobs function from the 'jobcontroller.js' file located in a controller folder in parent directory
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router(); //the router object allows you to define routes and their associated handlers
router.route("/jobs").get(getallJobs);
router.route("/admin/jobs").get(isAuthenticatedUser,authorizeRoles("admin", "organization"), getAdminJobs);
 // this line defines a route handler for the GET method on the "/jobs" path. It uses the 'router.route()' method to specify the route path("/jobs"), and '.get()'method to define the handler function('getallJobs')
router.route("/admin/job/new").post(isAuthenticatedUser, authorizeRoles("admin", "organization") , createJob);
router.route("/admin/job/:id").put(isAuthenticatedUser, authorizeRoles("admin", "organization"), updateJobs).delete(isAuthenticatedUser,authorizeRoles("admin", "organization"), deleteJobs);
router.route("/job/:id").get(getJobDetails);
router.route("/uploadresume").post( isAuthenticatedUser, UploadResume);

module.exports = router;