import React from 'react'
import { useState } from 'react';

export const RecentAppoinment = () => {

    const[Status,SetStatus]=useState(false);
  return (

    <div className='rounded-2xl border-2 border-cyan-400 h-96 pt-10'>

        <div>
            <h1 className='p-1.5 text-cyan-700'>Upcoming Appoinments</h1>
            <h1 className='p-1.5 text-cyan-400'>View your scheduled appointments</h1>
        </div>

    



    </div>
  )
}
