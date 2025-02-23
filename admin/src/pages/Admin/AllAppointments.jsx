import { useContext } from 'react'
import { Admincontext } from '../../context/Admincontext'
import { useEffect } from 'react';
import { Appcontext } from '../../context/Appcontext';
import { assets } from '../../../../frontend/src/assets/assets_frontend/assets';

const AllAppointments = () => {


  const {atoken , getallappointments , appointments , cancelappointment} = useContext(Admincontext);
  const {calculateage , slotdateformat} = useContext(Appcontext);



  useEffect(() =>{

    if(atoken){
      getallappointments();
    }
  } , [atoken])



  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden  sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col px-3 py-3 border-b'>
          <p>$</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item , index) =>(
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2  sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 hover:bg-gray-50  '>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userdata.image} className='w-8 rounded-full'/>
              <p>{item.userdata.name}</p>
            </div>
            <p className='max-sm:hidden'>{item.userdata.dob === "NOT SELECTED" ?"--" :calculateage(item.userdata.dob)}</p>
            <p>{item.slotdate} , {item.slottime}</p>

            <div className='flex items-center gap-2'>
              <img src={item.doctordata.image} className='w-8 rounded-full bg-gray-200'/>
              <p>{item.doctordata.name}</p>
            </div>

            <p>${item.amount}</p>
            {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.iscompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p>
            : <img onClick={()=>cancelappointment(item._id)}  src={assets.cross_icon} alt="" className='w-8 cursor-pointer'/>}
            
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllAppointments