import doctorModel from "../models/Doctormodel.js";
import bcrypt from 'bcryptjs'
import jwt from'jsonwebtoken'
import AppointmentModel from "../models/Appointment.js";





const changeavailablity = async(req , res) =>{

    try{
        
        const {docid} = req.body;
        const docdata = await doctorModel.findById({_id:docid});
        await doctorModel.findByIdAndUpdate(docid , {available: !docdata.available});
        res.send({success:true , message:"Availability changed"})
    }
    catch(err){
        res.send({success:false , message:err.message})
    }
}


const doctorlist = async(req , res) =>{
    try{
        const doctors = await doctorModel.find().select(['-password' , '-email']);
        console.log(doctors);
        res.send({success:true , doctors})
        
    }
    catch(error){
        res.send({success:false , message:err.message})
    }
}


// API FOR DOCTOR LOGIN

const logindoctor = async(req , res) =>{

    try{
        const {email , password} = req.body;
        const doctor = await doctorModel.findOne({email});
     

        if(!doctor){
            return res.send({success:false , message:"invailed credentials"})
        }


        const isMatch = await bcrypt.compare(password , doctor.password);



        if(isMatch){
            const token = jwt.sign({id:doctor._id} , process.env.JWT_sECRET_KEY);
            res.send({success:true , token})
        }
        else{
            res.send({success:false , message:'invailed credentials'})
        }
    }
    catch(error){
        res.send({success:false , message:error.message})
    }
}

// api to get doctor appointments for doctor panel

const Doctorappointments = async(req , res) =>{


    try{

        const {doctorid} = req.body;
        const appointments = await AppointmentModel.find({doctorid});
        res.send({success:true , appointments})
    }
    catch(error){
        res.send({success:false , message:error.message})
    }
}

// API TO MARK APPOINTMENT COMPLETED FOR DOCTOR PANEL

const appointmentcomplete = async(req , res) =>{

    try{

        const {doctorid , appointmentid} = req.body;
        const appointmentdata  = await AppointmentModel.findById(appointmentid);

        if(appointmentdata && appointmentdata.doctorid === doctorid){
            await AppointmentModel.findByIdAndUpdate(appointmentid , {iscompleted:true});
            return res.send({success:true , message:'APPOINTMENT COMPLETED'})
        }
        else{
            return res.send({success:false , message:'Mark Failed'});
        }


        }
    catch(error){
        res.send({success:false , message:error.message})   
    }
}


//API TO CANCEL THE APPOINTMENT

const cancelappointment= async(req , res) =>{

    try{

        const {doctorid , appointmentid} = req.body;
        const appointmentdata  = await AppointmentModel.findById(appointmentid);

        if(appointmentdata && appointmentdata.doctorid === doctorid){
            await AppointmentModel.findByIdAndUpdate(appointmentid , {cancelled:true});
            return res.send({success:true , message:'APPOINTMENT CANCELLED'})
        }
        else{
            return res.send({success:false , message:'Cancellation Failed'});
        }


        }
    catch(error){
        res.send({success:false , message:error.message})   
    }
}


// API TO GET DASHBOARD DATA FOR THE DOCTOR PANEL

const doctordashboard = async( req , res) =>{

    try{
        const {doctorid} = req.body;
        const appointments = await AppointmentModel.find({doctorid});

        let earnings = 0;

        appointments.map((item) =>{
            if(item.iscompleted || item.payment){
                earnings += item.amount
            }
        })

        let patients = [];

        appointments.map((item) =>{
            if(!patients.includes(item.userid)){
                patients.push(item.userid)
            }
        })


        const dashdata = {earnings , appointments:appointments.length , patients:patients.length , latestappointments:appointments.reverse().slice(0,5)}

        res.send({success:true , dashdata});
    }
    catch(error){
        res.send({message:error.message});
    }
}

// api to get doctor profile to doctor panel

const doctorprofile = async(req , res) =>{

    try{
        const {doctorid} = req.body;
        const doctorprofile = await doctorModel.findById({_id:doctorid}).select('-password');

        res.send({success:true , doctorprofile});
    }
    catch(error){
        res.send({message:error.message})
    }
}


//api to update the doctor profile data

const updatedoctorprofile = async(req , res) =>{

    try{
        const {doctorid , fees , address , available} = req.body;
        const doctor = await doctorModel.findByIdAndUpdate({_id:doctorid} , {fees , address , available});

        res.send({success:true , message:"profile successfully updated"});
    }
    catch(error){
        res.send({message:error.message});
    }
} 




export {changeavailablity , doctorlist , logindoctor , doctorprofile , updatedoctorprofile , Doctorappointments , cancelappointment , appointmentcomplete , doctordashboard};
