import { useContext, useEffect, useState } from "react"
import { Doctorcontext } from "../../context/Doctorcontext"
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {

  const {dtoken , backendurl, profiledata , setprofiledata , getprofiledata} = useContext(Doctorcontext);
  const [isedit , setisedit] = useState(false);


  const updateprofile = async() =>{

    const updatedata = {
      address: profiledata.address,
      fees:profiledata.fees,
      available:profiledata.available
    }

    try{
      const {data} = await axios.post(backendurl + "/api/doctors/updateprofile" , updatedata , {headers:{dtoken}});

      if(data.success){
        toast.success(data.message);
        setisedit(false);
        getprofiledata();
      }
      else{
        toast.error(data.message);
      }
    }
    catch(error){
      toast.error(error.message);
    }
  }






  useEffect(() =>{
    if(dtoken){
      getprofiledata();
    }
  },[dtoken])


  return profiledata &&(

    <div>
      <div className="flex flex-col gap-2 m-5">

        <div>
          <img src={profiledata.image} alt="" className="bg-[#5F6FFF] w-full sm:max-w-64 rounded-lg"/>
        </div>

        <div className="flex-1 border border-stone-100 rounded-lg  background-white">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{profiledata.name}</p>
          <div className="flex items-center gap-2  text-gray-600">
            <p>{profiledata.degree} - {profiledata.speciality}</p>
            <button className="py-0.5 px-2 border- text-xs rounded-full">{profiledata.experience} Years</button>
          </div>
        </div>


        <div>
          <p className="flex items-center gap-1 text-sm  font-medium text-neutral-800 ">About</p>
          <p className="text-sm text-gray-600 max-w-[700px]">{profiledata.about}</p>
        </div>

        <p className="text-gray-600 font-medium mt-2">Appointment Fee: <span className="text-gray-800">${isedit ? <input type="number" value={profiledata.fees} onChange={(e)=>setprofiledata(prev => ({...prev , fees:e.target.value}))} /> :profiledata.fees}</span></p>

        <div className="flex gap-2 ">
          <p>Address :-</p>
          <p className="text-sm">{isedit ? <input placeholder="address line 1" type="text" onChange={(e)=>setprofiledata(prev => ({...prev , address:{...prev.address , line1:e.target.value}}))} value={profiledata.address.line1} /> :profiledata.address.line1} <br /> 
          {isedit ? <input placeholder="address line 2" type="text"  onChange={(e)=>setprofiledata(prev => ({...prev , address:{...prev.address , line2:e.target.value}}))} value={profiledata.address.line2}  /> : profiledata.address.line2}</p>
        </div>

        <div className="flex gap-1 pt-2">
          <input onChange={()=> isedit && setprofiledata(prev => ({...prev , available: !prev.available}))} type="checkbox" checked={profiledata.available}/>
          <label htmlFor="">Available</label>
        </div>

        <div>
        {
          isedit
          ?<button onClick={updateprofile} className="px-4 py-1 border border-[#5F6FFF] text-sm rounded-full hover:bg-[#5F6FFF] hover:text-white transition-all duration-300 ">Save</button>
          :<button onClick={()=>setisedit(true)} className="px-4 py-1 border border-[#5F6FFF] text-sm rounded-full hover:bg-[#5F6FFF] hover:text-white transition-all duration-300 ">Edit</button>
        }
        </div>

      </div>
      
    </div>
  )
}

export default DoctorProfile