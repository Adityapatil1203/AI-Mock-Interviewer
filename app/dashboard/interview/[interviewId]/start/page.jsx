"use client"
import { db } from '@/utils/db'
import { eq } from "drizzle-orm";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import QuestionSection from './_components/QuestionSection';
import RecordAnswer from './_components/RecordAnswer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const startInterview = ({params}) => {

    const [interviewData,setInterviewData] = useState(null)
    const [questions,setQuestions] = useState([])
    const [activeIndex,setActiveIndex] = useState(0)

    useEffect(() => {
        getInterviewDetails();
      }, []);
    
      const getInterviewDetails = async () => {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));
        console.log(result);

        const jsonMockRes = JSON.parse(result[0].jsonMockResp)
        console.log(jsonMockRes)
        setQuestions(jsonMockRes)
        setInterviewData(result[0])
       
      };
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>
                {/* Questons */}
                <QuestionSection activeIndex={activeIndex} questions={questions} />

                {/* video and audio */}
                {
                     console.log('int ',interviewData)
                }
                <RecordAnswer activeIndex={activeIndex} questions={questions} interviewData={interviewData} />
        </div>
        <div className='flex justify-end gap-6 '>
         { activeIndex>0 && <Button onClick={()=>setActiveIndex(activeIndex-1)} >Previous Question</Button>}
          { activeIndex != questions.length-1 && <Button onClick={()=>setActiveIndex(activeIndex+1)} >Next Question</Button>}
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
           { activeIndex===questions.length-1 && <Button >End Interview</Button>}
           </Link>
        </div>
    </div>
  )
}

export default startInterview