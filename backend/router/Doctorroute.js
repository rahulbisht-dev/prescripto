import express from "express";
import { appointmentcomplete, cancelappointment, Doctorappointments, doctordashboard, doctorlist, doctorprofile, logindoctor, updatedoctorprofile } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/AuthDoctor.js";

const doctorRouter = express.Router();

doctorRouter.route("/list").get(doctorlist);
doctorRouter.route('/login').post(logindoctor);
doctorRouter.route('/appointments').get(authDoctor , Doctorappointments);
doctorRouter.route('/appointmentcomplete').post(authDoctor , appointmentcomplete);
doctorRouter.route('/appointmentcancel').post(authDoctor , cancelappointment);
doctorRouter.route("/doctordashboard").get(authDoctor , doctordashboard);
doctorRouter.route("/doctorprofile").get(authDoctor , doctorprofile);
doctorRouter.route("/updateprofile").post(authDoctor , updatedoctorprofile);

export default doctorRouter;