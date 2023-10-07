import axios from "axios";
import {ALL_JOBS_REQUEST, ALL_JOBS_SUCCESS, ALL_JOBS_FAIL, 
        JOB_DETAILS_REQUEST, JOB_DETAILS_SUCCESS,JOB_DETAILS_FAIL, CLEAR_ERROR,
        ADMIN_JOBS_FAIL,ADMIN_JOBS_REQUEST,ADMIN_JOBS_SUCCESS ,
        DELETE_JOB_FAIL,DELETE_JOB_REQUEST,DELETE_JOB_SUCCESS,
        NEW_JOB_FAIL, NEW_JOB_REQUEST,  NEW_JOB_SUCCESS,
        UPDATE_JOB_FAIL, UPDATE_JOB_REQUEST,  UPDATE_JOB_SUCCESS,
        UPLOAD_RESUME_FAIL, UPLOAD_RESUME_REQUEST, UPLOAD_RESUME_SUCCESS, 
        ALL_RESUME_REQUEST, ALL_RESUME_SUCCESS, ALL_RESUME_FAIL,
        DELETE_RESUME_FAIL, DELETE_RESUME_REQUEST, DELETE_RESUME_SUCCESS
        } from '../constants/jobconstant';


export const getJob = (keyword="")=> async (dispatch) => {
    try{
        dispatch({
            type: ALL_JOBS_REQUEST
        });

        let link = `/api/v1/jobs?keyword=${keyword}`;

        const { data }= await axios.get(link);
        
        dispatch({
            type: ALL_JOBS_SUCCESS,
            payload: data.jobs,
        });
    } catch (error) {
        dispatch({
            type: ALL_JOBS_FAIL,
            payload: error.response.data.message,
        });
    }
};
//GET JOB DETAILS
export const getJobDetails = (id)=> async (dispatch) => {
    try{
        dispatch({
            type: JOB_DETAILS_REQUEST
        });

        const { data }= await axios.get(`/api/v1/job/${id}`);
        
        dispatch({
            type: JOB_DETAILS_SUCCESS,
            payload: data.jobs,
        });
    } catch (error) {
        dispatch({
            type: JOB_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

//admin job get

export const getAdminJobs = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_JOBS_REQUEST });
  
      const { data } = await axios.get("/api/v1/admin/jobs");
  
      dispatch({
        type: ADMIN_JOBS_SUCCESS,
        payload: data.jobs,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_JOBS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  // DELETE JOB


  export const deleteJob = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_JOB_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/job/${id}`);
  
      dispatch({
        type: DELETE_JOB_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_JOB_FAIL,
        payload: error.response.data.message,
      });
    }
  };
// createJOb 
  export const createJob = (jobData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_JOB_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/admin/job/new`,
        jobData,
        config
      );
  
      dispatch({
        type: NEW_JOB_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_JOB_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const updateJob = (id, jobData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_JOB_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/api/v1/admin/job/${id}`,
        jobData,
        config
      );
  
      dispatch({
        type: UPDATE_JOB_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_JOB_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const uploadResume = (form) => async (dispatch) => {
    try {
      dispatch({ type: UPLOAD_RESUME_REQUEST });
  
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
  
      const { data } = await axios.post(
        `/api/v1/uploadresume`,
        form,
        config
      );
  
      dispatch({
        type: UPLOAD_RESUME_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPLOAD_RESUME_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  export const getAllresume = ()=> async (dispatch) => {
    try{
      dispatch({
          type: ALL_RESUME_REQUEST,
      });
     
       const {data}  = await axios.get(`/api/v1/resumes`);
      
 
      dispatch({
          type: ALL_RESUME_SUCCESS,
          payload: data,
      });
  } catch (error) {
      dispatch({
          type: ALL_RESUME_FAIL,
          payload: error.response.data.message,
      });
  }
  }
  export const getResumes = (id)=> async (dispatch) => {
    try{
        dispatch({
            type: ALL_RESUME_REQUEST,
        });
        
        const {data} = await axios.get(`/api/v1/resumes/${id}`);
      
        dispatch({
            type: ALL_RESUME_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_RESUME_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteResume = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_RESUME_REQUEST });

    const { data } = await axios.delete(`/api/v1/resumes/${id}`);

    dispatch({
      type: DELETE_RESUME_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_RESUME_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Clearing Errors
export const clearErrors = ()=> async (dispatch) => {
    dispatch({type : CLEAR_ERROR});
}