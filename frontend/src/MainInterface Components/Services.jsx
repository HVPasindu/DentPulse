export function Services(props) {


    return (

        <div className=" flex flex-col justify-center items-center p-8 bg-white rounded-2xl py-5 border-cyan-300 border-2 w-[320px] mx-auto hover:shadow-2xl">

            <h1 className="font-bold  text-cyan-700 pb-2">{props.title}</h1>
            <div className=" items-center justify-center">
                
                <h1 className="text-sm ">{props.description}</h1>
            </div>
        </div>

    )

}