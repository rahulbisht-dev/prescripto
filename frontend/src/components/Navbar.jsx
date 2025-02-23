import { useContext, useState } from "react";
import {assets} from "../assets/assets_frontend/assets"
import { NavLink, useNavigate } from "react-router-dom"
import { AppContext } from "../context/Context";

const Navbar = () => {

    const navigate = useNavigate();
    const[showmenu , setshowmenu] = useState(false);
    const{token , settoken , userdata} = useContext(AppContext);

  return  (
    <div  className="flex items-center justify-between text-sm py-4 border-b border-b-gray-600 ">
        <img src={assets.logo} alt="" className="w-44 cursor-pointer" onClick={()=>navigate("/")}/>
        <ul className="hidden md:flex  items-start  gap-5 font-medium">
            <NavLink to="/">
                <li className="py-1">Home</li>
                <hr className="outline-none border-none h-0.5 bg-red-200 m-auto hidden" />
            </NavLink>

            <NavLink to="/doctors">
                <li className="py-1">All Doctors</li>
                <hr className="outline-none border-none h-0.5 bg-red-200 m-auto hidden" />
            </NavLink>

            <NavLink to="/about">
                <li className="py-1">About</li>
                <hr className="outline-none border-none h-0.5 bg-red-200 m-auto hidden" />
            </NavLink>

            <NavLink to="/contact">
                <li className="py-1">Contact</li>
                <hr className="outline-none border-none h-0.5 bg-red-200 m-auto hidden" />
            </NavLink>
        </ul>

        <div className="flex gap-4">
            {token ?
            <div className="flex items-center gap-1 cursor-pointer group relative">
                <img src={userdata.image} alt="" className="w-8 rounded-full" />
                <img src={assets.dropdown_icon} alt="" className="w-2.5"/>

                <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block">
                    <div className="min-w-48 flex flex-col rounded bg-stone-200 gap-4">
                    <p onClick={()=>navigate("/profile")} className="hover:text-red-600 cursor-pointer">My Profile</p>
                    <p onClick={()=>navigate("/myappointment")} className="hover:text-red-600 cursor-pointer">My Appointments</p>
                    <p onClick={()=>{settoken(""); localStorage.removeItem("token")}} className="hover:text-red-600 cursor-pointer">Logout</p>
                    </div>
                </div>
            </div>

            :<button className="bg-violet-500 text-white px-8 py-3 rounded-full font-light" onClick={()=>navigate("/login")}>Create Account</button>

            }

            <img src={assets.menu_icon} alt="" className="w-6 md:hidden" onClick={()=>setshowmenu(true)}/>

            {/* MOBILE MENU */}

            <div className={`${showmenu ? "fixed w-full" : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}>

                <div className="flex items-center justify-between px-5 py-6">
                    <img src={assets.logo} alt="" className="w-36" />
                    <img src={assets.cross_icon} alt="" className="w-7" onClick={()=>setshowmenu(false)}/>
                </div>

                <ul className="flex flex-col items-center gap-2 mt-5 px-5 font-medium">
                    <NavLink onClick={()=>setshowmenu(false)} to="/"><p  className="px-4 py-2 rounded inline-block">Home</p></NavLink>
                    <NavLink onClick={()=>setshowmenu(false)} to="/doctors"><p  className="px-4 py-2 rounded inline-block">All Doctors</p></NavLink>
                    <NavLink onClick={()=>setshowmenu(false)} to="/about"><p  className="px-4 py-2 rounded inline-block">About</p></NavLink>
                    <NavLink onClick={()=>setshowmenu(false)} to="/contact onClick={setshowmenu(false)}"><p  className="px-4 py-2 rounded inline-block">Contact</p></NavLink>
                </ul>
            </div>
        </div>
    </div>
  )
}




export default Navbar