import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";


export const AppContext = createContext();


export const AppContextProvider = ({children}) =>{

    const[token , settoken] = useState(localStorage.getItem("token") ? localStorage.getItem("token"): false);
    const[doctors , setdoctors] = useState([]);
    const[userdata ,setuserdata] = useState(false);
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    const getdoctorsdata = async() =>{

        try{
            const {data} = await axios.get(backendurl + "/api/doctors/list");
            if(data.success){
                setdoctors(data.doctors);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }


    const loaduserprofile = async() =>{

        try{
            const {data} = await axios.get(backendurl + "/api/user/profile" , {headers:{token}});
            
            if(data.success){
                setuserdata(data.userdata[0]);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }



    useEffect(() =>{
        getdoctorsdata();
    },[])


    useEffect(() =>{
        if(token){
            loaduserprofile();
        }
        else{
            setuserdata(false);
        }
    },[token])



  


    const value = {
        doctors,
        token,
        settoken,
        backendurl,
        userdata,
        setuserdata,
        loaduserprofile,
        getdoctorsdata
    }


    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}