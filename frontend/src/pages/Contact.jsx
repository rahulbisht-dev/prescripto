import {assets} from "../assets/assets_frontend/assets"

const Contact = () => {
  return (
    <div>

      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>Contact Us</p>
      </div>


      <div className="my-10 flex flex-col justify-center md:flex-row  gap-10 mb-28 text-sm">
        <img src={assets.contact_image} alt="" className="w-full md:max-w-[360px]"/>

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500">54356 WILLAM BAN LOTHER <br />Suite Washington USA</p>
          <p className="text-gray-500">+91 9639662671 <br />Email:greatstack@gmail.com</p>
          <p className="font-semibold text-lg">Career at prescripto</p>
          <p className="text-gray-600">Learen more about us and our job opening</p>
          <button className="border border-black px-8 py-4 text-sm hover:scale-102 hover:text-white hover:bg-purple-600 transition-all duration-300">EXPLORE JOBS</button>
        </div>
      </div>
    </div>
  )
}

export default Contact