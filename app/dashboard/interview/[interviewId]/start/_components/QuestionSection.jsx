"use client"
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection = ({ activeIndex, questions }) => {

        const textToSpeech = (text)=>{
            if( 'speechSynthesis' in window ){
                const speech = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(speech)
            }
            else{
                alert('Sorry your browser does not support text to speech')
            }
         }

    // console.log(questions)
  return questions && (
    <div className="mt-2 p-5 border rounded-lg my-10 ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {Array.isArray(questions) && questions &&
          questions?.map((que, ind) => (
            <h2 key={ind} className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeIndex===ind && ' bg-blue-700 text-white' } ` }>
              Question: #{ind + 1}
            </h2>

          ))}

      </div>
        <h2 className=" my-5 text-md md:text-lg ">
            {
                questions[activeIndex]?.question
            }
          </h2>

          <Volume2 className="cursor-pointer " onClick={()=> textToSpeech(questions[activeIndex]?.question) } />

          <div className="border rounded-lg p-5 bg-blue-100 mt-20 ">
            <h2 className="flex gap-2 items-center text-blue-700">
                <Lightbulb/>
                <strong>Notes:</strong>
            </h2>
            <h2 className="text-sm text-blue-400 my-2 " >
                {
                    process.env.NEXT_PUBLIC_QUESTION_NOTE
                }
            </h2>
          </div>
    </div>
  );
};

export default QuestionSection;
