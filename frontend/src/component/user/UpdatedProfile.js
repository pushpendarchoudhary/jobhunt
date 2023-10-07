import React, { Fragment, useState, useEffect } from "react";
import "./UpdatedProfile.css";
import Loader from "../layout/loader/loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../redux/actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userconstant";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [user1, setUser]= useState({
    name:"",
    email:"",
    phone:"",
    file:null,
  })
  const [filePreview, setfilePreview] = useState("/Profile.png");

  const handleChange = (event) => {
    const {name, value}= event.target;
    setUser({...user1, [name]: value});
  }

  const registerDataChange = (e) => {
    
    const reader = new FileReader();

    reader.onload=()=>{
        if(reader.readyState === 2 ){
            setfilePreview(reader.result);
            
        }
    }
    reader.readAsDataURL(e.target.files[0]);
const selectedFile = e.target.files[0];
if(selectedFile){
    setUser({...user1, file: selectedFile});
    
}

}
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    
    myForm.append("name", user1.name);
    myForm.append("email", user1.email);
    myForm.append("phone", user1.phone);
    myForm.append("file", user1.file);
    
    dispatch(updateProfile(myForm));
  };

  
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setUser({name: user.name});
      setUser({email: user.email});
      setUser({phone: user.phone});
      setfilePreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={user1.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={user1.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="text"
                    placeholder="Phone no"
                    required
                    name="phone"
                    value={user1.phone}
                    onChange={handleChange}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={filePreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;