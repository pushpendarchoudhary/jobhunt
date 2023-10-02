import { ALL_JOBS_SUCCESS, ALL_JOBS_REQUEST,ALL_JOBS_FAIL, JOB_DETAILS_REQUEST, JOB_DETAILS_SUCCESS,JOB_DETAILS_FAIL, CLEAR_ERROR,
    ADMIN_JOBS_REQUEST,
    ADMIN_JOBS_SUCCESS,
    ADMIN_JOBS_FAIL,
    DELETE_JOB_FAIL, DELETE_JOB_REQUEST, DELETE_JOB_RESET, DELETE_JOB_SUCCESS,
    UPDATE_JOB_FAIL,UPDATE_JOB_REQUEST,UPDATE_JOB_RESET,UPDATE_JOB_SUCCESS,
    NEW_JOB_FAIL, NEW_JOB_REQUEST, NEW_JOB_RESET, NEW_JOB_SUCCESS, 
    UPLOAD_RESUME_RESET, UPLOAD_RESUME_FAIL, UPLOAD_RESUME_SUCCESS, UPLOAD_RESUME_REQUEST, 
    ALL_RESUME_SUCCESS, ALL_RESUME_REQUEST, ALL_RESUME_FAIL,
    DELETE_RESUME_FAIL, DELETE_RESUME_REQUEST, DELETE_RESUME_SUCCESS, DELETE_RESUME_RESET } from "../constants/jobconstant";


export const jobReducer = (state = {jobs: [] },action)=>{

    switch (action.type) {
        case ALL_JOBS_REQUEST:
            case ADMIN_JOBS_REQUEST:
                return {
                    loading:true,
                    jobs:[]
                };
        case ALL_JOBS_SUCCESS:
            case ADMIN_JOBS_SUCCESS:
                return{
                    loading:false,
                    jobs:action.payload,
                    
                };
        case ALL_JOBS_FAIL:
            case ADMIN_JOBS_FAIL:
                return {
                    loading:false,
                    error:action.payload,
                };
        case CLEAR_ERROR:
            return {
                ...state,
                error:null,
            };
        default:
            return state;
    }
}

export const jobDetailsReducer = (state = {jobs: [] },action)=>{

    switch (action.type) {
        case JOB_DETAILS_REQUEST:
            return {
                loading:true,
                ...state,
            };
        case JOB_DETAILS_SUCCESS:
            return{
                loading:false,
                jobs:action.payload,
                
            };
        case JOB_DETAILS_FAIL:
            return {
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error:null,
            };
        default:
            return state;
    }
}

export const jobsReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_JOB_REQUEST:
      case UPDATE_JOB_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_JOB_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_JOB_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_JOB_FAIL:
      case UPDATE_JOB_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_JOB_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_JOB_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

  export const newJobReducer = (state = { job: {} }, action) => {
    switch (action.type) {
      case NEW_JOB_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_JOB_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          job: action.payload.job,
        };
      case NEW_JOB_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_JOB_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

  export const resumeReducer = (state = { resumes: [] }, action) => {
    switch (action.type) {
      case UPLOAD_RESUME_REQUEST:
        case ALL_RESUME_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPLOAD_RESUME_SUCCESS:
        case ALL_RESUME_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          resumes: action.payload.resume,
        };
      case UPLOAD_RESUME_FAIL:
        case ALL_RESUME_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPLOAD_RESUME_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

  export const deleteresume = (state = {}, action) => {
    switch (action.type) {
      case DELETE_RESUME_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_RESUME_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case DELETE_RESUME_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_RESUME_RESET:
        return {
          ...state,
          isDeleted: false,
        };

      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };