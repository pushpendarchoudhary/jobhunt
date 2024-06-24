// import React, { Fragment, useEffect} from 'react';
// import { clearErrors, getJobDetails } from '../../redux/actions/jobAction';
// import { Link, useParams } from 'react-router-dom'
// import './jobdetail.css';
// import { useSelector, useDispatch } from 'react-redux';
// import Carousel from "react-material-ui-carousel";
// import Loader from "../layout/loader/loader";
// import { useAlert } from 'react-alert';

// const JobDetails = ( )=>{
//     const {id} = useParams();
//     const alert= useAlert();
//     const dispatch = useDispatch();
//     const {jobs, loading, error} = useSelector((state)=> state.jobDetails);
//     useEffect(()=> {
//         if(error){
//           alert.error(error);
//           dispatch(clearErrors())
//         }

//         dispatch(getJobDetails(id));
//     },[dispatch, id, error, alert ]);
  

//     return (
//         <Fragment>
//           {loading ? (<Loader/>):(
//           <div className='mainDiv'>
//             <div className="carousel">
//               <div className='jobtitleblock item_jobdetail '>
//                       <h2 className='job_title_heading'>{jobs.jobtitle}</h2>
//                       <p className='descr'>{jobs.description} </p>
//                 </div>
//                 <div className='item_jobdetail'>
//                 <Carousel>
//                 {jobs.image &&
//                   jobs.image.map((item,i) => (
//                     <img
//                       className="CarouselImage d-block w-100 img-fluid"
//                       key={i}
//                       src={item.url}
//                       alt={`${i} Slide`}
//                     />
//                   ))}
//               </Carousel></div>
              
//             </div>
            
//             <div className='jobdetailblock'>
//                     <div className='otherdetailblock'>
//                       <h3>DEPARTMENT</h3>
//                       {jobs && jobs.department && jobs.department.split('\n').map((post, index) => (
//                       <p key={index}>{post}</p>
//                         ))}
//                     </div>
//                     <div className='otherdetailblock'>
//                       <h3>SALARY</h3>
//                       <p>{jobs.salary}</p>
//                     </div>
//                     <div className='otherdetailblock'>
//                       <h3>POST/RANK</h3>
//                       {jobs && jobs.posts && jobs.posts.split('\n').map((post, index) => (
//                       <p key={index}>{post}</p>
//                         ))}
//                     </div>
//                     <div className='otherdetailblock'>
//                       <h3>REQUIREMENTS</h3>
//                       {jobs && jobs.requirements && jobs.requirements.split('\n').map((post, index) => (
//                       <p key={index}>{post}</p>
//                         ))}
//                     </div>
//                     <div className='otherdetailblock'>
//                       <h3>RESPONSIBILITIES</h3>
//                       {jobs && jobs.responsibilities && jobs.responsibilities.split('\n').map((post, index) => (
//                       <p key={index}>{post}</p>
//                         ))}
//                     </div>
//                     <div className='otherdetailblock'>
//                       <h3>BENEFITES</h3>
//                       {jobs && jobs.benefits && jobs.benefits.split('\n').map((post, index) => (
//                       <p key={index}>{post}</p>
//                         ))}
//                     </div>
//                     <div className='otherdetailblock'>
//                       <h3>HOW TO APPLY</h3>
//                       <p>{jobs.apply}</p>
//                     </div>
//                     <div className='otherdetailblock'>
//                       <h3>ROADMAP</h3>
//                       <p>{jobs.pathway}</p>
//                     </div>
//                     <div className='otherdetailblock'>
//                       <Link to= {`/job/apply/${id}`}>
//                         <button className='applybutton'> Apply </button>
//                       </Link>
//                     </div>
//             </div>
            
//             </div>
//     )}
//                 </Fragment>
//     )
// }

// export default JobDetails;