import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./joblist.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminJobs,
  deleteJob,
} from "../../redux/actions/jobAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_JOB_RESET } from "../../redux/constants/jobconstant";

const JobList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, jobs } = useSelector((state) => state.jobs);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.job
  );
  const {user} = useSelector((state)=>state.user);
  const userId = user._id;
  const deleteJobHandler = (id) => {
    dispatch(deleteJob(id));
  }; 
  const navigate = useNavigate();
  const handleViewApplications = (id)=> {
    navigate(`/org/resume/${id}`)
  }
  

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Job Deleted Successfully");
      navigate("/org/dashboard");
      dispatch({ type: DELETE_JOB_RESET });
    }

    dispatch(getAdminJobs());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Job ID", minWidth: 200, flex: 0.5 },

    {
      field: "jobtitle",
      headerName: "Job Title",
      minWidth: 150,
      maxWidth: 160,
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "createdBy",
      minWidth: 200,
      flex: 0.3,
    },

    {
      field: "createdAt",
      headerName: "CreatedAt",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "ViewApplicants",
      flex: 0.3,
      headerName: "View Applicants",
      minWidth:150,
      sortable: false,
      renderCell: (params) => (
        <Button onClick={()=> handleViewApplications(params.getValue(params.id, "id"))}>Applications</Button>
      ),
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/org/job/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteJobHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  if(user.role==="organization"){
    jobs &&
    jobs.forEach((item) => {
      if(item.createdBy === userId){ 
        rows.push({
        id: item._id,
        jobtitle: item.jobtitle,
        createdBy: item.createdBy,
        createdAt: String(item.createdAt).substr(0,10),
      });}
     
    });
  }
  if(user.role==="admin"){
    jobs &&
    jobs.forEach((item) => {
        rows.push({
        id: item._id,
        jobtitle: item.jobtitle,
        createdBy: item.createdBy,
        createdAt: String(item.createdAt).substr(0,10),
      });
     
    });
  }
  
  

  return (
    <Fragment>
      <MetaData title={`ALL JobS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="JobListContainer">
          <h1 id="JobListHeading">ALL Jobs</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="JobListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default JobList;