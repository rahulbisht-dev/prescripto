import express from "express";
import { addDoctor, admindashboard, alldoctors, appointmentAdmin, appointmentcancel, loginAdmin } from "../controllers/AdminControllers.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/AuthAdmin.js";
import { changeavailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router();


adminRouter.route("/add-doctor").post(authAdmin ,   upload.single("image") , addDoctor);
adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/all-doctors").post(authAdmin , alldoctors)
adminRouter.route("/change-availability").post(authAdmin , changeavailablity);
adminRouter.route('/appointments').get(authAdmin , appointmentAdmin);
adminRouter.route('/cancelappointment').post(authAdmin , appointmentcancel);
adminRouter.route('/dashboard').get(authAdmin , admindashboard);



export default adminRouter;