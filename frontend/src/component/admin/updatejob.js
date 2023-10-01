import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateJob,
  getJobDetails,
} from "../../redux/actions/jobAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from "@material-ui/icons/Description";
import WorkIcon from '@material-ui/icons/Work';
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import SideBar from "./Sidebar";
import { UPDATE_JOB_RESET } from "../../redux/constants/jobconstant";
import { useNavigate, useParams } from "react-router-dom";

const UpdateJob = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, jobs } = useSelector((state) => state.jobDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.job);

  const [jobtitle, setJobtitle] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState(0);
  const [posts, setPosts] = useState("");
  const [image, setImage] = useState([]);
  const [oldimage,setOldimage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [benefits, setBenefits] = useState("");
  const [apply, setApply] = useState("");
  const [pathway, setPathway] = useState("");

  

  const {jobId}= useParams();

  const navigate= useNavigate();
  useEffect(() => {
    if (jobs && jobs._id !== jobId) {
      dispatch(getJobDetails(jobId));
    } else {
      setJobtitle(jobs.jobtitle);
      setDescription(jobs.description);
      setDepartment(jobs.department);
      setSalary(jobs.salary);
      setPosts(jobs.posts);
      setRequirements(jobs.requirements);
      setResponsibilities(jobs.responsibilities);
      setBenefits(jobs.benefits);
      setApply(jobs.apply);
      setPathway(jobs.pathway);
      setOldimage(jobs.image);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Job Updated Successfully");
      navigate("/admin/jobs");
      dispatch({ type: UPDATE_JOB_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    jobId,
    jobs,
    updateError,
  ]);

  const updateJobSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("jobtitle", jobtitle);
    myForm.set("department", department);
    myForm.set("description", description);
    myForm.set("salary", salary);
    myForm.set("posts", posts);
    myForm.set("requirements", requirements);
    myForm.set("responsibilities", responsibilities);
    myForm.set("benefits", benefits); 
    myForm.set("apply", apply);
    myForm.set("pathway", pathway);

    image.forEach((image) => {
      myForm.append("image", image);
    });
    dispatch(updateJob(jobId, myForm));
  };

  const updateJobImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImage([]);
    setImagePreview([]);
    setOldimage([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImage((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Update Job" />
      <div className="dashboard"> 
        <SideBar />
        <div className="newJobContainer">
          <form
            className="createJobForm"
            encType="multipart/form-data"
            onSubmit={updateJobSubmitHandler}
          >
            <h1>Update Job - {jobtitle} </h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Job Title"
                required
                value={jobtitle}
                onChange={(e) => setJobtitle(e.target.value)}
              />
            </div>
            <div>
              <WorkIcon />
              <input
                type="text"
                placeholder="Department/Field"
                required
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Job Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
                <CurrencyRupeeIcon/>
            <input
                type="number"
                placeholder="Salary /month"
                required
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <div>
              <StorageIcon />
              <input
                type="text"
                placeholder="posts/positions"
                required
                onChange={(e) => setPosts(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Qualification/Skills required"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Responsibilities"
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="benefits"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <DescriptionIcon />

              <textarea
                placeholder="How to apply"
                value={apply}
                onChange={(e) => setApply(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Pathway"
                value={pathway}
                onChange={(e) => setPathway(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>


            <div id="createJobFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateJobImagesChange}
                multiple
              />
            </div>

            <div id="createJobFormImage">
              {oldimage &&
                oldimage.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Job Preview" />
                ))}
            </div>

            <div id="createJobFormImage">
              {imagePreview.map((image, index) => (
                <img key={index} src={image} alt="Job Preview" />
              ))}
            </div>

            <Button
              id="createJobBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateJob;