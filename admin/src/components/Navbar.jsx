import { useContext } from "react"
import { assets } from "../assets/assets_admin/assets"
import { Admincontext } from "../context/Admincontext"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Doctorcontext } from "../context/Doctorcontext";

const Navbar = () => {
  
    const {atoken , setatoken} = useContext(Admincontext);
    const {dtoken , setdtoken} = useContext(Doctorcontext);
 
    const logout = () =>{

        
        atoken && setatoken("")
        atoken && localStorage.removeItem('atoken');
        dtoken && setdtoken("");
        dtoken && localStorage.removeItem('dtoken');
        toast.success('LOGGED OUT SUCCESSFULLY')
        
    }
  
  
    return (
    <div className="flex justify-between items-center  px-4 sm:px-10  py-3 border-b bg-white">
        <div className="flex items-center gap-2 text-xs">
            <img src={assets.admin_logo} alt=""  className="w-36 cursor-pointer"/>
            <p className="border px-2.5 rounded-full py-0.5 border-gray-500 text-gray-600">{atoken ? "admin" : "doctor"}</p>
        </div>

        <button onClick={()=>logout()}  className="bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full cursor-pointer">Logout</button>
    </div>
  )
}

export default Navbar