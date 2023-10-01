import React, { useEffect, useState} from "react";
import Sidebar2 from "./Sidebar2.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData.js";
import { getAdminJobs } from "../../redux/actions/jobAction.js";

const Dashboard2 = () => {
  const dispatch = useDispatch();

  const { jobs } = useSelector((state) => state.jobs);
  const {user} = useSelector((state)=>state.user);
  const userId = user._id;

  let totaljobs = 0;
  const job= [];
  if(user.role==="admin"){
    totaljobs= jobs? jobs.length :0;
  }else {
    if(user.role==="organization"){
      jobs &&
      jobs.forEach((item) => {
        if(item.createdBy === userId){ 
          job.push({name : item.jobtitle});}
       
      });
    }
    
    totaljobs =job.length;
  }


  useEffect(() => {
    dispatch(getAdminJobs());
  }, [dispatch]);


  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar2 />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link to="/org/jobs" className="links">
              <p className="homa">Jobs</p>
              <p className="homa">{totaljobs}</p>
            </Link>
            
            <Link to="/admin/users" className="links">
              <p className="homa">Applicants</p>
            </Link>
            
            <Link to="/admin/orgs" className="links">
              <p className="homa">Approved</p>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2