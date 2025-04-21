import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctorService, getAllSpecialty, getAllClinic

} from '../../services/userService';
import { toast } from 'react-toastify'

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

// GENDER -----------------------------------------------

export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart error', e)
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

// POSITION -----------------------------------------------

export const fetchPositionStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionStart error', e)
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

// ROLE -----------------------------------------------

export const fetchRoleStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log('fetchRoleStart error', e)
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

// create user redux

export const createNewUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(userId)
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Create a new user failed!")
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log('saveUserFailed error', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

// Read user

export const fetchAllUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                toast.error("Fetch all new user failed!")
                dispatch(fetchAllUsersFailed())
            }
        } catch (e) {
            toast.error("Fetch all new user failed!")
            dispatch(fetchAllUsersFailed())
            console.log('fetchAllUsersFailed error', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

// Delete user

export const deleteANewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(data)
            if (res && res.errCode === 0) {
                toast.success("Delete user succeed!")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            dispatch(deleteUserFailed())
            console.log('saveUserFailed error', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

// Edit user

export const editANewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data)
            if (res && res.errCode === 0) {
                toast.success("Update user succeed!")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Update user failed!")
                dispatch(editUserFailed())
            }
        } catch (e) {
            toast.error("Update user failed!")
            dispatch(editUserFailed())
            console.log('editUserFailed error', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

// fetch top doctor

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors('')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTOR_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data)
            if (res && res.errCode === 0) {
                toast.success("Save doctor information succeed!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS
                })
            } else {
                toast.error("Save doctor information failed!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('SAVE_DETAIL_DOCTOR_FAILED: ', e)
            toast.error("Save doctor information failed!")
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME")
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const getRequiredDoctorInfo = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START })

            let resPrice = await getAllCodeService("PRICE")
            let resPayment = await getAllCodeService("PAYMENT")
            let resProvince = await getAllCodeService("PROVINCE")
            let resSpecialty = await getAllSpecialty()
            let resClinic = await getAllClinic()
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                }
                dispatch(fetchAllRequiredDoctorInfoSuccess(data))
            } else {
                dispatch(fetchAllRequiredDoctorInfoFailed())
            }
        } catch (e) {
            dispatch(fetchAllRequiredDoctorInfoFailed())
            console.log('getRequiredDoctorInfo error', e)
        }
    }
}

export const fetchAllRequiredDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_INFO_SUCCESS,
    data: allRequiredData,
})

export const fetchAllRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_INFO_FAILED
})