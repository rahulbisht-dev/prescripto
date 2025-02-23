import { useContext } from "react"
import Login from "./pages/Login"
import { Admincontext } from "./context/Admincontext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import Adddoctor from "./pages/Admin/Adddoctor";
import { Doctorslist } from "./pages/Admin/Doctorslist";
import { Doctorcontext } from "./context/Doctorcontext";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";

const App = () => {

  const {atoken} = useContext(Admincontext);
  const {dtoken} = useContext(Doctorcontext);


  return atoken || dtoken ? (
    <div className="bg-[#F8F9FD]">
      <Navbar/>
      <div className="flex items-start">
        <Sidebar/>
        <Routes>
          {/* ADMIN ROUTES */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard/>} />
          <Route path="/all-appointments" element={<AllAppointments/>} />
          <Route path="add-doctor" element={<Adddoctor/>}/>
          <Route path="/doctors-list" element={<Doctorslist/>} />


        {/* DOCTOR ROUTES */}

        <Route path="/doctors-dashboard" element={<DoctorDashboard/>} />
        <Route path="/doctors-appointments" element={<DoctorAppointment/>} />
        <Route path="/doctors-profile" element={<DoctorProfile/>} />
        </Routes>
      </div>
    </div>
  )
  : (
    <>
    <Login/>
    </>
  )
}

export default App