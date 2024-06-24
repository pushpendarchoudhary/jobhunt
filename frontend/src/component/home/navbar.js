import React, {useState} from "react";
import './navbar.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar =()=>{
    const {isAuthenticated} = useSelector((state)=>state.user);
    
      const [isMenuActive, setMenuActive] = useState(false);
    
      const toggleMenu = () => {
        setMenuActive(!isMenuActive);
      }
    return (
      
      <div className="page-wrapper">
        <div className="nav-wrapper">
            <nav className="navbar">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png" alt="Company Logo"/>
              <div className={`menu-toggle ${isMenuActive ? 'is-active':``}`} onClick={toggleMenu} id="mobile-menu">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
          </div>
      <ul className={`nav no-search ${isMenuActive?'is-active':''}`}>
      <li className="nav-item"><Link to="/">Home</Link></li>
            <li className="nav-item"><Link to="/about">About</Link></li>
            <li className="nav-item"><Link to="/jobss">AllJobs</Link></li>
            {isAuthenticated ?
              <li className="nav-item"></li> :
              <li className="nav-item"><Link to="/login">Login/Signup</Link></li>
            }
        
      </ul>
    </nav>
    
    </div>
  </div>
    )
}

export default Navbar;