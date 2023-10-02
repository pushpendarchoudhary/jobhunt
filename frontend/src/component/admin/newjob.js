import React, { Fragment, useEffect, useState } from "react";
import './newjob.css'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createJob } from "../../redux/actions/jobAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import WorkIcon from '@material-ui/icons/Work';
import SideBar from "./Sidebar";
import { NEW_JOB_RESET } from "../../redux/constants/jobconstant";
import { useNavigate } from "react-router-dom";

const NewJob = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newJob);

  const [jobtitle, setJobtitle] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState(0);
  const [posts, setPosts] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [benefits, setBenefits] = useState("");
  const [apply, setApply] = useState("");
  const [pathway, setPathway] = useState("");

  const navigate= useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Job Created Successfully");
      navigate("/admin/dashboard");
     dispatch({ type: NEW_JOB_RESET }); 
    }
  }, [dispatch, alert, error, navigate, success]);

  const createJobSubmitHandler = (e) => {
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
    dispatch(createJob(myForm));
  };

  const createJobImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImage([]);
    setImagePreview([]);

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
      <MetaData title="Create JOB" />
      <div className="dashboard">
        <SideBar />
        <div className="newJobContainer">
          <form
            className="createJobForm"
            encType="multipart/form-data"
            onSubmit={createJobSubmitHandler}
          >
            <h1>Create Job</h1>

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
                onChange={createJobImagesChange}
                multiple
              />
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
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewJob;