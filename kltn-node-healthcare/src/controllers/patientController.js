import patientService from '../services/patientService';

let postBookAppointment = async (req, res) => {
  try {
    let info = await patientService.postBookAppointment(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server!',
    });
  }
};

let postVerifyBookAppointment = async (req, res) => {
  try {
    let info = await patientService.postVerifyBookAppointment(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server!',
    });
  }
};

let getListPaitentForManage = async (req, res) => {
  try {
    let info = await patientService.getListPaitentForManage(req.query.statusId, req.query.date);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server!',
    });
  }
};

let updatePatientStatus = async (req, res) => {
  try {
    let info = await patientService.updatePatientStatus(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server!',
    });
  }
};

let getListPaitentByUserId = async (req, res) => {
  try {
    let info = await patientService.getListPaitentByUserId(req.query.ids);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server!',
    });
  }
};

module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
  getListPaitentForManage: getListPaitentForManage,
  updatePatientStatus: updatePatientStatus,
  getListPaitentByUserId: getListPaitentByUserId,
};
