import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import handbookController from "../controllers/handbookController";
import authController from "../controllers/authController";
import momoController from "../controllers/momoController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  //   router.post("/register", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/getallcode", userController.getAllCode);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-info-doctors", doctorController.postInfoDoctors);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );
  router.get(
    "/api/get-extra-info-doctor-by-id",
    doctorController.getExtraInfoDoctorById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );

  router.get("/api/search", doctorController.searchDoctorByName);

  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPaitentForDoctor
  );
  router.post("/api/send-remedy", doctorController.sendRemedy);

  router.get('/api/get-list-patient-for-manage', patientController.getListPaitentForManage);
  router.post('/api/update-patient-status', patientController.updatePatientStatus);

  router.get('/api/get-list-patient-by-user-id', patientController.getListPaitentByUserId);
  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );

  router.post(
    "/api/create-new-specialty",
    specialtyController.createNewSpecialty
  );
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
  //#94
  router.get( 
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );

  router.post("/api/create-new-clinic", clinicController.createNewClinic);
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );

  router.post("/api/create-new-handbook", handbookController.createNewHandbook);
  router.get("/api/get-all-handbook", handbookController.getAllHandbook);
  router.get(
    "/api/get-detail-handbook-by-id",
    handbookController.getDetailHandbookById
  );

  router.post('/api/auth/forgot-password', authController.handleForgotPassword);

  // payments momo
  router.post('/api/payments/momo', momoController.processPayment);
  return app.use("/", router);
};

export default initWebRoutes;