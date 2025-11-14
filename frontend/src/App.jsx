import React from 'react'
import { Header } from './MainInterface Components/Header'
import { Footer } from './MainInterface Components/Footer'
import {Hero} from './MainInterface Components/Hero'

function App() {
  


  return (
    <>
    <div className="bg-cyan-100  w-screen">

    <Header />

    </div>
    <div>
           <Hero/>
    </div>

   

    
    <div className='bg-cyan-800'>

    <Footer />

    </div>
    </>

  )
}

export default App
