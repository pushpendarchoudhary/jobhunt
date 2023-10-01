import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import './newjob.css'
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams} from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import SideBar from "./Sidebar";
import { getAllOrganizations, clearErrors , deleteOrganization } from "../../redux/actions/orgactions";
import { updateUser } from "../../redux/actions/userAction";
import { UPDATE_USER_RESET } from "../../redux/constants/userconstant";
import { DELETE_ORG_RESET } from "../../redux/constants/orgconstants";

const OrgsList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, organizations } = useSelector((state) => state.allOrgs);

  const { 
    loading: updateLoading,
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

  const approveOrgHandler = (orgid) => {
    
    const myForm = new FormData();
    myForm.set("role", role)
    dispatch(updateUser(orgid, myForm));
};

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

        const orgId = params.row.requestedBy;
        return (
          <Fragment>

            <Button onClick={()=> approveOrgHandler(orgId)}><CheckIcon/></Button>
            

            <Button 
              onClick={() =>
                deleteOrgHandler(params.getValue(params.id, "id"))
              }
            >
              <ClearIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  organizations &&
    organizations.forEach((item) => {
      rows.push({
        id: item._id,
        industry: item.industry,
        registrationNO: item.registrationNumber,
        name: item.name,
        requestedBy: item.requestedBy,
      });
    });
    
  return (
    <Fragment>
      <MetaData title={`ALL OrgS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="JobListContainer">
          <h1 id="JobListHeading">ALL Orgs</h1>
          

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

export default OrgsList;