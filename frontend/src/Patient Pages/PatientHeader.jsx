import React from 'react'
import headerLogo from '../assets/headerLogo.png'


const PatientHeader = () => {

  return (


    <div className='flex flex-row w-screen justify-between bg-cyan-200 p-4'>
      
        <div className='bg-cyan-200 flex flex-row p-2'>


            <img src={headerLogo} alt="dental logo" className="size-10" / >

            <h1 className='text-cyan-400 text-2xl font-bold'><span className='text-cyan-600'>Dent</span>Pluse</h1>

        </div>

        <div className='flex flex-row gap-x-2.5 '>

            <h1 className='text-black p-4'>Hello Patient!</h1>

               <button className='bg-white  hover:bg-cyan-100 border-2  hover:border-2 border-cyan-400 p-0.5 rounded-2xl '>Logout</button>


        </div>
    </div>
  )
}

export default PatientHeader