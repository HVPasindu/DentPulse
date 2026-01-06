import { HashLink } from 'react-router-hash-link'
export function Footer() {
  return (
    <div className="bg-cyan-800">
      <div className="bg-cyan-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-around  py-10 px-5 gap-4">
        <div>
          <h1 className="font-extrabold text-lg md:text-2xl text-cyan-300 ">
            {" "}
            Dent<span className="font-bold text-cyan-500">Pulse</span>
          </h1>
          <h5 className="font-light text-cyan-200">
            <br />
            Your trusted partner for comprehensive dental care and beautiful
            smiles.
          </h5>
        </div>
        <div>
          <h1 className="text-sm font-bold text-cyan-50">Quick Links</h1>

          <nav className='cursor-pointer'>
            <HashLink smooth to="/#home" className="text-cyan-300 hover:text-white">
              Home
            </HashLink>
            <HashLink smooth to="/#services" className="text-cyan-300 hover:text-white"><br/>
              Services
            </HashLink>
            <HashLink smooth to="/#about" className="text-cyan-300 hover:text-white"><br/>
              Testimonials
            </HashLink>
            <HashLink smooth to="/#contact" className="text-cyan-300 hover:text-white"><br/>
              Contact
            </HashLink>
          </nav>
        </div>

        <div>
          <h1 className="text-sm font-bold text-cyan-50">Services</h1>

          <ul>
            <li className="text-cyan-200">Tooth Extraction</li>
            <li className="text-cyan-200">Dental Fillings</li>
            <li className="text-cyan-200">Teeth Cleaning</li>
            <li className="text-cyan-200">Root Canal</li>
          </ul>
        </div>

        <div>
          <h1 className="text-sm font-bold text-cyan-50">Office Hours</h1>

          <ul>
            <li className="text-cyan-200">Monday - Friday: 4PM - 7.30PM</li>
            <li className="text-cyan-200">Saturday: 10.30AM - 4.30PM</li>
            <li className="text-cyan-200">Sunday: 10.30AM - 4.30PM</li>
            <li className="text-cyan-200">Emergency: 24/7</li>
          </ul>
        </div>
      </div>

      <div className=" flex flex-col  items-center border-t-2 w-[90%] max-w-6xl mx-auto border-cyan-500 ">
        <h1 className="text-cyan-50">
          © 2025 DentPulse Dental. All rights reserved.
        </h1>
        <br />

        <h1 className="text-cyan-200">
          No.5, Nagoda Junction , Kalutara | Phone: +94 71 546 6337 | Email: info@dentpulse.com
        </h1>
      </div>
    </div>
  );
}
