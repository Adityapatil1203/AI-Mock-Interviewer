"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const redirectToDashboard = () => {
    console.log("dashh");
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden">
      <div className="relative z-10 p-8 bg-black bg-opacity-50 rounded-xl shadow-lg text-center space-y-5">
        <h1 className="text-5xl font-bold tracking-wider animate-bounce">Welcome to AI Mock Interviewer</h1>
        <p className="text-xl max-w-2xl mx-auto">Get ready for your dream job with our advanced AI-driven mock interview platform. Hone your skills, gain confidence, and ace your interviews.</p>
        <Button
           onClick={redirectToDashboard}
          className="px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
        >
          Let's Start
        </Button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white animate-ping">
          <Image
            src="/interview.webp"
            alt="Interview Image"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-700 ease-in-out transform hover:scale-110"
          />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-white opacity-10 rounded-full animate-ping"></div>
        <div className="w-48 h-48 bg-white opacity-20 rounded-full animate-ping"></div>
        <div className="w-32 h-32 bg-white opacity-30 rounded-full animate-ping"></div>
      </div>
    </div>
   
  );
}
