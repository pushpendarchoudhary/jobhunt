import React from "react";
import './home.css';
import Search from  '../jobcomponent/search';
import { useNavigate } from "react-router-dom";
const Home = ()=>{
    const navigate = useNavigate();
    const registerRequestToggle=()=>{
        navigate("/org/register/request");
    }
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
                    <img src="/career1.png" />
                </div>
            </div>
            <div className="sectiondiv">
                <div className="item">
                    <img src="/career1.png" />
                    </div>
                <div className="item">
                    <h2 className="homeheading" >Heyy! You are searching for Something </h2>
                    <p className="p1">The job search feature is designed to help users find relevant job listings based on their search criteria. Whether users are looking for a specific job title, location, industry, or keyword, this feature streamlines the process of finding suitable job opportunities.<br/><br/> Here is your helping hand !!!! <br/> <br/></p>
                    <p className="p1" ><Search /></p>
                    </div>
            </div>
            <div className="sectiondiv" >
                <div className="item">
                    <h2 className="homeheading" >Register as an Organization </h2>
                    <p className="p1">Send a request to be registered as an organization. Once we successfully verify you, we will provide you access of additional functionalities where you can post the job vacancies and hire employees for your Organization </p>
                    <button onClick={registerRequestToggle} className="btn btn-primary register_button" >Register</button>
                    </div>
                <div className="item">
                    <p className="p1">image2 will be here </p></div>
            </div>
            </div>
        </div>
        </div>
    )
    }



export default Home;