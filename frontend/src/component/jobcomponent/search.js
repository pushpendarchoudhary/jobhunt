import React ,{Fragment, useState} from "react";
import {useNavigate} from "react-router-dom";
import '../home/home.css'
const Search = ()=>{
    const [keyword, setKeyword]= useState("");
    
    const navigate = useNavigate();
    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if(keyword.trim()){
        navigate(`/jobs/${keyword}`);
      }
      else{
        navigate(`/`);
      }
    }
    

    return(
        <Fragment>
        <div className="searchdiv">
        <form className="searchbox" onSubmit = {searchSubmitHandler}>
            <input className="Searchinput form-control" type="text" placeholder="Search"  onChange={(e)=> setKeyword(e.target.value)} />
            <input className="search_button form-control" type="submit" value="search"/>
        </form>
        </div>
        </Fragment>
    )
}

export default Search;