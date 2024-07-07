import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const Card = ({interviewInfo}) => {

    const router = useRouter()


    const onStart = ()=>{
        router.push(`/dashboard/interview/${interviewInfo?.mockId}`)
    }

    const onFeedback = ()=>{
        router.push(`/dashboard/interview/${interviewInfo?.mockId}/feedback`)
    }

  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary' >{interviewInfo?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600 '>{interviewInfo?.jobExperience} Year of Experience </h2>
        <h2 className='text-xs text-gray-400'>Created At: {interviewInfo?.createdAt}</h2>
        <div className=' mt-1 flex justify-between gap-3 '>
            <Button size='sm' variant="outline" className='w-full'
                onClick={onFeedback}
            >
                Feedback
            </Button>
            <Button size='sm' className="w-full" onClick={onStart} >
                Start
            </Button>
        </div>
    </div>
  )
}

export default Card