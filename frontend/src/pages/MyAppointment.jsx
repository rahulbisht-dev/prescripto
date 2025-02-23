import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/Context"
import { toast } from "react-toastify";
import axios from "axios";


const MyAppointment = () => {


    const {backendurl , token , getdoctorsdata} = useContext(AppContext);

    const [appointments , setappointments] = useState([]);




    const getuserappointments = async() =>{
        
        try{
            const {data} = await axios.get(backendurl + '/api/user/listappointments' , {headers:{token}});

            if(data.success){
                setappointments(data.appointments.reverse());
            }

        }
        catch(error){
            toast.error(error.message)
        }
    }


    const cancelappointment = async(appointmentid) =>{

        try{

            const {data} = await axios.post(backendurl + '/api/user/cancelappointment' , {appointmentid} , {headers:{token}})

            if(data.success){
                toast.success(data.message);
                getuserappointments();
                getdoctorsdata();
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }


    const appointmentrajorpay = async(appointmentid) =>{

        try{
            const {data} = await axios.post(backendurl+'/api/user/payment' , {appointmentid} , {headers:{token}});
            if(data.success){
                console.log(data.order);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }


    useEffect(() =>{
        if(token){
            getuserappointments();
        }
    } , [token])


    if(!appointments.length){
        return <p>YOU HAVE NOT BOOKED ANY APPOINTMENT YET</p>
    }

  return (
    <div>
        <p className="pb-3 mt-12 font-medium text-zinc-700 border-b text-xl">My Appointments</p>
        <div>
            {appointments.slice(0 , 5).map((item , index)=>(
                <div key={index} className=" grid grid-cols-[1fr_2fr]  gap-4 sm:flex sm:gap-6  py-2 border-b">
                    <div>
                        <img src={item.doctordata.image} className="w-32 bg-indigo-50 " alt="" />
                    </div>

                    <div className="flex-1 text-small text-zinc-600">
                        <p className="text-neutral-800 font-semibold">{item.doctordata.name}</p>
                        <p>{item.doctordata.speciality}</p>
                        <p className="text-zinc-700 font-medium mt-1">Address:</p>
                        <p className="text-xs">{item.doctordata.address.line1}</p>
                        <p className="text-xs">{item.doctordata.address.line2}</p>
                        <p className="text-sm mt-1"><span className="text-sm text-neutral-700">Date & Time:</span> {item.slotdate} | {item.slottime}</p>
                    </div>

                    <div></div>

                    <div className="flex flex-col gap-2 justify-end">
                      {!item.cancelled && !item.iscompleted && <button onClick={()=>appointmentrajorpay(item._id)} className="text-sm text-stone-500 text-center sm:min-w48 py-2 border rounded hover:bg-violet-500 hover:text-white transition-all duration-200">Pay Online</button>}  
                      {!item.cancelled && !item.iscompleted && <button onClick={()=>cancelappointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-200">Cancel Appointment</button>}
                      {item.iscompleted && <button className="sm:min-w-48 py-2 border   rounded text-green-500">Completed</button>}
                      {item.cancelled && !item.iscompleted && <button className="sm:min-w-48 py-2 border border-red-700  rounded text-red-500">Appointment Cancelled</button>}  
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyAppointment