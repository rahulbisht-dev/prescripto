import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserModel from "../models/UserModel.js";
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../models/Doctormodel.js";
import AppointmentModel from "../models/Appointment.js";
import razorpay from 'razorpay'

//API TO REGISTER USER

const registerUser = async(req , res) =>{

    try{
        const {name , email , password} = req.body;

        if(!name || !password || !email){
            return res.json({success:false , message:"Missing Details"})
        }


        if(!validator.isEmail(email)){
            return res.send({success:false , message:"enter the vailed email"})
        }

        if(password.length < 8){
            return res.send({success:false , message:"please enter a strong password"})
        }

        // hashing user password

        const salt = await bcrypt.genSalt(10);
        const hashed_pass = await bcrypt.hash(password , salt);

        const userdata = {
            name,
            email,
            password:hashed_pass
        }

        const newuser = new UserModel(userdata);
        const user = await newuser.save();

        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET_KEY)

        res.send({success:true , token})



    }
    catch(error){
        res.send({message:error.message , success:false})
    }
}


// API FOR USER LOGIN

const userlogin = async(req , res) =>{


    try{
        const {email , password} = req.body;
        const user = await UserModel.findOne({email});

        if(!user){
            res.send({message:false , message:"user does not exist"})
        }

        const isMatch = await bcrypt.compare(password , user.password);

        if(isMatch){
            const token = jwt.sign({id:user._id} , process.env.JWT_SECRET_KEY);
            res.send({success:true , token})
        }
        else{
            res.send({success:false , message:"invailed credentials."})
        }

    }
    catch(error){
        res.send({success:false , message:error.message})
    }
}


//api to get user profile data

const getprofile = async(req , res) =>{

    try{
        const {userid} = req.body;
        const userdata = await UserModel.find({_id:userid}).select('-password');

        res.send({success:true , userdata:userdata});
    }
    catch(error){
        res.send({success:false , message:error.message})
    }
}


//api to update user profile

const updateprofile = async(req , res) =>{

    try{
        const {userid , name , phone , address , dob , gender} = req.body;
        const image_file = req.file;

        if(!name || !phone || !address || !dob || !gender){
            return res.send({success:false , message:"data missing..."})
        }

        await UserModel.findByIdAndUpdate(userid , {name , phone , address:JSON.parse(address) , dob , gender});

        if(image_file){

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(image_file.path , {resource_type:"image"});
            const imageurl = imageUpload.secure_url;

            await UserModel.findByIdAndUpdate(userid , {image:imageurl});
        }


        res.send({success:true , message:"successfully updated your profile..."})


    }
    catch(error){
        res.send({success:false , message:error.message})   
    }
}



// API TO BOOK THE APOINTMENT

const BookAppointment = async(req , res) =>{

    try{
        console.log(req.body);
        const {userid , doctorid , slotdate , slottime} = req.body;
        const doctordata = await doctorModel.findById({_id:doctorid}).select('-password');

        if(!doctordata.available){
            return res.send({success:false , message:'Doctor not available...'})
        }

        let slots_booked = doctordata.slots_booked;

        // checking for slots availaility...
        if(slots_booked[slotdate]){
            if(slots_booked[slotdate].includes(slottime)){
                return res.send({success:false ,message:'slot not available..'})
            }
            else{
                slots_booked[slotdate].push(slottime);
            }
        }
        else{
            slots_booked[slotdate] = [];
            slots_booked[slotdate].push(slottime);
        }

        const userdata = await UserModel.findById(userid).select('-password');

        delete doctordata.slots_booked;

        const appointmentData = {userid , doctorid , slotdate , slottime , userdata , doctordata , amount:doctordata.fees , date:Date.now()}

        const newAppointment = new AppointmentModel(appointmentData);
        await newAppointment.save();

        // save new slots data in doctordata 
        await doctorModel.findByIdAndUpdate({_id:doctorid} , {slots_booked});

        res.send({success:true , message:'Appointment Booked'})


    }
    catch(error){
        res.send({success:false , message:error.message})
    }
}


const listappointment = async(req , res) =>{

    try{

        const {userid} = req.body;
        const appointments = await AppointmentModel.find({userid});


        res.send({success:true , appointments});
    }
    catch(error){
        res.send({success:false , message:error.message})
    }
}



// api to cancel the appointment

const Cancelappointment = async(req , res) =>{

    try{
        const{userid , appointmentid} = req.body;

        const appointmentdata = await AppointmentModel.findById(appointmentid);

        // verify the appointment user

        if(appointmentdata.userid !== userid){
            return res.send({success:false , message:'unauthorised action'});
        }

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


// API TO MAKE PAYMENT OF APPOINTMENT USING RAZORPAY

const razorpayinstance = new razorpay({
    'key_id':process.env.RAZORPAY_KEY_ID,
    'key_secret':process.env.RAZORPAY_SECRET_KEY
})


const paymentrazorpay = async(req , res) =>{

try{
    const {appointmentid} = req.body;
    const appointmentdata = await AppointmentModel.findById(appointmentid);

    if(!appointmentdata || appointmentdata.cancelled){
        return res.send({success:false , messagee:'Appointment cancelled or not found'})
    }

    // creating options for rajorpay

    const options = {
        amount: appointmentdata.amount * 100,
        currency: 'INR',
        receipt:appointmentid,
    }

    // creating of an order

    const order = await razorpayinstance.orders.create(options);

    res.send({success:true , order});
}

catch(error){
    res.send({success:false ,message:error.message})
}

}







export {registerUser , userlogin , getprofile , updateprofile , BookAppointment , listappointment , Cancelappointment , paymentrazorpay};