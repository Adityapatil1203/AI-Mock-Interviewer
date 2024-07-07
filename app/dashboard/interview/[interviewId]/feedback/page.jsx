"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const FeedBack = ({params}) => {


    const [feedbacklist,setFeedbacklist] = useState([])
    const router = useRouter()

    useEffect(()=>{
        getFeedback()
    },[])
 
    const getFeedback =async ()=>{
        const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer?.mockIdRef,params.interviewId))
        .orderBy(UserAnswer.id)

        setFeedbacklist(result)
        console.log(result);
    }
    
  

  return (
    <div className='mt-1 p-!0'>
     
        {
            feedbacklist?.length === 0 ?
            <h2 className='font-bold text-xl text-gray-500'>No feedback for this Interview</h2> :
            <>
            <h2 className='text-2xl font-bold text-green-500' >Congratulations!</h2>
            <h2 className='font-bold text-xl'>Here is your Interview feedback</h2>
        <h2 className='text-primary text-lg my-3 ' >Your overall rating: <strong>7/10</strong> </h2>
        <h2 className='text-sm text-gray-500 ' >Find below your all question with correct answer and feedback for improvement</h2>
        { feedbacklist && feedbacklist.map((item,ind)=>(
            <Collapsible key={ind} className='mt-7' >
                <CollapsibleTrigger className='flex justify-between p-2 bg-secondary rounded m-2 text-left gap-10 w-full ' >
                {item?.question} <ChevronsUpDown className='h-5 w-5 ' />
                </CollapsibleTrigger>
                <CollapsibleContent>
                   <div className='flex flex-col gap-2' >
                     <h2 className='p-2 border rounded-lg text-red-500 ' ><strong>Rating:</strong>{item?.rating}</h2>
                     <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900' ><strong>Your Answer:</strong>{item?.userAns}</h2>
                     <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900' ><strong>Correct Answer:</strong>{item?.correctAns}</h2>
                     <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900' ><strong>Feedback:</strong>{item?.feedback}</h2>
                   </div>
                 
                </CollapsibleContent>
            </Collapsible>
        )) }
        </>
}
        <Button onClick={()=>router.replace('/dashboard')} >Go Home</Button>
    </div>
  )
}

export default FeedBack
