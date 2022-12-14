import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
   genders:[],
   roles:[],
   positions:[],
   users:[],
   topDoctors:[],
   allDoctors:[],
   allScheduleTime:[],

   allRequiredDoctorInfor:[],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state}
            copyState.isLoadingGender=true
            return {
                ...copyState,
                
            }
        
        case actionTypes.FETCH_GENDER_SUCCESS:
                state.genders= action.data
                state.isLoadingGender=false;

            return {
                ...state,
                
            }

        case actionTypes.FETCH_GENDER_FAILED:
                state.isLoadingGender=false;
                state.genders=[];
        return {
            ...state,
            
        }

        // position

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions= action.data

        return {
            ...state,
            
        }

        case actionTypes.FETCH_POSITION_FAILED:
                state.positions=[];
        return {
            ...state,
            
        }

        // ROLE
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles= action.data

        return {
            ...state,
            
        }

        case actionTypes.FETCH_ROLE_FAILED:
                state.roles=[];
        return {
            ...state,
        }

        // get all users
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users=[];
            return {
                ...state
            }

        // top doctor
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDocrors;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctors = [];
            return {
                ...state
            }
        // get all doctors
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctors = [];
            return {
                ...state
            }
        
        // SCHEDULE TIME

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state
            }
        // price payment province
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state
            }
            
        
        default:
            return state;
    }
}

export default adminReducer;