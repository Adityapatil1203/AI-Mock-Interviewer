"use client";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    console.log(result);
    setInterviewData(result[0]);
  };

  return (
    <div className=" my-10  ">
      <h2 className="font-bold text-2xl ">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        <div className=" flex flex-col my-5 gap-2 ">
            <div className="p-5 rounded-lg border ">
            <h2>
            <strong className=" text-lg ">Job role/Job position: </strong>
            {interviewData?.jobPosition}
          </h2>
          <h2>
            <strong className=" text-lg ">Years of Experience: </strong>
            {interviewData?.jobExperience}
          </h2>
            </div>

            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100 ">
                
                <h2 className="flex gap-2 items-center text-yellow-500 " ><Lightbulb/> <strong>Information</strong></h2>
                <h2 className="mt-3 text-yellow-500 " >{process.env.NEXT_PUBLIC_INFORMATION} </h2>
            </div>
         
        </div>
        <div>
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className=" h-72 w-full my-7 p-20 bg-secondary rounded-lg border " />
              <Button variant="ghost" className={"w-full"} onClick={() => setWebcamEnabled(true)}>
                Enable web cam and microphone{" "}
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex mt-3 justify-end items-end ">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
        <Button >Start Interview </Button>
        </Link>
        
      </div>
    </div>
  );
};

export default page;
