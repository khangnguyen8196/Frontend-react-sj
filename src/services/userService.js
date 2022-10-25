import axios from '../axios';

const handleLoginApi = (email,password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    console.log('check data from service:',data)
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user',{
        data:{
            id: userId,
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user',
        inputData 
    );
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) =>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctors = () =>{
    return axios.get(`/api/get-all-doctor`);
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctor', data);
}

const getDetailInforDoctorService = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

export  { handleLoginApi, getAllUsers, createNewUserService,
         deleteUserService, editUserService, getAllCodeService, getTopDoctorHomeService,
         getAllDoctors, saveDetailDoctorService, getDetailInforDoctorService, saveBulkScheduleDoctor,
};