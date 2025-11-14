import React from 'react'
import { Header } from './MainInterface Components/Header'
import { Footer } from './MainInterface Components/Footer'
import {Hero} from './MainInterface Components/Hero'
import { servicesData } from './data/servicedata'
import { Services } from './MainInterface Components/Services'

function App() {
  
  return (
    <>
    <div className="bg-cyan-100  w-screen">

    <Header />

    </div>
    <div>
           <Hero/>
    </div> 

    <div className='flex justify-around gap-x-1.5' >
      {servicesData.map((service,index)=>(<Services title={service.title} description={service.description}/>))}
     
    </div>

    <div className='bg-cyan-800'>

    <Footer />

    </div>
  
    </>

  
  )
}

export default App
