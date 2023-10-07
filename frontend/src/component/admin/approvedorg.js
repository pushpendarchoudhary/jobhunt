import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import './newjob.css'
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import ClearIcon from '@mui/icons-material/Clear';
import SideBar from "./Sidebar";
import { getAllOrganizations, clearErrors , deleteOrganization } from "../../redux/actions/orgactions";
import { UPDATE_USER_RESET } from "../../redux/constants/userconstant";
import { DELETE_ORG_RESET } from "../../redux/constants/orgconstants";
import Loader from "../layout/loader/loader";

const ApprovedOrgsList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { users } = useSelector((state)=> state.allUsers);

  const {loading, error, organizations } = useSelector((state) => state.allOrgs);

  const { 
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  let role = "organization";

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.orgdelete);

  const deleteOrgHandler = (id) => {
    dispatch(deleteOrganization(id));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Org Updated Successfully");
      navigate("/admin/orgs");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError]);


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
      alert.success(message);
      navigate("/admin/orgs");
      dispatch({ type: DELETE_ORG_RESET });
    }

    dispatch(getAllOrganizations());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);



  const columns = [
    { field: "id", headerName: "Org ID", minWidth: 180 , flex: 0.8 },
    {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 0.5,
        },
    {
      field: "industry",
      headerName: "Industry",
      minWidth: 200,
      flex: 1,
    },
    

    {
      field: "registrationNO",
      headerName: "Registration No",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "requestedBy",
      headerName: "Created By",
      minWidth: 150,
      flex: 0.3,
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
            {loading ? <Loader/> : <div>
            <Button 
              onClick={() =>
                deleteOrgHandler(params.row.id)
              }
            >
              <ClearIcon />
            </Button></div>}
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  organizations &&
    organizations.forEach((item) => {
      const user = users.find(user => user._id === item.requestedBy)

        if (user && user.role === "organization") {
          rows.push({
        id: item._id,
        industry: item.industry,
        registrationNO: item.registrationNumber,
        name: item.name,
        requestedBy: item.requestedBy,
         });
        }
    });
    
  return (
    <Fragment>
      <MetaData title={`ALL OrgS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="JobListContainer">
          <h1 id="JobListHeading">Approved Orgs</h1>
          

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

export default ApprovedOrgsList;