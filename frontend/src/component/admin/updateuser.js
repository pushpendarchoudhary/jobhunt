import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../redux/constants/userconstant";
import {getUserDetails, updateUser, clearErrors,} from "../../redux/actions/userAction";
import Loader from "../layout/loader/loader";
import { useNavigate, useParams } from "react-router-dom";
import './newjob.css';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  

  const { id } = useParams();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else if(user) {
      setName( user.name);
      setEmail(user.email);
      setRole(user.role);
      setPhone(user.phone);
      
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
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("role", role);
    myForm.append("phone", phone);
  
    dispatch(updateUser(id, myForm));
  };

  return (
    <Fragment>
      {loading ? <Loader/> : <div><MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newJobContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createJobForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="text"
                  placeholder="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="organization">Organization</option>
                </select>
              </div>

              <Button
                id="createJobBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update 
              </Button>
              
            </form>
          )}
        </div>
      </div> </div> }
      
    </Fragment>
  );
};

export default UpdateUser;