import React ,{useEffect} from 'react';
import './App.css'
import { BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom";
import Footer from "./component/layout/footer/footer";
import Home from './component/home/home';
import JobDetails from './component/jobcomponent/jobDetails.js';
import AllJobs from './component/jobcomponent/alljobs.js'
import Login  from './component/user/login';
import Search from './component/jobcomponent/search';
import SignUp from './component/user/signup';
import UserOptions from './component/layout/header/useroption';
import store from "./redux/store/store";
import { loadUser } from './redux/actions/userAction';
import { useSelector } from 'react-redux';
import Profile from './component/user/profile';
import UpdatedProfile from './component/user/UpdatedProfile';
import UpdatePassword from './component/user/UpdatePassword';
import ForgotPassword from './component/user/ForgotPassword';
import ResetPassword from './component/user/ResetPassword';
import Dashboard from './component/admin/Dashboard';
import Loader from './component/layout/loader/loader';
import JobList from './component/admin/joblist';
import NewJob from './component/admin/newjob'
import UpdateJob from './component/admin/updatejob';
import UsersList from './component/admin/userslist';
import UpdateUser from './component/admin/updateuser';
import Navbar from './component/home/navbar';
import OrganizationList from './component/admin/organizationlist';
import OrgRegistration from './component/org/orgregistration.js';
import Dashboard2 from './component/admin/Dashboard2';
import JobApply from './component/jobcomponent/JobApply';





function App() {

  const {isAuthenticated, user, loading} = useSelector((state)=>state.user);

  useEffect(()=>{
    
      store.dispatch(loadUser());
    
  },[]);
  
  

  return (<Router>
            {isAuthenticated && <UserOptions user={user} />}
            <Navbar/>
            <Routes>
            
            <Route exact path='/' Component={Home} />
            <Route exact path='/job/:id' Component={JobDetails} />
            <Route exact path='/login' Component={ Login } />
            <Route exact path='/signup' Component={ SignUp } />
            <Route exact path='/jobss' Component={ AllJobs } />
            <Route path='/jobs/:keyword' Component={ AllJobs } />
            <Route exact path ='/search' Component={ Search }/>
            <Route exact path='/account' element={loading?<Loader/>:!isAuthenticated? (<Navigate to = '/login'/>) : <Profile/>}/> 
            <Route exact path='/me/update' element={loading?<Loader/>:isAuthenticated? <UpdatedProfile/> : <Navigate to = '/login'/>} />
            <Route exact path='/password/update' element={loading?<Loader/>:isAuthenticated? <UpdatePassword/> : <Navigate to = '/login'/>} />
            <Route exact path='/password/forgot' Component={ ForgotPassword } />
            <Route exact path='/password/reset/:token' Component={ResetPassword} />
            <Route exact path='/admin/dashboard' element={loading? <Loader/> :!isAuthenticated?(<Navigate to = '/login'/>):( user.role !=="admin")?(<Navigate to = '/login'/>) :<Dashboard/>}/>
            <Route exact path='/org/dashboard' element={loading? <Loader/> :!isAuthenticated?(<Navigate to = '/login'/>):( user.role !=="organization")?(<Navigate to = '/login'/>) :<Dashboard2/>}/>
            <Route exact path='/admin/jobs' element={loading?<Loader/> :!isAuthenticated?(<Navigate to = '/login'/>):( user.role !=="admin")?(<Navigate to = '/login'/>) :<JobList/>}/>
            <Route exact path='/admin/job' element={loading?<Loader/> :!isAuthenticated?(<Navigate to = '/login'/>):( user.role !=="admin")?(<Navigate to = '/login'/>) :<NewJob/>}/>
            <Route exact path='/admin/job/:id' element={loading?<Loader/> :!isAuthenticated?(<Navigate to = '/login'/>):( user.role !=="admin")?(<Navigate to = '/login'/>) :<UpdateJob/>}/>
            <Route exact path='/admin/users' element={loading?<Loader/> :!isAuthenticated?(<Navigate to = '/login'/>):( user.role !=="admin")?(<Navigate to = '/login'/>) :<UsersList/>}/>
            <Route exact path='/admin/user/:id' element={loading?<Loader/> :!isAuthenticated?(<Navigate to = '/login'/>):( user.role !=="admin")?(<Navigate to = '/login'/>) :<UpdateUser/>}/>
            <Route exact path='/admin/orgs' element={loading?<Loader/> :!isAuthenticated?(<Navigate to = '/login'/>):( user.role !=="admin")?(<Navigate to = '/login'/>) :<OrganizationList/>}/>
            <Route exact path='/org/register/request' element={loading?<Loader/> :!isAuthenticated?(<Navigate to = '/login'/>):( user.role !=="user")?(<Navigate to = '/login'/>) :<OrgRegistration/>}/>
            <Route exact path='/org/job' element={loading?<Loader/> :!isAuthenticated?(<Navigate to = '/login'/>):( user.role !=="organization")?(<Navigate to = '/login'/>) :<NewJob/>}/>
            <Route exact path='/org/jobs' element={loading?<Loader/> :!isAuthenticated?(<Navigate to = '/login'/>):( user.role !=="organization")?(<Navigate to = '/login'/>) :<JobList/>}/>
            <Route exact path='/org/job/:id' element={loading?<Loader/> :!isAuthenticated?(<Navigate to = '/login'/>):( user.role !=="organization")?(<Navigate to = '/login'/>) :<UpdateJob/>}/>
            <Route exact path='/job/apply/:id' element={loading? <Loader/> : !isAuthenticated?(<Navigate to = '/login'/>):(user.role !=="user")?(<Navigate to = '/login'/>) : <JobApply/>}/>
            </Routes>
        
            <Footer />
        </Router>
   
  );
}

export default App;
