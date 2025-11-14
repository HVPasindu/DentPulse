export function Hero() {




    return (
        <div className="grid grid-cols-1 pb-3.5 bg-cyan-100 ">

            <div className="flex flex-col justify-center items-center py-8">
                <h1 className="text-cyan-600 rounded-3xl bg-cyan-300 my-8 py-1.5 px-1.5">🌟 Trusted by 100000+ Happy Patients</h1>
                <h1 className="py-0.5">Your Smile,Our Priority</h1><br/>
                <div className=" w-[50%] md:w-[50%] items-center">
                    <h1>Experience exceptional dental care with our team of experienced professionals. We're committed to providing comfortable, high-quality treatment for the whole family.</h1>
                </div>
            </div>

            <div className=" flex flex-col md:flex-row gap-4 justify-center items-center">
                <button className="rounded-lg bg-cyan-600 text-white hover:shadow-2xl px-7 py-3 hover:bg-cyan-800">Book Appointment</button>
                <button className="rounded-lg bg-white border-cyan-600 border-2 px-7 py-3 hover:bg-cyan-200" >📞Call Us Now</button>
            </div>
            <div className="bg-cyan-600   justify-between px-4 py-14 mt-10 text-cyan-100 font-bold grid grid-cols-1 gap-y-4  md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-6 ">

                <h1> ✔️Experienced & Certified Dentists  </h1>
                <h1> ✔️State-of-the-Art Equipment   </h1>
                <h1> ✔️Flexible Payment Options </h1>
                <h1> ✔️Same-Day Appointments Available </h1>
                <h1>✔️Family-Friendly Environment</h1>
                <h1>✔️Digital X-Rays & Imaging</h1>

            </div>
        </div>

    )
}