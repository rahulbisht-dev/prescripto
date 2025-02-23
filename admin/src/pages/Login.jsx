import { useContext, useState } from "react"
import {assets} from "../assets/assets_admin/assets.js"
import { Admincontext } from "../context/Admincontext.jsx";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { Doctorcontext } from "../context/Doctorcontext.jsx";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const[email , setemail] = useState('');
    const[password , setpassword] = useState('');
    const [state , setstate] = useState("admin");
    const{setatoken , backendurl} = useContext(Admincontext);
    const{setdtoken} = useContext(Doctorcontext);

    const navigate = useNavigate();

    const onsubmithandler = async(e) =>{
        e.preventDefault();

        try{
            if(state === "admin"){
    
                const {data} = await axios.post(backendurl+"/api/admin/login" , {email , password})
                if(data.success){
                    localStorage.setItem("atoken" , data.token);
                    setatoken(data.token);
                    toast.success("successfully loggin..")
                    navigate('/admin-dashboard')
                }
                else{
                    toast.error(data.message);
                }
            }
            else{
                const {data} = await axios.post(backendurl + '/api/doctors/login' , {email , password});
                if(data.success){
                    localStorage.setItem("dtoken" , data.token);
                    setdtoken(data.token);
                    navigate('/doctors-dashboard')
                    toast.success("successfully loggin..")
                }
                else{
                    toast.error(data.message);
                }
            }

        }
        catch(error){
            toast.error(error.message);
        }
    }





    return (
    <form className="min-h-[80vh] flex items-center" onSubmit={(e) =>onsubmithandler(e)}>
        <div className="flex flex-col gap-3 m-auto items-start  p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
            <p className="text-2xl font-semibold m-auto"><span className="text-[#5F6FFF]">{state}</span> Login</p>
            <div className="w-full">
                <p>Email</p>
                <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" required className="border border-[#DADADA] rounded w-full p-2 mt-2"/>
            </div>

            <div className="w-full">
                <p>Password</p>
                <input onChange={(e)=>setpassword(e.target.value)} value={password}  type="password" required className="border border-[#DADADA] rounded w-full p-2 mt-2" />
            </div>

            <button className="bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base cursor-pointer">Login</button>
            {
                state === "admin"
                ? <p>Doctor Login ?<span className="text-#5F6FFF cursor-pointer underline" onClick={() =>setstate("doctor")}> Click Here</span></p>
                : <p>Admin Login ?<span className="text-#5F6FFF cursor-pointer underline" onClick={()=> setstate("admin")}> Click Here</span></p>
            }
        </div>
    </form>
  )
}

export default Login