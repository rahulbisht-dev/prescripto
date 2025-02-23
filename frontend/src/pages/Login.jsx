import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () =>{


  const {token , settoken , backendurl} = useContext(AppContext);
  const navigate = useNavigate();

  const [state , setstate] = useState('sing up');
  const [email , setemail] = useState("");
  const[password , setpassword] = useState("");
  const[name , setname] = useState("");


  const onsubmithandler = async(e) =>{
    e.preventDefault();

    try{
      if(state==="sign up"){
        const {data} = await axios.post(backendurl + "/api/user/register" , {name , email , password});
        if(data.success){
          localStorage.setItem('token' , data.token);
          settoken(data.token);
          toast.success("successfully registered")
        }
        else{
          toast.error(data.message);
        }
      }
      else{
          const {data} = await axios.post(backendurl + "/api/user/login" , {name , email , password});
          if(data.success){
            localStorage.setItem('token' , data.token);
            settoken(data.token);
            toast.success("successfully logged in")
          }
          else{
            toast.error(data.message);
          }
        }

    }
    catch(error){
      toast.error(error.message);
    }
  }


  useEffect(() =>{
    if(token){
      navigate("/");
    }
  },[token])

  return(
    <form className="min-h-[80vh] flex items-center" onSubmit={onsubmithandler}>
      <div className="flex flex-col gap-3  m-auto items-center p-8 min-w-[380px]sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === "sign up" ? "Create Account" :"login"}</p>
        <p>PLease {state === "sign up" ? "sign up" :"login"} to book appointment</p>
        {
          state === "sign up" 
          ? <div className="w-full">
          <p>Full Name</p>
          <input type="text" className="border border-zinc-300 rounded w-full p-2 mt-1"  onChange={(e)=>setname(e.target.value)}  value={name} required/>
        </div>
        :""
        }

        <div className="w-full">
          <p>Email</p>
          <input type="email"  className="border border-zinc-300 rounded w-full p-2 mt-1" onChange={(e)=>setemail(e.target.value)}  value={email} required/>
        </div>

        <div className="w-full">
          <p>Password</p>
          <input type="password"  className="border border-zinc-300 rounded w-full p-2 mt-1" onChange={(e)=>setpassword(e.target.value)}  value={password} required/>
        </div>

        <button type="submit" className="bg-purple-600 text-white w-full py-2 rounded-md text-base">{state === "sign up" ? "Create Account" :"login"}</button>

        {
          state == "sign up" ? <p>Already have an account? <span onClick={()=>setstate("login")} className="text-primary underline cursor-pointer ">Login here</span></p>:
           <p >Create an new account ? <span onClick={()=>setstate("sign up")} className="text-primary underline cursor-pointer ">Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login;