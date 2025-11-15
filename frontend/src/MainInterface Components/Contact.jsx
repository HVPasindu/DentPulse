import {contactdata} from '../data/contactdata'
import { ContactCard } from "./ContactCard"




export function Contact(){

    return(

            <div className="flex flex-col justify-center items-center bg-cyan-100 "> 

                <h1>Get In Touch</h1> 
                <h1>We are here to answer to your questions</h1>
                
                <div>
                    <ContactCard id={contactdata[0].id} title={contactdata[0].title} first_data={contactdata[0].first_data} second_data={contactdata[0].second_data} />
                </div>
             </div>

    )
}