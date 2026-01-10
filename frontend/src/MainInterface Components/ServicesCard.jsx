export function Services(props) {


    return (


        <div className=" flex flex-col justify-center items-center p-8 bg-white rounded-2xl py-5 border-green-300 border-2 w-[320px] mx-auto hover:shadow-lg hover:scale-110 transition-transform duration-300">

            <h1 className="font-bold  text-green-700 pb-2">{props.title}</h1>
            <div className=" items-center justify-center">
                
                <h1 className="text-sm text-green-600">{props.description}</h1>
            </div>
        </div>

    )

}