import React, { Fragment , useEffect } from 'react';
import "./job.css";
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, getJob} from "../../redux/actions/jobAction.js";
import Loader from "../layout/loader/loader.js";
import Job from './job.js'
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
const AllJobs =()=>{

    
    const alert = useAlert();
    const dispatch = useDispatch();
    const {jobs, loading, error, } = useSelector(state => state.jobs);
    const {keyword} = useParams();
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getJob(keyword));
    },[dispatch, keyword, alert, error])

    return (
        <Fragment>

            {loading ?<Loader/> : <Fragment>
           <div className='joblist'>
            {jobs &&
              jobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}       
                
           </div>
            
            </Fragment>

            }
        </Fragment>
    )
}

export default AllJobs;