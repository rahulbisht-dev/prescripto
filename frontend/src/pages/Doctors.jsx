import{ useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/Context';
import { Link } from 'react-router-dom';

const Doctors = () => {

  const {speciality} = useParams();
  const {doctors} = useContext(AppContext);
  const [filterdoc , setfilterdoc] = useState([]);
  const [showfilter , setshowfilter] = useState(false);
  const navigate = useNavigate();

  const applyfilter = () =>{

    if(speciality){
      setfilterdoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else{
      setfilterdoc(doctors);
    }
  }
 

  useEffect(()=>{
    applyfilter();
  },[doctors , speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showfilter ? "bg-violet-500 text-white" : ""}`} onClick={()=>setshowfilter(prev => !prev)}>Filters</button>
        <div className={` flex-col gap-4 text:sm text-gray-600 ${showfilter ? "flex" : "hidden sm:flex" }`}>
          <p onClick={()=> speciality === "General physician" ? navigate("/doctors") : navigate("/doctors/General physician")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100" : ""}`}>General Physican</p>
          <p onClick={()=> speciality === "Gynecologist" ? navigate("/doctors") : navigate("/doctors/Gynecologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100" : ""}`}>Gynecologist</p>
          <p onClick={()=> speciality === "Dermatologist" ? navigate("/doctors") : navigate("/doctors/Dermatologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100" : ""}`}>Dermatologist</p>
          <p onClick={()=> speciality === "Pediatricians" ? navigate("/doctors") : navigate("/doctors/Pediatricians")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100" : ""}`}>Pediatricians</p>
          <p onClick={()=> speciality === "Neurologist" ? navigate("/doctors") : navigate("/doctors/Neurologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100" : ""}`}>Neurologist</p>
          <p onClick={()=> speciality === "Gestroenterologist" ? navigate("/doctors") : navigate("/doctors/Gestroenterologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gestroenterologist" ? "bg-indigo-100" : ""}`}>Gestroenterologist</p>
        </div>

        <div className='w-full opgrid gap-4 gap-y-6'>

          {filterdoc.map((item , index)=>(
                <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className="border border-blue-200 rounded-xl overflow-hidden  cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                    <img src={item.image} alt="" className="bg-blue-50"/>
                    <div className="p-4">
                        <div className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-gray-500"}`}>
                            <p className={`w-2 h-2 rounded-full ${item.available ? " bg-green-500" : "bg-red-500"} `}> </p> 
                            <p>{item.available ? "Available" : "Not Available"}</p>
                        </div>
                        <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                        <p className="text-gray-600 text-sm">{item.speciality}</p>
                    </div>
                </div>
            ))
            }

        </div>
      </div>

    </div>
  )
}

export default Doctors