import express from "express";
import { BookAppointment, Cancelappointment, getprofile, listappointment, paymentrazorpay, registerUser, updateprofile, userlogin } from "../controllers/userController.js";
import authuser from "../middlewares/Authuser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();


userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(userlogin);
userRouter.route("/profile").get(authuser , getprofile);
userRouter.route("/updateprofile").post(upload.single("image") , authuser , updateprofile)
userRouter.route('/bookappointment').post(authuser , BookAppointment);
userRouter.route('/listappointments').get(authuser , listappointment);
userRouter.route('/cancelappointment').post(authuser , Cancelappointment);
userRouter.route('/payment').post(authuser , paymentrazorpay);

export default userRouter;