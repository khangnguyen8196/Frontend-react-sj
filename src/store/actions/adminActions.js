import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers,deleteUserService } from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';


export const fetchGenderStart =()=>{ 
    return async(dispatch,getState) => {
        try {
                dispatch({
                    type:actionTypes.FETCH_GENDER_START
                })
                let res = await getAllCodeService ("GENDER")
                if (res && res.errCode === 0){
                    dispatch(fetchGenderSuccess(res.data))
                }else {
                    dispatch(fetchGenderFailed())
                }
        }catch (e) {
            console.log('fetchGenderStart error: ', e)
        }
        }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

// POSITION
export const fetchPositionStart =()=>{ 
    return async(dispatch,getState) => {
        try {
                // dispatch({
                //     type:actionTypes.FETCH_POSITTON_START
                // })
                let res = await getAllCodeService ("POSITION")
                if (res && res.errCode === 0){
                    dispatch(fetchPositionSuccess(res.data))
                }else {
                    dispatch(fetchPositionFailed())
                }
        }catch (e) {
            console.log('fetchPositionStart error: ', e)
        }
        }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

// ROLE
export const fetchRoleStart =()=>{ 
    return async(dispatch,getState) => {
        try {
                // dispatch({
                //     type:actionTypes.FETCH_ROLE_START
                // })
                let res = await getAllCodeService ("ROLE")
                if (res && res.errCode === 0){
                    dispatch(fetchRoleSuccess(res.data))
                }else {
                    dispatch(fetchRoleFailed())
                }
        }catch (e) {
            console.log('fetchRoleStart error: ', e)
        }
        }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

// create user
export const createNewUser = (data)=>{
    return async(dispatch,getState) => {
        try {
                let res = await createNewUserService(data);
                    toast.success('Create a new user success')
                if (res && res.errCode === 0){
                    dispatch(saveUserSuccess())
                    dispatch(fetchAllUsersStart())
                }else {
                    toast.error('Create a new user error!')
                    dispatch(saveUserFailed());
                }
        }catch (e) {
            dispatch(saveUserFailed())
            console.log('saveUserFailed error: ', e)
        }
        }
}

export const saveUserSuccess = () => ({
    type:actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type:actionTypes.CREATE_USER_FAILED
})


//get all users

export const fetchAllUsersStart =()=>{ 
    return async(dispatch,getState) => {
        try {
                let res = await getAllUsers ("ALL")
                if (res && res.errCode === 0){
                    dispatch(fetchAllUsersSuccess(res.users.reverse()))
                }else {
                    dispatch(fetchAllUsersFailed())
                }
        }catch (e) {
            console.log('fetchAllUsersFailed error: ', e)
        }
        }
}

export const fetchAllUsersSuccess = (data) => ({
    type:actionTypes.FETCH_ALL_USERS_SUCCESS,
    users:data
})

export const fetchAllUsersFailed = () => ({
    type:actionTypes.FETCH_ALL_USERS_FAILED,
})

// delete user
export const deleteAUser = (userId)=>{
    return async(dispatch,getState) => {
        try {
                let res = await deleteUserService(userId);
                    toast.success('delete a new user success')
                if (res && res.errCode === 0){
                    dispatch(deleteUserSuccess())
                    dispatch(fetchAllUsersStart())
                }else {
                    toast.error('delete a new user error')
                    dispatch(deleteUserFailed());
                }
        }catch (e) {
            dispatch(deleteUserFailed())
            console.log('deleteUserFailed error: ', e)
        }
        }
}
export const deleteUserSuccess =() => ({
    type:actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed =() => ({
    type:actionTypes.DELETE_USER_FAILED
})