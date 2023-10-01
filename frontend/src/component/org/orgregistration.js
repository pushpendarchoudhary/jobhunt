import React, { Fragment, useEffect, useState } from "react";
import '../admin/newjob.js';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createOrgRequest } from "../../redux/actions/orgactions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import WorkIcon from '@material-ui/icons/Work';
import { NEW_ORG_RESET } from "../../redux/constants/orgconstants";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/loader/loader.js";

  const OrgRegistration = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newOrg);

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [registrationno, setRegistrationno] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState(""); // Corrected field name
  const [street, setStreet] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [lastname, setLastname] = useState("");
  const [email2, setEmail2] = useState("");
  const [contact, setContact]= useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
 


  const navigate= useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Request sent Successfully login again when approved");
      navigate("/");
      dispatch({ type: NEW_ORG_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const statesAndUTs = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry"
  ];

  const Industries =[
    
    "Information Technology(IT) and Software Development",
    "Pharmaceuticals and Biotechnology",
    "Automobiles and Automotive Components",
    "Banking and Finance",
   "Telecommunications",
    "Textiles and Garments",
    "Agriculture and Agribusiness",
    "Healthcare and Medical Services",
    "Energy(Renewable and Non-Renewable",
    "Tourism and Hospitality",
    "Real Estate and Construction",
    "Retail and E-Commerce",
    "Manufacturing",
    "Education and E-learning",
    "Media and Entertainment",
    "Aerospace and Defense",
    "Chemicals and Petrochemicals",
    "Steel and Iron",
    "Mining and Minerals",
    "Logistics and Transportation",
  ]

  const orgRequestHandler = (e) => {
    e.preventDefault();

    

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("industry", industry);
    myForm.set("registrationNumber", registrationno);
    myForm.set("address.street", street);
    myForm.set("address.postolCode", postalCode);
    myForm.set("address.city", city);
    myForm.set("address.state", state);
    myForm.set("address.country", country);
    myForm.set("contact.email", email);
    myForm.set("contact.phone", phone);
    myForm.set("contact.website", website);
    myForm.set("admin.firstName", firstname);
    myForm.set("admin.email", email2);
    myForm.set("admin.lastName", lastname);
    myForm.set("admin.contact", contact);


    image.forEach((image) => {
      myForm.append("image", image);
    });
    dispatch(createOrgRequest(myForm));
  };

  const createJobImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImage([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
        setImagePreview((old) => [...old, reader.result]);
          setImage((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="REQEST" />
      <div className="jobrequest">
        <div className="newJobContainer">
          <form
            className="createJobForm"
            encType="multipart/form-data"
            onSubmit={orgRequestHandler}
          >
            <h1>Organization Request</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Name" 
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <WorkIcon />
              <select  onChange={(e)=> setIndustry(e.target.value)}>
                  <option value="">Industry</option>
                  {Industries.map((industry, index) => (
                  <option key={index} value={industry}>
                  {industry}
                  </option>
              ))}
            </select>
            </div>

            <div>
              <registrationnoIcon />

              <input
                type="text"
                placeholder="Registration Number"
                onChange={(e) => setRegistrationno(e.target.value)}
                
              ></input>
            </div>

            <div className="addressDiv">
              <label>Address</label>
            <input
                type="text"
                placeholder="street"
                required
                
                onChange={(e) => setStreet(e.target.value)}
              />
                <input
                type="text"
                placeholder="city"
                required
                
                onChange={(e) => setCity(e.target.value)}
                />
              <select  onChange={(e)=> setState(e.target.value)}>
                  <option value="">State</option>
                  {statesAndUTs.map((state, index) => (
                  <option key={index} value={state}>
                  {state}
                  </option>
              ))}
            </select>
            <input
                type="text"
                placeholder="Postol code"
                required
                onChange={(e) => setPostalCode(e.target.value)}
                />

            </div>
            <div className="addressDiv" >
              <label>Contacts</label>
              <input 
                type="email"
                placeholder="Email"
                required
                onChange={(e)=> setEmail(e.target.value)}
                /> 
              <input 
                type="text"
                placeholder="Phone"
                required
                onChange={(e)=> setPhone(e.target.value)}
                />
              <input 
                type="url"
                placeholder="Website"
                required
                onChange={(e)=> setWebsite(e.target.value)}
                />
              
            </div>

            <div className="addressDiv">
              <label>Admin</label>
              <input 
                type="text"
                placeholder="First Name"
                required
                onChange={(e)=> setFirstname(e.target.value)}
                />
              <input 
                type="text"
                placeholder="Last Name"
                required
                onChange={(e)=> setLastname(e.target.value)}
                />
              <input 
                type="email"
                placeholder="Email"
                required
                onChange={(e)=> setEmail2(e.target.value)}
                />
              <input 
                type="text"
                placeholder="Phone"
                required
                onChange={(e)=> setContact(e.target.value)}
                />
             
            </div>

            <div id="createJobFormFile">
              <label>Images</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createJobImagesChange}
                multiple
              />
            </div>

            <div id="createJobFormImage">
              {imagePreview.map((image, index) => (
                <img key={index} src={image} alt="Job Preview" />
              ))}
            </div>

            
            {loading? <Loader/> : <Button
              id="createJobBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Send Request
            </Button>}
            
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default OrgRegistration;