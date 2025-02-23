import { assets } from "../assets/assets_frontend/assets"

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10text-gray-500">
        <p>ABOUT <span className="text-gray-700 font-bold">US</span></p>
      </div>


      <div className="my-10 flex flex-col  md:flex-row gap-12">
        <img src={assets.about_image} alt="" className="w-full max-w-[360px]"/>
        <div className="flex flex-col justifu-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>Welcome to the prescripto , your trusted partner n managing your healthcare needs connect with the best doctor from your country and take any time appointment to the doctors thanks a lot for using our website.</p>
          <p>Welcome to the prescripto , your trusted partner n managing your healthcare needs connect with the best doctor from your country and take any time appointment to the doctors thanks a lot for using our website.</p>
          <b>Our Vision</b>
          <p>Welcome to the prescripto , your trusted partner n managing your healthcare needs connect with the best doctor from your country and take any time appointment to the doctors thanks a lot for using our website.</p>
        </div>
      </div>

      <div>
        <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
      
        <div className="border px-10 md:px-15 py-8 sm:py-16 flex flex-col text-[15px] hover:bg-purple-800 hover:text-white transition-all duration-300 cursor-pointer border-gray-00">
          <b>Efficiency</b>
          <p>Welcome to the prescripto , your trusted partner n managing your healthcare needs connect with the best doctor from your country and take any time appointment to the doctors thanks a lot for using our website.</p>
        </div>

        <div className="border px-10 md:px-15 py-8 sm:py-16 flex flex-col text-[15px] hover:bg-purple-800 hover:text-white transition-all duration-300 cursor-pointer border-gray-00">
        <b>Convienence</b>
        <p>Welcome to the prescripto , your trusted partner n managing your healthcare needs connect with the best doctor from your country and take any time appointment to the doctors thanks a lot for using our website.</p>
        </div>

        <div className="border px-10 md:px-15 py-8 sm:py-16 flex flex-col text-[15px] hover:bg-purple-800 hover:text-white transition-all duration-300 cursor-pointer border-gray-00">
        <b>Personalization</b>
        <p>Welcome to the prescripto , your trusted partner n managing your healthcare needs connect with the best doctor from your country and take any time appointment to the doctors thanks a lot for using our website.</p>
        </div>
      </div>


    </div>
  )
}

export default About