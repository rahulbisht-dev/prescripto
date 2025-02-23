import { assets } from "../assets/assets_frontend/assets"

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-violet-600 rounded-lg px-6 md:px-10 lg:px-20">
        {/* left side header */}

        <div className="md:w-1/2 flex flex-col items-start gap-4 justify-center py-10 m-auto md:py-[10vw] md:mb-[-30px]">
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
                Book Appointment <br />With Trusted Doctors
            </p>

            <div className="flex flex-col  md:flex-row items-center gap-3 text-white text-sm font-light">
                <img src={assets.group_profiles} alt="" />
                <p>Simply browse through our extensive list of truseted doctors, <br className="hidden sm:block "/>Schedule your appointment now.</p>
            </div>

            <a href="#speciality" className="bg-white flex items-center gap-2 px-8 rounded-full py-3 hover:scale-101 transition-all duration-300 "> Book Appointment <img src={assets.arrow_icon} alt="" /></a>
        </div>

        {/* right side header */}

        <div className="md:w-1/2 relative"> 
            <img src={assets.header_img} alt="" className="w-full absolute bottom-0 h-auto rounded-lg" />
        </div>
    </div>
  )
}

export default Header