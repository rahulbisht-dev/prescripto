import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const Doctorcontext = createContext();


export const DoctorContextProvider = ({children}) =>{

    const backendurl = import.meta.env.VITE_BACKEND_URL;

    const [dtoken , setdtoken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : localStorage.getItem('dtoken'));
    const [appointments , setappointments] = useState([]);
    const [dashdata , setdashdata] = useState(false);
    const [profiledata , setprofiledata] = useState(false);

    const getappointments = async() =>{

        try{
            const {data} = await axios.get(backendurl + '/api/doctors/appointments' , {headers:{dtoken}});
            

            if(data.success){
                setappointments(data.appointments.reverse());
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }

    const calculateage = (dob) =>{
        const today = new Date();
        const birthdate = new Date(dob);

        let age = today.getFullYear() - birthdate.getFullYear();
        return age;
    }

    const completeappointment = async(appointmentid) =>{

        try{
            const {data} = await axios.post(backendurl + '/api/doctors/appointmentcomplete' , {appointmentid} , {headers:{dtoken}})

            if(data.success){
                toast.success(data.message)
                getappointments();
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }


    const cancelappointment = async(appointmentid) =>{

        try{
            const {data} = await axios.post(backendurl + '/api/doctors/appointmentcancel' , {appointmentid} , {headers:{dtoken}})

            if(data.success){
                toast.success(data.message)
                getappointments();
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }

    const getdashdata = async() =>{

        try{
            const {data} = await axios.get(backendurl + "/api/doctors/doctordashboard" , {headers:{dtoken}});
            if(data.success){
                setdashdata(data.dashdata)
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }


    const getprofiledata = async() =>{

        try{
            const {data} = await axios.get(backendurl + "/api/doctors/doctorprofile" , {headers:{dtoken}});

            if(data.success){
                setprofiledata(data.doctorprofile)
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }






 
    const value = {
        dtoken,
        calculateage,
        setdtoken,
        backendurl,
        getappointments,
        setappointments,
        appointments,
        cancelappointment,
        completeappointment,
        getdashdata,
        dashdata,
        setdashdata,
        profiledata,
        setprofiledata,
        getprofiledata
    }

    return <Doctorcontext.Provider value={value}>{children}</Doctorcontext.Provider>
}