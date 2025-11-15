import { MiddleSectionCard } from "./MiddleSectionCard"
import { middledata } from "../data/middledata"

export function MiddleSection() {


    return (

        <div className="grid grid-cols-1 justify-evenly md:grid-cols-2 gap-x-64 bg-cyan-50  ">

            <div className="flex flex-col justify-center items-center pl-20">

                <h1 className="text-2xl font-medium   text-cyan-700">Why Choose DentPulse Clinic</h1>
                <h1 className="font-light m-8 text-cyan-600">Enhance your smile with our cosmetic dentistry services, including teeth whitening, veneers, bonding, and smile makeovers tailored to your needs. </h1>
                <div className="grid  grid-cols-1 gap-x-7 gap-y-7 md:grid-cols-2 ">

                    {middledata.map((middle_data)=>(<MiddleSectionCard main_text={middle_data.main_text} second_text={middle_data.second_text}/>))}
             
                </div>
            </div>
            <div className="bg-cyan-200 rounded-3xl w-[600px] h-[600px] my-9">

                <img src="middlesection.png" alt="middlesection_image" className="w-[500px] h-[500px] pt-20 mx-auto"/>
            </div>


            <div className=" flex  flex-col bg-cyan-600 w-screen pt-20 justify-center items-center pb-20">

                <h1 className="font-semibold text-xl text-white p-5">Ready to Shedule Your Visit</h1>
                <h1 className="font-normal text-lg text-white p-7">Our friendly staff is here to help you. Book your appointment today and take the first step towards a healthier smile.</h1>

                <button className="bg-white p-3 rounded-xl px-7 shadow-lg hover:bg-cyan-200 " >Make An Appointment</button>
                
            </div>

        </div>

    )
}