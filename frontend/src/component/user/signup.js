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

    const {error,loading, isAuthenticated} = useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const alert = useAlert();
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",

    });
    

    const { name , email, password, phone} = user;
    const [avatar, setavatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("phone", phone);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
        
    };

    const registerDataChange = (e) => {
        if(e.target.name=== "avatar") {
            const reader = new FileReader();

            reader.onload=()=>{
                if(reader.readyState === 2 ){
                    setAvatarPreview(reader.result);
                    setavatar(reader.result);
                }
            };

        reader.readAsDataURL(e.target.files[0]);

        }else {
            setUser({...user, [e.target.name]: e.target.value });
        }
    }

    const navigate=useNavigate();
    useEffect(()=> {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isAuthenticated){
            navigate("/account");
        }
    },[dispatch, alert, error, isAuthenticated, navigate]);
 
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
                            <FaceIcon /> <input className="inputF" type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange} />
                        </div>

                        <div className="input-field-div">
                        <MailOutlineIcon />
                        <input className="inputF" type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange}/> 
                        </div>
                        <div className="input-field-div">
                        <MailOutlineIcon />
                        <input className="inputF" type="tel" placeholder="Phone No" required name="phone" value={phone} onChange={registerDataChange}/> 
                        </div>
                        <div className="input-field-div">
                        <LockOpenIcon />
                            <input className="inputF"
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="registerImage " >
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                                className="btn"
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
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










