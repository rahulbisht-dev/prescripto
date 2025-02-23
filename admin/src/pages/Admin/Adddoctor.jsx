import { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { Admincontext } from '../../context/Admincontext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Adddoctor = () => {
  
    const [docimg , setdocimg] = useState(false);
    const [name , setname] = useState('');
    const[email , setemail] = useState('');
    const[about , setabout] = useState('');
    const [fees , setfees] = useState('');
    const [password ,setpassword] = useState('');
    const [experience , setexperience] = useState('1 Year');
    const [speciality , setspeciality] = useState('General Physician');
    const[degree , setdegree] = useState('');
    const[address1 , setaddress1] = useState('');
    const[address2 , setaddress2] = useState('');
  


    const {backendurl , atoken} = useContext(Admincontext);

    const onsubmithandler = async(e) =>{
        e.preventDefault();

        try{
            if(!docimg){
                return toast.error("image not selected ...")
            }

            const formdata = new FormData()
            formdata.append("image" , docimg )
            formdata.append("name" , name )
            formdata.append("email" , email )
            formdata.append("password" , password )
            formdata.append("experience" , experience )
            formdata.append("fees" , fees )
            formdata.append("about" , about )
            formdata.append("speciality" , speciality )
            formdata.append("degree" , degree )
            formdata.append("address" , JSON.stringify({line1:address1 , line2:address2}));

            const {data} = await axios.post(backendurl+"/api/admin/add-doctor" , formdata, {headers:{atoken}})
            console.log(data)

            if(data.success){
                toast.success(data.message);
                setdocimg(false);
                setname('');
                setpassword('');
                setemail('');
                setaddress1('');
                setaddress2('');
                setdegree('');
                setabout('');
                setfees('');
            }
            else{
                toast.error(data.message);
            }

        }
        catch(error){
            toast.error(error);
        }
    }

return (
    
    <form className='m-5 w-full' onSubmit={(e)=>onsubmithandler(e)}>
        <p className='mb-3 text-lg font-medium'>Add Doctor</p>

        <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
            <div className='flex items-center gap-4 mb-8 text-gray-600'>
                <label htmlFor='doc-img'>
                    <img src={docimg ? URL.createObjectURL(docimg) :assets.upload_area} alt="" className='w-46 bg-gray-100 rounded-full cursor-pointer'/>
                </label>
                <input type="file" id='doc-img' onChange={(e)=>setdocimg(e.target.files[0])} hidden/>
                <p>Upload Doctor Picture</p>
            </div>

            <div className='flex flex-col lg:flex-row  items-start gap-10 text-gray-600'>
                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Name</p>
                        <input onChange={(e)=>setname(e.target.value)} value={name} type="text" placeholder='Name' required className='border rounded px-3 py-2'/>
                    </div>

                    <div  className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Email</p>
                        <input onChange={(e)=>setemail(e.target.value)} value={email} type="text" placeholder='email' required  className='border rounded px-3 py-2' />
                    </div>

                    <div  className='flex-1 flex flex-col gap-1'>
                        <p>Password</p>
                        <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" placeholder='Password' required  className='border rounded px-3 py-2'/>
                    </div>

                    <div  className='flex-1 flex flex-col gap-1'>
                        <p>Exprience</p>
                        <select name='' id=""  className='border rounded px-3 py-2' onChange={(e)=>setexperience(e.target.value)} value={experience}>
                            <option value="1">1 Year</option>
                            <option value="2">2 Year</option>
                            <option value="3">3 Year</option>
                            <option value="4">4 Year</option>
                            <option value="5">5 Year</option>
                            <option value="6">6 Year</option>
                            <option value="7">7 Year</option>
                            <option value="8">8 Year</option>
                            <option value="9">9 Year</option>
                            <option value="10">10 Year</option>
                        </select>
                    </div>

                    <div  className='flex-1 flex flex-col gap-1'>
                        <p>Fees</p>
                        <input onChange={(e)=>setfees(e.target.value)} value={fees} type="Number" placeholder='Fees' required  className='border rounded px-3 py-2'/>
                    </div>

                </div>


                <div className='w-full lg:flex-1  flex flex-col gap-4'>
                    <div className='flex-1 flex-col gap-1'>
                        <p>Speciality</p>
                        <select name="" id=""  className='border rounded px-3 py-2' onChange={(e)=>setspeciality(e.target.value)} value={speciality}>
                            <option value="General physician">General physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gestroenterologist">Gastroenterologist</option>
                        </select>
                    </div>


                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Education</p>
                        <input onChange={(e)=>setdegree(e.target.value)} value={degree} type="text" placeholder='Education' required  className='border rounded px-3 py-2'/>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Address</p>
                        <input type="text" placeholder='Address 1' required  className='border rounded px-3 py-2' onChange={(e)=>setaddress1(e.target.value)} value={address1}/>
                        <input type="text" placeholder='Address 2' required  className='border rounded px-3 py-2'onChange={(e)=>setaddress2(e.target.value)} value={address2}/>
                    </div>
                </div>
            </div>
            <div>
              <p className='mt-4 mb-2'>About Doctor</p>
              <textarea onChange={(e)=>setabout(e.target.value)} value={about} placeholder="write about doctor" rows="5" className='w-full px-4 py-2 border rounded'  />
            </div>

            <button type='submit' className='bg-[#5F6FFF] px-10 py-3 mt-4 text-white rounded-full cursor-pointer hover:scale-102'>ADD DOCTOR</button>
        </div>
    </form>
  )
}

export default Adddoctor