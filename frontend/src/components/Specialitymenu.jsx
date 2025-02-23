import { Link } from "react-router-dom"
import { specialityData } from "../assets/assets_frontend/assets"

const Specialitymenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center gap-4 py-18 text-gray-800">
        <h1 className="text-3xl font-medium">Find By Speciality</h1>
        <p className="w-1/3 text-center text-small">browse through opur extensive list of trusted doctors , schedule your application hassle-free.</p>

        <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
            {specialityData.map((item , index)=>(
                <Link  onClick={()=>scrollTo(0, 0)} to={`/doctors/${item.speciality}`} key={index} className="flex flex-col items-center cursor-pointer  transition-all duration-500 hover:translate-y-[-10px]">
                    <img src={item.image} alt="" className="w-16 sm:w-24 mb-2"/>
                    <p>{item.speciality}</p>
                </Link>
            ))}
        </div>

    </div>
  )
}

export default Specialitymenu