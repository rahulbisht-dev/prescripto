import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const Admincontext = createContext();


export const AdminContextProvider = ({children}) =>{

    const [doctors , setdoctors] = useState([]);
    const [appointments , setappointments] = useState([]);
    const [atoken , setatoken] = useState(localStorage.getItem('atoken') ? localStorage.getItem('atoken') : "");
    const[dashdata , setdashdata] = useState(false);
    const backendurl = import.meta.env.VITE_BACKEND_URL;


    const changeavailability = async(docid) =>{
     

        try{
            const {data} = await axios.post(backendurl + "/api/admin/change-availability" , {docid} , {headers:{atoken}});
 

            if(data.success){
                toast.success(data.message);
                getalldoctors()
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }

    const getallappointments = async() =>{

        try{
            const {data} = await axios.get(backendurl + '/api/admin/appointments' , {headers:{atoken}});

            if(data.success){
                setappointments(data.appointments)
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }


    const cancelappointment = async(appointmentid) =>{
       

        try{
            
            const {data} = await axios.post(backendurl + '/api/admin/cancelappointment' , {appointmentid} , {headers:{atoken}});
            if(data.success){
                toast.success(data.message);
                getallappointments();
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error(error)
        }
    } 




    const getalldoctors = async() =>{

        try{
            
            const {data} = await axios.post(backendurl + "/api/admin/all-doctors" , {} , {headers:{atoken}});


            if(data.success){
                setdoctors(data.doctors)
            }
            else{
                toast.error("failed to fetch data" , data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }


    const getdashdata = async(req , res) =>{

        try{
            const {data} = await axios.get(backendurl + '/api/admin/dashboard' , {headers:{atoken}});
            if(data.success){
                setdashdata(data.dashdata);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error);
            res.send({success:false , message:error.message})
        }
    }

    const value = {
        atoken,
        setatoken,
        backendurl,
        doctors,
        getalldoctors,
        changeavailability,
        appointments,
        setappointments,
        getallappointments,
        cancelappointment,
        getdashdata,
        dashdata
    }

    return <Admincontext.Provider value={value}>{children}</Admincontext.Provider>
}