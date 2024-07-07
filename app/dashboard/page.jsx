
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

const Dashboard = () => {
   
  return (
    <div>
        
        <h2 className='font-bold text-2xl mt-9 ' >Dashboard</h2>
        <h3 className='text-gray-500 ' >Create & start your AI Mok Interview</h3>

        <div className=' grid grid-cols-1 md:grid-cols-3 my-5 ' >
            <AddNewInterview/>
        </div>
       
        {/* previous list interview */}
        <InterviewList/>

    </div>
  )
}

export default Dashboard