import { useContext, useState } from "react"
import { AppContext } from "../context/Context";
import {assets} from "../assets/assets_frontend/assets.js"
import { toast } from "react-toastify";
import axios from "axios";
const Profile = () => {



const {userdata , setuserdata , token , backendurl , loaduserprofile} = useContext(AppContext);
console.log(userdata);

  const [isedit , setisedit] = useState(false);
  const[image , setimage]  = useState(false);

  const updateuserprofiledata = async() =>{

    try{
      const formdata = new FormData();
      formdata.append("name" , userdata.name);
      formdata.append("phone" , userdata.phone);
      formdata.append("gender" , userdata.gender);
      formdata.append("dob" , userdata.dob);
      formdata.append("address" , JSON.stringify(userdata.address));

      image && formdata.append("image" , image);

      const {data} = await axios.post(backendurl + "/api/user/updateprofile" , formdata , {headers:{token}});

      if(data.success){
        toast.success(data.message);
        await loaduserprofile();
        setisedit(false);
        setimage(false)
      }
      else{
        toast.error(data.message);
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.message)
    }

  }


  return userdata && (
    <div className="max-w-lg flex flex-col gap-2 text-sm ">
      {
        isedit
        ? <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img src={image ? URL.createObjectURL(image) : userdata.image} alt="" className="w-36 rounded opacity-75"/>
            <img src={image ? "" : assets.upload_icon} alt="" className="w-10 absolute bottom-12 right-12" />
          </div>
          <input type="file" id="image" hidden onChange={(e) =>setimage(e.target.files[0])} />
        </label>

        :      <img src={userdata.image} alt="" className="w-36 rounded" />

      }
      {isedit
      ?<input type="text" value={userdata.name} className="bg-gray-50 text-3xl font-medium max-w-60 mt-4" onChange={(e)=> setuserdata((prev) => ({...prev , name:e.target.value}))}/>
      : <p className="font-medium text-3xl text-neutral-800 mt-4">{userdata.name}</p>
    }

    <hr className="bg-zinc-400 h-[1px] border-none"/>
    <div>
      <p className="text-neutral-500 underline mt-3">Contact Information</p>
      <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
        <p className="font-medium">Email Id</p>
        <p className="text-blue-500">{userdata.email}</p>
        <p className="font-medium">Phone:</p>
        {isedit
      ?<input className="bg-gray-100 max-w-52" type="text" value={userdata.phone} onChange={(e)=> setuserdata((prev) => ({...prev , phone:e.target.value}))}/>
      : <p className="text-blue-400">{userdata.phone}</p>
        }
        <p className="`font-medium">Address:</p>
        {isedit
        ? <p >
          <input className="bg-gray-100" placeholder="address line 1" type="text" onChange={(e) => setuserdata((prev) =>({...prev , address:{...prev.address , line1:e.target.value}}))} value={userdata.address.line1}/>
          <br />
          <input className="bg-gray-100" type="text" placeholder="address line 2" onChange={(e) => setuserdata((prev) =>({...prev , address:{...prev.address , line2:e.target.value}}))} value={userdata.address.line2}/>
        </p>
        : <p className="text-gray-500">
          {userdata.address.line1}
          <br />
          {userdata.address.line2}
        </p>
        }

      </div>
    </div>

    <div>
      <p className="text-neutral-500 underline mt-3">Basic information</p>
      <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
        <p className="font-medium">Gender : </p>
        {isedit
       ? <select className="max-w-20 bg-gray-100" onChange={(e) => setuserdata((prev) => ({...prev , gender:e.target.value}))} value={userdata.gender}>
        <option value="male">male</option>
        <option value="female">female</option>
       </select>
      : <p className="text-gray-400">{userdata.gender}</p>
        }

        <p className="font-medium">Birthday :</p>
        {isedit
        ? <input className="max-w-28 bg-gray-100 " type="date" onChange={(e) => setuserdata((prev) =>({...prev , dob:e.target.value}))} value={userdata.dob} />
        : <p className="text-gray-400">{userdata.dob}</p>
        }
      </div>
    </div>

    <div className="mt-10">
      {isedit
      ? <button className="border border-violet-500 px-8 py-2 rounded-full hover:bg-violet-600 hover:text-white transition-all duration-300" onClick={()=>updateuserprofiledata()}>Save Information</button>
      : <button className="border border-violet-500 px-8 py-2 rounded-full hover:bg-violet-600 hover:text-white transition-all duration-300" onClick={()=> setisedit(true)}>Edit</button>
      }
    </div>
    
    </div>
  )
}

export default Profile