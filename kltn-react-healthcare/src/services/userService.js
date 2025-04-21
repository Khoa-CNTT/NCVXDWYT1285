import axios from "../axios";

const handldLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const registerApi = (
  email,
  password,
  firstName,
  lastName,
  address,
  phonenumber,
  gender,
  roleId
) => {
  console.log(
    "object gui BE",
    email,
    password,
    firstName,
    lastName,
    address,
    phonenumber,
    gender,
    roleId
  );
  return axios.post("/register", {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    address: address,
    phonenumber: phonenumber,
    gender: gender,
    roleId: roleId,
  });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`, {
    id: inputId,
  });
};

const createNewUserService = (data) => {
  console.log("check data from service: ", data);
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/getallcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = (limit) => {
  return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-info-doctors", data);
};

const getDetailInfoDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInfoDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};

const getAllSpecialty = (doctorId) => {
  return axios.get(`/api/get-all-specialty`);
};

const getDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const createNewClinic = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};

const getAllClinic = (doctorId) => {
  return axios.get(`/api/get-all-clinic`);
};

const getDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};

const getAllPatientForManage = (data) => {
  return axios.get(`/api/get-list-patient-for-manage?statusId=${data.statusId}&date=${data.date}`);
};

const updateStatusPatient = (data) => {
  return axios.post('/api/update-patient-status', data);
};

const getListPatientByUserId = (data) => {
  return axios.get(`/api/get-list-patient-by-user-id?ids=${data.appoinmentIds}`);
};

const forgotPasswordAPI = (data) => {
  return axios.post('/api/auth/forgot-password', data);
};

export {
  handldLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
  registerApi,
  getAllPatientForManage,
  updateStatusPatient,
  getListPatientByUserId,
  forgotPasswordAPI,
};
