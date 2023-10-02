import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../admin/joblist.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteResume,
  getResumes,
} from "../../redux/actions/jobAction";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar2 from "../admin/Sidebar2";
import { DELETE_RESUME_RESET } from "../../redux/constants/jobconstant";

const ApplicantsList = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEdit = (id) => {
    setSelectedRow(id);
  }

  const alert = useAlert();

  const { error, resumes } = useSelector((state) => state.resumeList);

   const { error: deleteError, isDeleted } = useSelector((state) => state.resumeActions);
  
  const deleteResumeHandler = (id) => {
    dispatch(deleteResume(id));
  };
  const navigate = useNavigate();

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
      alert.success("Resume Deleted Successfully");
      navigate("/org/dashboard");
      dispatch({ type: DELETE_RESUME_RESET });
    }

    dispatch(getResumes(id));
  }, [dispatch, navigate, error, isDeleted, deleteError, alert, id]);
  
  const columns = [
    { field: "id", headerName: "No", minWidth: 200, flex: 0.5 },

    { field: "name", headerName: "Name", minWidth: 200, flex: 0.5 },

    {
      field: "Email",
      headerName: "Email",
      minWidth: 150,
      maxWidth: 160,
      flex: 1,
    },
    {
      field: "Contact",
      headerName: "Contact",
      minWidth: 200,
      flex: 0.3,
    },

    {
      field: "resume",
      headerName: "Resume Link",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params)=> (
        <a href={params.value} target="_blank" rel="noopener noreferrer">View Resume</a>
      )
      
    },
    
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {

        const id = params.getValue(params.id, "id");
        const isSelected = id=== selectedRow;
        return (
          <Fragment>
           <Button onClick={()=> handleEdit(id)} style={{ color: isSelected ? 'blue':'black'}}><EditIcon /></Button>
              
            <Button
              onClick={() =>
                deleteResumeHandler(id)
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
  const num = 0;
  if(num===0){
    resumes &&
    resumes.forEach((item) => {
        rows.push({
        id:item._id,
        name: item.name,
        Email: item.email,
        Contact: item.contact,
        resume: item.pdf.url,
      })
    })
  }
  
  
  

  return (
    <Fragment>
      <MetaData title={`ALL JobS - Admin`} />

      <div className="dashboard">
        <Sidebar2 />
        <div className="JobListContainer">
          <h1 id="JobListHeading">ALL Applications</h1>

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

export default ApplicantsList;