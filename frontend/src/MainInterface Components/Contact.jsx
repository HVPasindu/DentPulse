import { contactdata } from '../data/contactdata'
import { ContactCard } from "./ContactCard"


export function Contact() {

    return (

        <div className="flex flex-col justify-center items-center bg-cyan-50 py-9 ">

            <h1 className='font-bold text-2xl text-cyan-900 py-2'>Get In Touch</h1>
            <h1 className='font-semibold text-sm  text-cyan-600 py-2'>We are here to answer to your questions</h1>

            <div className='flex flex-col md:flex-row gap-4 '> 
                {contactdata.map((contact, index) =>
                (
                    <ContactCard id={contact.id} title={contact.title} first_data={contact.first_data} second_data={contact.second_data} />)
                )}
              </div>
        </div>

    )
}