import React from 'react'

export const NavigationButtons = () => {
  return (
    <div className='bg-cyan-100 rounded-2xl grid justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-10'>
        <button className='bg-cyan-500 hover:bg-cyan-700 rounded-2xl text-white p-2 m-2'>
            My Profile
        </button>
    <button className='bg-cyan-500 hover:bg-cyan-700 rounded-2xl text-white p-2 m-2'>
        Family Members
    </button>
    <button className='bg-cyan-500 hover:bg-cyan-700 rounded-2xl text-white p-2 m-2'>
        Book Appointment
    </button>
    <button className='bg-cyan-500 hover:bg-cyan-700 rounded-2xl text-white p-2 m-2'>
        My Appointment
    </button>

    </div>
  )
}
