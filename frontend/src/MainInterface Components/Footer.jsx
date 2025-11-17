export function Footer() {

    return (

        <div className="bg-cyan-800">
            <div className="bg-cyan-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-around  py-10 px-5 gap-4">
                <div>
                    <h1 className="font-extrabold text-lg md:text-2xl text-cyan-300 "> Dent<span className="font-bold text-cyan-500">Pulse</span></h1>
                    <h5 className="font-light text-cyan-200"><br />
                        Your trusted partner for comprehensive dental care and beautiful smiles.
                    </h5>
                </div>
                <div>
                    <h1 className="text-sm font-bold text-cyan-50">Quick Links</h1>

                    <nav>

                        <a herf='/html' className="text-cyan-200">Home</a><br />

                        <a herf='/html' className="text-cyan-200">Services</a><br />

                        <a herf='/html' className="text-cyan-200">About Us</a><br />

                        <a herf='/html' className="text-cyan-200">Contact</a><br />

                    </nav>


                </div>


                <div>
                    <h1 className="text-sm font-bold text-cyan-50">Services</h1>

                    <ul>
                        <li className="text-cyan-200">General Dentistry</li>
                        <li className="text-cyan-200">Cosmetic Dentistry</li>
                        <li className="text-cyan-200">Emergency Care</li>
                        <li className="text-cyan-200">Orthodontics</li>

                    </ul>

                </div>

                <div>
                    <h1 className="text-sm font-bold text-cyan-50">Office Hours</h1>

                    <ul >
                        <li className="text-cyan-200">Monday - Friday: 8AM - 6PM</li>
                        <li className="text-cyan-200">Saturday: 9AM - 3PM</li>
                        <li className="text-cyan-200">Sunday: Closed</li>
                        <li className="text-cyan-200">Emergency: 24/7</li>

                    </ul>

                </div>
           
            </div>

            <div className=" flex flex-col  items-center border-t-2 w-[90%] max-w-6xl mx-auto border-cyan-500 ">
              
                <h1 className="text-cyan-50">
                    © 2025 Bright Smile Dental. All rights reserved.
                </h1>
                <br/>
                
                <h1  className="text-cyan-200">
                    123 Dental Street | Phone: (555) 123-4567 | Email: info@dentpulse.com
                </h1>

            </div>


        </div>

    )

}