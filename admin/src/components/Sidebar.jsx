import { useContext } from "react"
import { Admincontext } from "../context/Admincontext"
import { assets } from "../assets/assets_admin/assets";
import { NavLink } from "react-router-dom";
import { Doctorcontext } from "../context/Doctorcontext";

const Sidebar = () => {
  
    const {atoken} = useContext(Admincontext);
    const {dtoken} = useContext(Doctorcontext);
  
  
  
  
    return (
    <div className="min-h-screen bg-white border-r">
        {
            atoken && <ul className="text-[##515152]">
                <NavLink to={"/admin-dashboard"} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:mmin-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""}`}>
                    <img src={assets.home_icon} alt="" />
                    <p>Dashboard</p>
                </NavLink>

                <NavLink to={"/all-appointments"} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:mmin-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""}`}>
                    <img src={assets.appointment_icon} alt="" />
                    <p>Appointments</p>
                </NavLink>

                <NavLink to={"/add-doctor"} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:mmin-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""}`}>
                    <img src={assets.add_icon} alt="" />
                    <p>Add Doctor</p>
                </NavLink>

                <NavLink to={"/doctors-list"} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:mmin-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""}`}>
                    <img src={assets.people_icon} alt="" />
                    <p>Doctors List</p>
                </NavLink>


            </ul>
        }

{
            dtoken && <ul className="text-[##515152]">
                <NavLink to={"/doctors-dashboard"} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:mmin-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""}`}>
                    <img src={assets.home_icon} alt="" />
                    <p className="hidden md:block">Dashboard</p>
                </NavLink>

                <NavLink to={"/doctors-appointments"} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:mmin-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""}`}>
                    <img src={assets.appointment_icon} alt="" />
                    <p className="hidden md:block">Appointments</p>
                </NavLink>


                <NavLink to={"/doctors-profile"} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:mmin-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""}`}>
                    <img src={assets.people_icon} alt="" />
                    <p className="hidden md:block">Profile</p>
                </NavLink>


            </ul>
        }
    </div>
  )
}

export default Sidebar