import { PhoneCall, Mail, MapPin } from "lucide-react";

export function ContactCard(props) {
  let image_component;

  switch (props.id) {
    case 1:
      image_component = <PhoneCall size={30} className="group-hover:scale-130 duration-300"/>;
      break;

    case 2:
      image_component = <Mail size={30} className="group-hover:scale-130 duration-300"/>;
      break;

    case 3:
      image_component = <MapPin size={30} className="group-hover:scale-130 duration-300"/>;
      break;

    default:
      image_component = "";
      break;
  }

  return (
    <div className=" group bg-white rounded-lg border-2 gap-y-2 shadow-lg hover:shadow-2xl hover:scale-105 duration-300 border-green-200 flex flex-col justify-center items-center p-12  ">
     {image_component}

      <h1 className="text-3xl">{props.title}</h1>
      <h1 className="text-green-800  text-xl">{props.first_data}</h1>
      <h1 className="text-green-800 text-lg">{props.second_data}</h1>
    </div>
  );
}
