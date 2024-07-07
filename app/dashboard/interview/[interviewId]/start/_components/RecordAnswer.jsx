"use client"
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAiModel'
import { db } from '@/utils/db'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { UserAnswer } from '@/utils/schema'

const RecordAnswer = ({activeIndex,questions,interviewData}) => {
    const [userAnswer,setUserAnswer] = useState('')
    const {user} = useUser()
    const [loading,setLoading]=useState(false)
    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
        results.map((result)=>(
            setUserAnswer(prev=>prev+result?.transcript)
        ))
      },[results])

      useEffect(()=>{
            if(!isRecording && userAnswer.length>10 ){
                updateUserAns()
            }
      },[userAnswer])

      const startStopRecording =async ()=>{
        if(isRecording)
        {
           
            stopSpeechToText()
           
        }else{
            startSpeechToText()
        }
      }

      const updateUserAns = async ()=>{
        setLoading(true)
        console.log(userAnswer)
        const feedBackPromt = "Question:"+questions[activeIndex]?.question+", user answer:"+userAnswer+" ,Depends on question and and user answer for give interview question please give us rating and feedback as area of improvement if any in just 3-4 lines to improve it in JSON format with rating field and feedback field "

        const result = await chatSession.sendMessage(feedBackPromt);
        const mockJsonRes = (result.response.text()).replace("```json",'').replace("```",'');
        console.log("mock res ",mockJsonRes);

        const JsonFeedbackResp = JSON.parse(mockJsonRes)

        console.log("inttt ",interviewData);
        console.log("mockid ",interviewData?.mockId);
        const mockId = interviewData?.mockId

         const res = await db.insert(UserAnswer).values(
             {
                 mockIdRef:mockId,
                 question:questions[activeIndex]?.question,
                 correctAns:questions[activeIndex]?.answer,
                 userAns:userAnswer,
                 feedback:JsonFeedbackResp?.feedback,
                 rating:JsonFeedbackResp?.rating,
                 userEmail:user?.primaryEmailAddress?.emailAddress,
                 createdAt:moment().format('DD-MM-yyyy')

             }
         )

         if(res)
         {
             toast("User answer recorded successfully")
             setResults([])
         }
         setResults([])
         setUserAnswer('')
         setLoading(false)
      }

  return (
    <div className='flex flex-col justify-center items-center '> 
            <div className=' flex flex-col justify-center items-center bg-white rounded-lg gap-5 mt-20 ' >
                <Image alt='webcam-img' src={'/webcam.png'} width={200} height={200} className='absolute' />
                <Webcam
                mirrored={true}
                style={{
                    height:300,
                    width:'100%',
                    zIndex:10

                }}
                />
            </div>
            <Button className="my-5" disabled={loading} onClick={
                startStopRecording
            } >
                
                {
                    isRecording? 
                    <h2 className='text-red-600 flex gap-2 ' >
                        <Mic/> 'Stop Recording'
                    </h2>
                    :
                    'Record Answer'
                }
            </Button>

    </div>
  )
}

export default RecordAnswer