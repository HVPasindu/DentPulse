import React from 'react'
import { Header } from './MainInterface Components/Header'
import { Footer } from './MainInterface Components/Footer'
import { Hero } from './MainInterface Components/Hero'
import { servicesData } from './data/servicedata'
import { Services } from './MainInterface Components/Services'
import { MiddleSection } from './MainInterface Components/MiddleSection'


function App() {

  return (
    <>
      <div className="bg-cyan-100  w-screen">

        <Header />

      </div>
      <div>
        <Hero />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 py-5 bg-cyan-50 mx-auto' >

        {servicesData.map((service, index) => (<Services title={service.title} description={service.description} />))}

      </div>
      <div>
        <MiddleSection />
      </div>

      <div className='bg-cyan-800'>

        <Footer />

      </div>

    </>

  )
}

export default App
