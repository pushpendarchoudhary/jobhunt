import React, { Fragment , useState, useEffect} from "react";
import './login.css'
import Loader from "../layout/loader/loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from "@material-ui/icons/Face";
import { clearErrors, register } from "../../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";


 const SignUp = ()=>{

    const {error,loading,success, isAuthenticated} = useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const alert = useAlert();
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        file:null,
    });

    const [filepreview, setfilePreview]= useState(null);

   const handleChange = (event)=> {
    const {name, value} = event.target;
    setUser({...user, [name]: value});
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
        setUser({...user, file: selectedFile});
        
    }
    
}
    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.append('name', user.name);
        myForm.append('email', user.email);
        myForm.append('password', user.password);
        myForm.append('phone', user.phone);
        myForm.append('file', user.file);
        dispatch(register(myForm));
        
    };

    

    const navigate=useNavigate();
    useEffect(()=> {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(success) {
            alert.success(" Registered successfully");
        }
        if(isAuthenticated){
            navigate("/account");
        }
    },[dispatch, alert, error, success, isAuthenticated, navigate]);
 
    return(
        <Fragment>
            {loading? <Loader/> : <div className="container01">
    <div className="row loginmain">
        <div >
            <div className=" panel border bg-white">
                <div className="Loginbox">
                    <h3 className="pt-3 font-weight-bold jobhead">JOB<span className="hunt">HUNT</span></h3>
                    <p className="panel-headingmain" >SIGN UP </p>
                </div>
                <div className="panel-body p-3">
                <form className="signUpform "  encType="multipart/form-data" onSubmit={registerSubmit}>
                        <div className="signUpName input-field-div" >
                            <FaceIcon /> <input className="inputF" type="text" placeholder="Name" required name="name" value={user.name} onChange={handleChange} />
                        </div>

                        <div className="input-field-div">
                        <MailOutlineIcon />
                        <input className="inputF" type="email" placeholder="Email" required name="email" value={user.email} onChange={handleChange}/> 
                        </div>
                        <div className="input-field-div">
                        <MailOutlineIcon />
                        <input className="inputF" type="text" placeholder="Phone No" required name="phone" value={user.phone} onChange={handleChange}/> 
                        </div>
                        <div className="input-field-div">
                        <LockOpenIcon />
                            <input className="inputF"
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="registerImage " >
                            <img src={filepreview} alt="profilepic"></img>
                            <input
                                className="btn"
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={registerDataChange}
                                multiple={false}
                            />
                        </div>
                        <div className="loginbutton"><input className="btn btn-primary btn-lg btn-block mt-7" type="submit" value="Signup" /></div>
                    </form>

                    
                </div>
            </div>
        </div>
    </div>
</div>}
        </Fragment>
    )
}
export default SignUp;










