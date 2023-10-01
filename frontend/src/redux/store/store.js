import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { jobDetailsReducer, jobReducer, jobsReducer, newJobReducer, resumeReducer } from '../reducers/jobreducer';
import { profileReducer, userReducer,forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "../reducers/userreducer";
import { AllOrgsReducer, OrgReducer, newOrgReducer } from "../reducers/orgreducers";

const reducer = combineReducers({
    jobs : jobReducer,
    jobDetails: jobDetailsReducer,
    user:userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    job: jobsReducer,
    newJob: newJobReducer,
    userDetails: userDetailsReducer,
    allOrgs: AllOrgsReducer,
    orgdelete: OrgReducer,
    newOrg: newOrgReducer,
    resumeList : resumeReducer,


});

let initialState={};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;