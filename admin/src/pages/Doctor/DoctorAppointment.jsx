import { useContext, useEffect } from "react"
import { Doctorcontext } from "../../context/Doctorcontext"
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointment = () => {

    const {dtoken , appointments, getappointments , calculateage , completeappointment , cancelappointment} = useContext(Doctorcontext);
 

    useEffect(() =>{
        if(dtoken){
            getappointments();
        }
    } ,[dtoken])

   

  return (
    <div className="w-full mex-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Appointments</p>

        <div className="bg-white border rounded text-sm max-h-[80vh]  min-h-[50vh] overflow-y-scroll">

            <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3  px-6 border-b">
                <p>sno</p>
                <p>Patient</p>
                <p>Payment</p>
                <p>Age</p>
                <p>Date & Time</p>
                <p>Fees</p>
                <p>Action</p>
            </div>
                        
            {
               appointments.map((item , index) =>(
                    <div key={index} className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1  items-center text-gray-500 py-3 px-6 hover:bg-gray-50">
                        <p className="max-sm:hidden">{index+1}</p>
                        <div className="flex items-center gap-2">
                            <img src={item.userdata.image} className="w-8 rounded-full" alt="" />
                            <p>{item.userdata.name}</p>
                        </div>

                        <div>
                            <p className="text-xs inline border border-purple-500 px-2 rounded-full">{item.payment ? 'ONLINE' : 'CASH'}</p>
                        </div>

                        <p className="max-sm:hidden">{item.userdata.dob === "NOT SELECTED" ?"--" :calculateage(item.userdata.dob)}</p>

                        <p>{item.slotdate} , {item.slottime}</p>

                        <p>${item.amount}</p>

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
               ))
            }
        </div>
    </div>
  )
}

export default DoctorAppointment