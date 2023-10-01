
import axios from "axios";
import { ALL_ORGS_FAIL,
    ALL_ORGS_REQUEST,
    ALL_ORGS_SUCCESS,
    CLEAR_ERRORS,
    DELETE_ORG_FAIL,
    DELETE_ORG_REQUEST,
    DELETE_ORG_SUCCESS,
    NEW_ORG_FAIL,
    NEW_ORG_REQUEST,
    NEW_ORG_RESET,
    NEW_ORG_SUCCESS
 } from "../constants/orgconstants";

// get all orgs information
export const getAllOrganizations = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORGS_REQUEST });
      const { data } = await axios.get(`/api/v1/org/all`);
  
      dispatch({ 
        type: ALL_ORGS_SUCCESS, 
        payload: data.orgs });
    } catch (error) {
      dispatch({ type: ALL_ORGS_FAIL, 
        payload: error.response.data.message });
    }
  };

   // Delete User
   export const deleteOrganization = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_ORG_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/org/${id}`);
  
      dispatch({ 
        type: DELETE_ORG_SUCCESS, 
        payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_ORG_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  // create ORG
  export const createOrgRequest = (OrgData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_ORG_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/org/register`,
        OrgData,
        config
      );
  
      dispatch({
        type: NEW_ORG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_ORG_FAIL,
        payload: error.response.data.message,
      });
    }
  };


   // Clearing Errors
   export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };