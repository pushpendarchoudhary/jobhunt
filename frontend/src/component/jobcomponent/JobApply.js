import React, { useState, useEffect, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import './jobapply.css';
import { useNavigate, useParams } from 'react-router-dom';
import {uploadResume, clearErrors} from '../../redux/actions/jobAction';
import { UPLOAD_RESUME_RESET } from '../../redux/constants/jobconstant';
import Loader from '../layout/loader/loader';

const UploadResume = () => {

  const {id}= useParams();
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    contact: '',
    file: null
  });
  const { loading, error, success} = useSelector((state)=>state.resumeList);
  const dispatch = useDispatch();
  const alert =  useAlert();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if(selectedFile)
    {setResumeData({...resumeData, file: selectedFile})};
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Resume uploaded Successfully");
      navigate(`/job/${id}`);
      dispatch({ type: UPLOAD_RESUME_RESET });
    }
  }, [dispatch, alert, error,id, navigate, success]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', resumeData.name);
    formData.append('email', resumeData.email);
    formData.append('contact', resumeData.contact);
    formData.append('file', resumeData.file);
    formData.append('appliedFor', id);

    dispatch(uploadResume(formData));

  
  };

  return (

    <Fragment>
      {loading? <Loader/> : <div>
      <form className="jobApplyForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={resumeData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={resumeData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="contact">Contact:</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={resumeData.contact}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="resume">Resume (PDF):</label>
        <input
          type="file"
          id="resume"
          name="resume"
          accept=".pdf"
          onChange={handleFileChange}
          multiple={false}
        />
      </div>
      <button type="submit">Upload Resume</button>
    </form>
        </div>}
    </Fragment>
    
  );
};

export default UploadResume;
