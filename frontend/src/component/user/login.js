import React, { Fragment , useState, useEffect} from "react";
import './login.css';
import Loader from "../layout/loader/loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {useDispatch, useSelector } from "react-redux";
import {clearErrors, login } from "../../redux/actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";



 const Login = ()=>{

    const dispatch = useDispatch();
    const alert= useAlert();
    const {error, loading , isAuthenticated } = useSelector((state)=> state.user);
    
    const [loginEmail, setLoginEmail ] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const navigate=useNavigate();
    
    const loginSubmit = (e)=> {
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword));
    }
    
    useEffect(()=> {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isAuthenticated){
            navigate("/");
        }
    },[dispatch, alert, error, isAuthenticated, navigate]);
    return(
        <Fragment>
            {loading?<Loader/>: <Fragment>
            <div className="container01">
    <div className="row loginmain">
        <div >
            <div className=" panel border bg-white">
                <div className="Loginbox">
                    <h3 className="pt-3 font-weight-bold jobhead">JOB<span className="hunt">HUNT</span></h3>
                    <p className="panel-headingmain">LOGIN</p>
                </div>
                <div className="panel-body p-3">
                    <form className='loginform' onSubmit= {loginSubmit} >
                        <div className="form-group py-2">
                            <div className="input-field-div"> 
                            <MailOutlineIcon /> 
							<input className="inputF" type="email" placeholder="Email" required value={loginEmail} onChange={(e)=> setLoginEmail(e.target.value)}/> 
                            </div>
                        </div>
                        <div className="form-group py-1 pb-2">
                            <div className="input-field-div">
                            <LockOpenIcon />
							<input className="inputF" type={showPassword ? "text":"password"} placeholder="Enter your Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required/> 
                            <button  type="button" className="btn bg-white" onClick={handleTogglePasswordVisibility}> {showPassword ?  <VisibilityIcon/>:<VisibilityOffIcon />  }  </button>
                            </div>
                        </div>
						<div className="loginbutton "><button className="loginbutton2 btn btn-primary btn-lg btn-block mt-7" >LOGIN</button></div>
                        <div className="form-inline formclass">
							 <input type="checkbox" name="remember" id="remember"/> 
							 <label htmlFor="remember" className="text-muted">Remember me</label> 
							 <Link to={`/password/forgot`} id="forgot" className="font-weight-bold">Forgot password?</Link> </div>
                        
                        <div className="text-center pt-4 text-muted">Don't have an account? <a href="http://localhost:3000/signup">Sign up</a> </div>
                    </form>

                    
                    
                </div>
                <div className="mx-3 my-2 py-2 bordert">
                    <div className="text-center py-3"> <a href="https://wwww.facebook.com" target="_blank" className="px-2"> <img className="logo" src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg" alt=""/> </a> <a href="https://www.google.com" target="_blank" className="px-2"> <img className="logo" src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt=""/> </a> <a href="https://www.github.com" target="_blank" className="px-2"> <img className="logo" src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png" alt=""/> </a> </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </Fragment>}
        </Fragment>
    )
}
export default Login;