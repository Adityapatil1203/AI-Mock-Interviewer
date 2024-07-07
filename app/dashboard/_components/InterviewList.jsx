"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm'
import Card from './Card'

const InterviewList = () => {

    const {user} = useUser()
    const [interviewList,setInterviewList] = useState([])

    useEffect(()=>{
       user && getInterviewList()
    },[user])

    const getInterviewList =async ()=>{
       const result = await db.select()
       .from(MockInterview)
       .where(eq(MockInterview.createdBy,user?.primaryEmailAddress.emailAddress))
       .orderBy(desc(MockInterview.id))

       console.log(result);
       setInterviewList(result)
    }

  return (
    <div  >
       <h2 className='font-medium text-xl' > Previous Mock Interview</h2>
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3 '>
       {
        interviewList && interviewList.map((interviewInfo,ind)=>(
            <Card key={ind} interviewInfo={interviewInfo} />
        ))
       }
       </div>
    </div>
  )
}

export default InterviewList