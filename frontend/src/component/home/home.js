import React from  "react";
import './home.css';
import Search from  '../jobcomponent/search';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = ()=>{
    const navigate = useNavigate();
    const registerRequestToggle=()=>{
        navigate("/org/register/request");
    }

    const {user} = useSelector((state)=>state.user);
   
    return(
        <div>
        <div className="homemain">
            <div className="secondary">
            <div className="sectiondiv">
                <div className="item">
                    <h1 className="homeheading">Welcome to JOB<span>HUNT</span> </h1>
                    <p className="p1"> Your Gateway to <span>Opportunity</span> and <span>Clarity</span> Welcome to JOBHUNT, your all-inclusive online platform designed to empower individuals in their journey towards meaningful and fulfilling careers. Whether you're a recent graduate, a seasoned professional looking for a change, or someone exploring new career avenues, our website is your ultimate companion in discovering job opportunities and gaining invaluable insights into your career choices.</p>
                    
                </div>
                <div className="item">
                <div className="">
                    <h2 className="homeheading" >Heyy! You are searching for Something </h2>
                    <p className="p1" ><Search /></p>
                    </div>
                    
                    { Boolean(user && user.role === "user")?<div className=""> 
                    <h2 className="homeheading" >Register as an Organization </h2>
                    <button onClick={registerRequestToggle} className="btn btn-primary register_button" >Register</button>
                    </div>:<div></div>}
                </div>
            </div>
            </div>
        </div>
        </div>
    )
    }



export default Home;