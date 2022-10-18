import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers,deleteUserService, editUserService,getTopDoctorHomeService } from '../../services/userService';
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
                    // console.log('hoi dan it check create user redux:', res);
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

// // edit users
export const editAUser = (userId)=>{
    return async(dispatch,getState) => {
        try {
                let res = await editUserService(userId);
                    toast.success('update a new user success')
                if (res && res.errCode === 0){
                    dispatch(editUserSuccess())
                    dispatch(fetchAllUsersStart())
                }else {
                    toast.error('update a new user error')
                    dispatch(editUserFailed());
                }
        }catch (e) {
            toast.error('update a new user error')
            dispatch(deleteUserFailed())
            console.log('editUserFailed error: ', e)
        }
        }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})


// //get all users

export const fetchAllUsersStart =()=>{ 
    return async(dispatch,getState) => {
        try {
                let res = await getAllUsers ("ALL")
                let res1 =await getTopDoctorHomeService(3)
                console.log(' hoitaodimay check res1 get top doctor ',res1)
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

export const fetchTopDoctor =() => {
    return async (dispatch,getState) => {
        try {
            let res = await getTopDoctorHomeService('3')   
            if (res && res.errCode ===0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDocrors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        }catch (e) {
            console.log ('FETCH_TOP_DOCTOR_FAILED:',e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
        }
        }
}