import { PhoneCall,Mail,MapPin } from "lucide-react";

export function ContactCard(props){
       let image_component;

        switch (props.id){

                    case 1:

                        image_component=<PhoneCall />
                        break;

                    case 2:

                        image_component=<Mail />
                        break;

                    case 3:
                        image_component=<MapPin />
                        break;

                    default:
                        image_component=""
                        break;
            }

    return (

        <div className="bg-white rounded-lg border-2 gap-y-2 border-green-200 flex flex-col justify-center items-center p-15  ">

            {image_component}
             <h1 className="text-green text-3xl">{props.title}</h1>
             <h1 className="text-green-800 text-xl">{props.first_data}</h1>
            <h1 className="text-green-800 text-lg">{props.second_data}</h1>

        </div>
    )
}