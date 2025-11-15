import { MiddleSectionCard } from "./MiddleSectionCard"
import { middledata } from "../data/middledata"
export function MiddleSection() {


    return (

        <div className="grid grid-cols-1 justify-around md:grid-cols-2 gap-x-10 bg-cyan-100 ">

            <div className="flex flex-col justify-center items-center">

                <h1 className="text-2xl font-medium   text-cyan-700">Why Choose DentPulse Clinic</h1>
                <h1 className="font-light m-8 text-cyan-600">Enhance your smile with our cosmetic dentistry services, including teeth whitening, veneers, bonding, and smile makeovers tailored to your needs. </h1>
                <div className="">

                    {middledata.map((middle_data)=>(<MiddleSectionCard main_text={middle_data.main_text} second_text={middle_data.second_text}/>))}
             
                </div>
            </div>
            <div className="bg-cyan-200 rounded-3xl w-[600px] h-[600px]  ">

                <img src="middlesection.png" alt="middlesection_image" className="w-[500px] h-[500px] pt-16 mx-auto" />
            </div>

        </div>


    )
}