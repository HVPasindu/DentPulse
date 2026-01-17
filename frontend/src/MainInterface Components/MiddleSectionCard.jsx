import { middledata } from "../data/middledata"

export function MiddleSectionCard(props){


    return (
        <div className=" flex flex-col rounded-xl w-[320px] justify-center items-center p-5 bg-green-400 hover:scale-110 transition-transform duration-300">

            <h1 className=" text-white  font-medium text-2xl">{props.main_text}</h1>

            <h1 className="text-green-800 font-medium text-xl">{props.second_text}</h1>
        </div>

    )
}