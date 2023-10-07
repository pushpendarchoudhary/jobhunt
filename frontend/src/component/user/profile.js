import React, { Fragment, useEffect} from "react";
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader/loader";
import { Link } from "react-router-dom";
import './profile.css';

const  Profile = ()=>{
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated === false) {
        navigate("/login");
      }
    }, [navigate, isAuthenticated]);
    return(
        <Fragment>
            {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            
            <div>
              <Link to ="/">Home</Link>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
              
            </div>
            <div >
              
              <div className="happy">
                  <div >
                      <h4>Name</h4>
                      <p>{user.name}</p>
                  </div>
                  <div >
                    <h4>Email</h4>
                    <p>{user.email}</p>
                  </div>
                  <div >
                    <h4>Phone</h4>
                    <p>{user.phone}</p>
                  </div>
                  <div >
                    <h4>Joined On</h4>
                    <p>{String(user.CreatedAt).substr(0, 10)}</p>
                  </div>


              </div>
              
              <div>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
        </Fragment>
    )

}

export default Profile;