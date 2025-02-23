import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../context/Context";
import { assets } from "../assets/assets_frontend/assets";
import Relateddoctors from "../components/Relateddoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {

  const {doctorid} = useParams();
  const daysweek = [ "sun" , "mon" , "tue" , "wed" , "thr" , "fri" , "sat"];
  const montharr = [ 'jan' , 'feb' , 'mar' , 'apr' , 'may' , 'jun' , 'jul' , 'aug' , 'sep' , 'oct' , 'nov' , 'dec' ]


  const {doctors , currency , backendurl , token , getdoctorsdata} = useContext(AppContext);

  const [docinfo , setdocinfo] = useState(null);
  const [docslot , setdocslot] = useState([]);
  const [slotindex , setslotindex] = useState(0);
  const [slottime , setslottime] = useState("");


  const navigate = useNavigate();

  const fetchdocinfo = async() =>{
    const doctorinfo = doctors.find((doc)=>{ return doc._id === doctorid})
    setdocinfo(doctorinfo);
  }


  const getavailableslots = () =>{
    setdocslot([]);

    let today = new Date();

    for(let i = 0; i<7; i++){

      // setting total dates for the 7 days leter from today.
      let currentdate = new Date(today);
      currentdate.setDate(today.getDate() + i);


      // setting end time for the doctor in the day.
      let endtime = new Date();
      endtime.setDate(today.getDate() + i);
      endtime.setHours(21,0,0,0);


      //setting working hours for the doctor for a day.

      if(today.getDate() === currentdate.getDate()){
        currentdate.setHours(currentdate.getHours() > 10 ? currentdate.getHours() + 1 : 10);
        currentdate.setMinutes(currentdate.getMinutes() > 30 ? 30 : 0);
      }
      else{
        currentdate.setHours(10);
        currentdate.setMinutes(0);
      }


      // setting all the working hours for the doctor for all the days
      let finaldata = [];

      while(currentdate < endtime){
        let formattedtime = currentdate.toLocaleTimeString([] , {hour:"2-digit" , minute:"2-digit" , hour12:true});

        let day = currentdate.getDate();
        let month = currentdate.getMonth()+1;
        let year = currentdate.getFullYear();

        const slotdate = day + '-' + month + '-'+ year;
        const slottime = formattedtime;
        
        if(docinfo){
          const isSlotavailable = docinfo.slots_booked[slotdate] && docinfo.slots_booked[slotdate].includes(slottime) ? false : true;

          if(isSlotavailable){
            
            finaldata.push({
              date: new Date(currentdate),
              time:formattedtime
            })
          }
        }



        // increasing current time by 30 minutes....
        currentdate.setMinutes(currentdate.getMinutes() + 30)
      }

      setdocslot((prev) => ([...prev , finaldata]));

    }
  }


  const Bookappointment = async() =>{
    if(!token){
      toast.warn('login to book the appointment..');
      return navigate('/login')
    }


    try{
      const date = docslot[slotindex][0].date;

      let day = date.getDate();
      let month = date.getMonth()+1;
      let year = date.getFullYear();

      const slotdate = day +'-' + montharr[month] + '-' + year;

      const {data} = await axios.post(backendurl + '/api/user/bookappointment' , {doctorid , slotdate , slottime} , {headers:{token}});

      if(data.success){
        toast.success(data.message);
        getdoctorsdata();
        navigate('/myappointment')
      }
      else{
        toast.error(data.message);
      }
    }
    catch(error){
      toast.error(error.message);
    }




  }



  useEffect(()=>{
    fetchdocinfo();
  } , [doctors , doctorid])


  useEffect(() =>{
    getavailableslots();
  } , [docinfo])



  return docinfo && (
    <div>
      {/* Doctors details */}

      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img src={docinfo.image} alt="" className="primary w-full sm:max-w-72 rounded-lg"/>
        </div>

         <div className="flex-1 border border-gray-600 rounded-lg px-8 py-7 bg-white mx-2 sm:mx-0 mt-[8px]">
         {/* {DOCTORS DETAILS} */}

         <p className="flex items-center gap-2 font-medium text-2xl text-gray-900">{docinfo.name} <img src={assets.verified_icon} alt="" />  </p>

         <div className="flex items-center  gap-2 text-sm  mt-1 text-gray-600">
          <p>{docinfo.degree}-{docinfo.speciality}</p>
          <button>{docinfo.experience}</button>
         </div>

         <div>
          <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">About <img src={assets.info_icon} alt="" /> </p>
          <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docinfo.about}</p>
         </div>

         <p>Appointment fee : <span className="text-gray-600">{currency}{docinfo.fees}</span></p>


        </div>
      </div>

      {/* booking slots */}

      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-800">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docslot.length && docslot.map((item , index) =>(
            <div onClick={()=>setslotindex(index)} key={index} className={`text-center py-6  min-w-16 rounded-full cursor-pointer ${slotindex===index  ? "primary text-white" : "border border-gray-500"} `}>
              <p>{item[0] && daysweek[item[0].date.getDay()]}</p>
              <p>{item[0] && item[0].date.getDate()}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4 ">
          {docslot.length && docslot[slotindex].map((item , index) =>(
            <p onClick={()=>setslottime(item.time)} key={index} className={`text-sm  font-light px-6  border border-gray-500 rounded-full cursor-pointer ${item.time === slottime ? "primary text-white" : "border border-gray-500"}`}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={()=>Bookappointment()} className="primary text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer">BOOK AN APPOINTMENT</button>
      </div>

      {/* LISTING RELATED DOCTOS */}

      <Relateddoctors docid={doctorid} speciality={docinfo.speciality}/>

    </div>
  )
}

export default Appointment