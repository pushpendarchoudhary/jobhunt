import React, { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/actions/userAction.js";
import MetaData from "../layout/MetaData.js";
import { getAdminJobs } from "../../redux/actions/jobAction.js";
import { getAllOrganizations } from "../../redux/actions/orgactions.js";
import Loader from "../layout/loader/loader.js";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { loading, jobs } = useSelector((state) => state.jobs);

  const { users } = useSelector((state) => state.allUsers);

  const { organizations } = useSelector((state)=> state.allOrgs);


  useEffect(() => {
    dispatch(getAdminJobs());
    dispatch(getAllUsers());
    dispatch(getAllOrganizations());
  }, [dispatch]);


  return (
    <Fragment>
      {loading ? <Loader/>:<div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link to="/admin/jobs" className="links">
              <p className="homa">Jobs</p>
              <p className="homa">{jobs && jobs.length}</p>
            </Link>
            
            <Link to="/admin/users" className="links">
              <p className="homa">Users</p>
              <p className="homa">{users && users.length}</p>
            </Link>
            
            <Link to="/admin/orgs" className="links">
              <p className="homa">Organizations</p>
              <p className="homa">{organizations && organizations.length}</p>
            </Link>
            
          </div>
        </div>
      </div>
    </div> }
    </Fragment>
    
  );
};

export default Dashboard;