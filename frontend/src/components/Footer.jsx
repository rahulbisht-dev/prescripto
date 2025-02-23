import { assets } from '../assets/assets_frontend/assets';

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* left */}
            <div>
                <img src={assets.logo} alt="" className='mb-5 w-40' />
                <p className='w-full md:w-2/3'>lorem ipsum is the simple dummy textof the printing and typesetting industry. lorem ipsum is the simple dummy textof the printing and typesetting industry. lorem ipsum is the simple dummy textof the printing and typesetting industry. lorem ipsum is the simple dummy textof the printing and typesetting industry. </p>
            </div>
           {/* middle */}
            <div>
                <p  className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p  className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91-885644112233</li>
                    <li>prescripto@gmail.com</li>
                </ul>
            </div>
        </div>

        <div>
            {/* copyright text */}

            <hr />
            <p className='my-5 text-sm text-center'>Copyright 2024@prescrypto all right reserved.</p>
        </div>
    </div>
  )
}

export default Footer;