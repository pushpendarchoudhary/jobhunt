import { ALL_ORGS_FAIL, 
    ALL_ORGS_REQUEST, 
    ALL_ORGS_SUCCESS, 
    CLEAR_ERRORS, 
    DELETE_ORG_FAIL, 
    DELETE_ORG_REQUEST,
    DELETE_ORG_SUCCESS,
    NEW_ORG_FAIL,
    NEW_ORG_REQUEST,
    NEW_ORG_SUCCESS,
    NEW_ORG_RESET,} from "../constants/orgconstants";

    export const AllOrgsReducer = (state = {organizations:[]},action)=>{
        switch (action.type) {
            case ALL_ORGS_REQUEST:
                return {
                    ...state,
                    loading:true,
                    
                };
            case ALL_ORGS_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    organizations:action.payload,
                };
            case ALL_ORGS_FAIL:
                return{
                    loading:false,
                    error:action.payload,
                };
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null,
                }
            default:
                return state;
        }
    };

    export const OrgReducer = (state= {}, action)=>{
        switch(action.type){
            case DELETE_ORG_REQUEST:
                return{
                    ...state,
                    loading: true,
                }
            case DELETE_ORG_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    isDeleted: action.payload.success,
                    message:action.payload.message,
                }
            case DELETE_ORG_FAIL:
                return{
                    ...state,
                    loading:false,
                    error: action.payload,

                }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null, 
                }
            default:
                return state;
        }
    }

    export const newOrgReducer = (state = { org: {} }, action) => {
        switch (action.type) {
          case NEW_ORG_REQUEST:
            return {
              ...state,
              loading: true,
            };
          case NEW_ORG_SUCCESS:
            return {
              loading: false,
              success: action.payload.success,
              org: action.payload.org,
            };
          case NEW_ORG_FAIL:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
          case NEW_ORG_RESET:
            return {
              ...state,
              success: false,
            };
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };