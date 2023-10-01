import React from "react";
import { Link } from "react-router-dom";
import './job.css';

const Job = ({ job }) => {
    return (
            <div className="job_search_main">
            <Link to = {`/job/${job._id}`}>      
            <div className="job_search_div">

                         <h1 className="jobheading">
                         <Link className= "jobcard" to = {`/job/${job._id}`}>  <span className="span"> {job.jobtitle}</span> </Link>
                         </h1>                 
                         <p><span className="span">{String(job.description).substr(0,200)}</span></p>                       
                        <p className="span2">Posted ON : {String(job.createdAt).substr(0,10)}</p>
          
           </div>  </Link>
            </div>

           
    )    
};

export default Job;