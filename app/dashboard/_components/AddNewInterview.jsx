// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { chatSession } from "@/utils/GeminiAiModel";
// import { LoaderCircle } from "lucide-react";
// import { v4 as uuidv4 } from 'uuid'
// import { useUser } from "@clerk/nextjs";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import moment from "moment";
// import { useRouter } from "next/navigation";

// const AddNewInterview = () => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [jobPosition, setJobPosition] = useState("");
//   const [jobDescription, setJobDescription] = useState("");
//   const [jobExperience, setJobExperience] = useState();
//   const [loading,setLoading] = useState(false)
//   const [jsonRes,setJsonRes] = useState()
//   const {user} = useUser()
//   const router = useRouter()

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true)
//     console.log(jobDescription,jobPosition,jobExperience)

//     const inputPromt = `Job position: ${jobPosition} ,Job Description:${jobDescription} ,Years of Experiance: ${jobExperience} ,Depends on job Position ,job description & Years of experiance give us 5 Interview question along with answer in JSON format ,Give us question and answer field on JSON `

//     const result = await chatSession.sendMessage(inputPromt)

//     const mockJsonRes = result.response.text().replace("```json",'').replace("```",'');

//     console.log(JSON.parse(mockJsonRes))
//     setJsonRes(mockJsonRes)

//     if(mockJsonRes)
//     {
//     const resp = await db.insert(MockInterview).values(
//         {
//             mockId:uuidv4(),
//             jsonMockResp:mockJsonRes,
//             jobPosition:jobPosition,
//             jobDescription:jobDescription,
//             jobExperience:jobExperience,
//             createdBy:user?.primaryEmailAddress?.emailAddress,
//             createdAt:moment().format('DD-MM-yyyy')
//         }
//     ).returning({mockId:MockInterview.mockId})

//     console.log("inserted id ",resp);

//     if(resp)
//     {
//         setOpenDialog(false)
//         router.push("/dashboard/interview/"+resp[0]?.mockId)
//     }

// }
// else{
//     console.log("error")
// }

//     setLoading(false)

//   };
//   return (
//     <div>
//       <div
//         className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md transition-all cursor-pointer "
//         onClick={() => setOpenDialog(true)}
//       >
//         <h2 className="text-lg text-center  ">+ Add New</h2>
//       </div>
//       <Dialog open={openDialog}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle className=" text-2xl ">
//               Tell us more about your job interview
//             </DialogTitle>
//             <DialogDescription>
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <div>
//                     <h2>
//                       Add details about your job position/role,job description
//                     </h2>
//                     <div className="mt-7 my-3">
//                       <label> Job Role/Job Position </label>
//                       <Input
//                         onChange={(e) => setJobPosition(e.target.value)}
//                         className="mt-2"
//                         placeholder="Ex. Full Stack Developer"
//                         required
//                       />
//                     </div>
//                     <div className="mt-7 my-3 ">
//                       <label>Job description</label>
//                       <Textarea
//                         onChange={(e) => setJobDescription(e.target.value)}
//                         className="mt-2"
//                         placeholder="Ex. React,MySQL"
//                         required
//                       />
//                     </div>
//                     <div className="mt-7 my-3 ">
//                       <label>Year of Experiance</label>
//                       <Input
//                         onChange={(e) => setJobExperience(e.target.value)}
//                         className="mt-2"
//                         placeholder="Ex. 5"
//                         type="number"
//                         max="50"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <Input></Input>
//                   <div className="flex gap-5 justify-end ">
//                     <Button
//                       variant="ghost"
//                       onClick={() => setOpenDialog(false)}
//                     >
//                       Cancel
//                     </Button>
//                     <Button type="submit" disabled={loading} >
//                         {loading?
//                          <>
//                           <LoaderCircle className="animate-spin" />Generating Question</>:
//                          "Start Interview"
//                          }
//                         </Button>
//                   </div>
//                 </div>
//               </form>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AddNewInterview;

"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonRes, setJsonRes] = useState();
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(jobDescription, jobPosition, jobExperience);

    const inputPromt = `Job position: ${jobPosition} ,Job Description:${jobDescription} ,Years of Experience: ${jobExperience} ,Depends on job Position ,job description & Years of experience give us 5 Interview questions along with answers in JSON format ,Give us question and answer field on JSON`;

    const result = await chatSession.sendMessage(inputPromt);

    const mockJsonRes = result.response.text().replace("```json", '').replace("```", '');

    console.log(JSON.parse(mockJsonRes));
    setJsonRes(mockJsonRes);

    if (mockJsonRes) {
      const resp = await db.insert(MockInterview).values(
        {
          mockId: uuidv4(),
          jsonMockResp: mockJsonRes,
          jobPosition: jobPosition,
          jobDescription: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy')
        }
      ).returning({ mockId: MockInterview.mockId });

      console.log("inserted id ", resp);

      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId);
      }
    } else {
      console.log("error");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md transition-all cursor-pointer "
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <div>
                  <h2>Add details about your job position/role, job description</h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      onChange={(e) => setJobPosition(e.target.value)}
                      className="mt-2"
                      placeholder="Ex. Full Stack Developer"
                      required
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Job description</label>
                    <Textarea
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="mt-2"
                      placeholder="Ex. React, MySQL"
                      required
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Year of Experience</label>
                    <Input
                      onChange={(e) => setJobExperience(e.target.value)}
                      className="mt-2"
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                    />
                  </div>
                  <div className="flex gap-5 justify-end">
                    <Button
                      variant="ghost"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <LoaderCircle className="animate-spin" />Generating Questions
                        </>
                      ) : (
                        "Start Interview"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;

