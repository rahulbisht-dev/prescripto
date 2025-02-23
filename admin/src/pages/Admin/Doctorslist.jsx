import { useContext, useEffect } from "react"
import { Admincontext } from "../../context/Admincontext"

export const Doctorslist = () => {

  const {changeavailability , doctors , atoken , getalldoctors} = useContext(Admincontext);

  useEffect(() =>{
    if(atoken){
      getalldoctors();
}  } , [atoken])




  return (
    <div className="m-5 max-h-[90vh]  overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>

      <div className="flex flex-wrap gap-4 pt-5 gap-y-6 ">
        {doctors.map((item , index)=>(
          <div key={index} className="border border-indigo-200  rounded-xl max-w-56 overflow-hidden cursor-pointer group">
            <img src={item.image} alt="" className="bg-indigo-50  group-hover:bg-[#5F6FFF] transition-all duration-300"/>
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
              <p className="text-zinc-800 text-sm">{item.speciality}</p>
              <div>
                <input onChange={()=>changeavailability(item._id)} type="checkbox" checked={item.available} className="mt-2 flex items-center gap-1 text-sm"/>
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
