import validator from "validator"
import bcrypt from "bcryptjs";
import doctorModel from "../models/Doctormodel.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import AppointmentModel from "../models/Appointment.js";
import UserModel from "../models/UserModel.js";
// API FOR ADDING DOCTOR..

const addDoctor = async(req , res) =>{

    try{
        const {name , email , password , speciality , degree , experience , about , fees , address} = req.body;
        const imagefile = req.file;
        

        // CHECKING ALL THE DATA EXIST AS TO ADD IN THE DATABASE.
        if(!name && !email && !password && !speciality && !degree && !experience && !about && !fees && !address){
            return res.send({success:false , message:"missing details..."})
        }

        // VALIDATING EMAIL FORMAT..
        if(!validator.isEmail(email)){
            return res.send({success:false , message:"Please Enter a vailed email"})
        }

        //VALIDATING STRONG PASSWORD..
        if(password.length < 8){
            return res.send({success:false , message:"Please enter a strong password"})
        }

        // HASHING DOCTORS PASSOWORD...

        const salt = await bcrypt.genSalt(10);
        const hashed_pass = await bcrypt.hash(password , salt);
        

        // UPLOAD IMAGE TO CLOUDINARY

        const image_upload = await cloudinary.uploader.upload(imagefile.path , {resource_type:"image"});        
        const image_url = image_upload.secure_url;


        const doctordata = {
            name,
            email,
            image:image_url,
            password:hashed_pass,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }
        const newDoctor = new doctorModel(doctordata);
        await newDoctor.save();

        res.send({success:"true" , message:"doctor added"})

    }
    catch(error){
        res.send({success:false , message:error.message})
    }
}


//API FOR THE ADMIN LOGIN

const loginAdmin = async(req , res) =>{

    try{
        const {email , password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.PASSWORD){
            const token = jwt.sign(email+password , process.env.JWT_SECRET_KEY)
            res.send({success:true , token});
        }
        else{
            res.json({success:false , message:"INVAILED CREDENTIALS"})
        }
    }
    catch(error){
        res.send({success:false , message:error.message})
    }
}



const alldoctors = async(req , res) =>{

    try{
        const doctors = await doctorModel.find({}).select('-password')
        res.send({success:true , doctors})
    }
    catch(err){
        res.send({success:false , message:err.message})
    }
}



// api to get all appointments list 

const appointmentAdmin = async(req , res) =>{

    try{
        const appointments = await AppointmentModel.find({});

        res.send({success:true , appointments});
    }
    catch(error){
        res.send({success:false , message:error.message})
    }
}


// controller to cancel the appointment from the admin

const appointmentcancel = async(req , res) =>{

    try{
        const{appointmentid} = req.body;
    

        const appointmentdata = await AppointmentModel.findById(appointmentid);


        await AppointmentModel.findByIdAndUpdate(appointmentid , {cancelled:true})

        // releasing doctor slot 

        const {doctorid  , slotdate , slottime} = appointmentdata;

        const doctordata = await doctorModel.findById(doctorid);

        let slots_booked = doctordata.slots_booked;

        slots_booked[slotdate] = slots_booked[slotdate].filter(e => e!== slottime)


        await doctorModel.findByIdAndUpdate(doctorid , {slots_booked});

        res.send({success:true , message:'Appointment cancelled'});



    }
    catch(error){
        res.send({success:false , message:error.message})
    }
}


// api to get dashboard edata for the admin panel

const admindashboard = async(req , res) =>{

    try{
        const doctors = await doctorModel.find({});
        const users = await UserModel.find({});
        const appointments = await AppointmentModel.find({});

        const dashdata = {
            doctors:doctors.length,
            appointments:appointments.length,
            users:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        res.send({success:true , dashdata});

    }
    catch(error){
        res.send({success:false , message:error.message})
    }
}


export {addDoctor , loginAdmin , alldoctors , appointmentAdmin , appointmentcancel , admindashboard};