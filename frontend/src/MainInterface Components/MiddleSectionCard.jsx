import { middledata } from "../data/middledata"

export function MiddleSectionCard(props){


    return (
        <div className=" flex flex-col rounded-xl items-center p-5 bg-cyan-400 hover:scale-105 transition-transform duration-300">

            <h1 className="font-light text-lg">{props.main_text}</h1>

            <h1 className="text-cyan-800 w-[50%]">{props.second_text}</h1>
        </div>

    )
}