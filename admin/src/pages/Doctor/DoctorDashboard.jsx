import { useContext, useEffect } from "react"
import { Doctorcontext } from "../../context/Doctorcontext"
import {assets} from "../../assets/assets_admin/assets"


const DoctorDashboard = () => {

  const {dtoken , dashdata , setdashdata , getdashdata , cancelappointment , completeappointment} = useContext(Doctorcontext);



  useEffect(() =>{
    if(dtoken){
      getdashdata();
    }
  } , [dtoken])



  return dashdata &&(

    <div>
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
          {dashdata.latestappointments.map((item , index) =>(
            <div key={index} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
              <img src={item.userdata.image} alt="" className="w-10 rounded-full"/>
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.userdata.name}</p>
                <p className="text-gray-600">{item.slotdate}</p>                
              </div>
              {item.cancelled && <p className="text-red-600">Cancelled</p>}
                        {item.iscompleted && <p className="text-green-500">Completed</p>}
                    
                        {!item.cancelled && !item.iscompleted 
                        ?<div className="flex">
                            <img src={assets.tick_icon} alt=""  className="w-10" onClick={()=> completeappointment(item._id)}/>
                            <img src={assets.cancel_icon} alt="" className="w-10"  onClick={()=>cancelappointment(item._id)}/>
                        </div>
                        :""
                    }        
            </div>
          ))}
        </div>
        </div>

      </div>

  )
}

export default DoctorDashboard