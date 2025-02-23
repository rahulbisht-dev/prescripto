import { useContext } from "react"
import { Admincontext } from "../../context/Admincontext"
import { useEffect } from "react";
import {assets} from '../../assets/assets_admin/assets'

const Dashboard = () => {


  const {dashdata , getdashdata , atoken , cancelappointment} = useContext(Admincontext);



  useEffect(() =>{
    if(atoken){
      getdashdata();
    }
  },[atoken])

  return dashdata && (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-102 transition-all">
          <img src={assets.doctor_icon} alt="" className="w-14 "/>
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashdata.doctors}</p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>


        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-102 transition-all">
          <img src={assets.appointments_icon} alt="" className="w-14"/>
          <div>
            <p  className="text-xl font-semibold text-gray-600">{dashdata.appointments}</p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>



        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-102 transition-all">
          <img src={assets.patients_icon} alt="" className="w-14"/>
          <div>
            <p  className="text-xl font-semibold text-gray-600">{dashdata.users}</p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>

      </div>

      <div className="bg-white ">

        <div className="flex items-center gap-2.5 px-4 py-4 nt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4 border border-t-0 ">
          {dashdata.latestAppointments.map((item , index) =>(
            <div key={index} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
              <img src={item.doctordata.image} alt="" className="w-10 rounded-full"/>
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.doctordata.name}</p>
                <p className="text-gray-600">{item.slotdate}</p>                
              </div>
            {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.iscompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p>
            : <img onClick={()=>cancelappointment(item._id)}  src={assets.cross_icon} alt="" className='w-8 cursor-pointer'/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard