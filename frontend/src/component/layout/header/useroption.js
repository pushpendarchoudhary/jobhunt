import React, { Fragment,useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import './useroption.css';

const UserOptions = ({user})=>{

    const[Open, setOpen] = useState(false);
    
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <PersonIcon />, name: "Profile", func:account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
      ];

      if(user.role==="admin"){
        options.unshift({
            icon:<DashboardIcon />,
            name:"Dashboard",
            func: Dashboard,
        });
      }
      if(user.role==="organization"){
        options.unshift({
            icon:<DashboardIcon />,
            name:"Dashboard",
            func: Dashboard2,
        });
      }
      const navigate = useNavigate();

      function Dashboard(){ 
          navigate("/admin/dashboard");
      }

      function Dashboard2(){
          navigate("/org/dashboard");
      }

      function account(){
          navigate("/account");
      }
      
      function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully");
      }

      return(
        <Fragment>
          <Backdrop open={Open} style={{zIndex: "10"}} />
           <SpeedDial ariaLabel="SpeedDial tooltip example"
           onClose={()=> setOpen(false)}
           onOpen={()=>setOpen(true)}
           open={Open}

           direction="down" 
           className="speedDial"
           
           icon={<img  className="speeddialicon" src ={user.avatar.url ? user.avatar.url : "/Profile.png"} alt = "profile"/>} >
             {options.map((item)=>(
                <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>

             ))}
            
            
            </SpeedDial>
        </Fragment>

    )
}

export default UserOptions;