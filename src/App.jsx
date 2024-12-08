import React, { useState, useRef }from 'react'
import data from './data'
console.log("Data imported:", data);

const App = () => {

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  let optionArray = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if(lock === false){
      if (question.ans === ans){
        e.target.classList.add('bg-green-300','border-green-500');
        setLock(true);
        setScore(score+1);
      }else{
        e.target.classList.add('bg-red-300','border-red-500');
        setLock(true);
        optionArray[question.ans-1].current.classList.add('bg-green-300','border-green-500');
      }
    }
  }

  const next = () => {
    if(lock === true){
      if(index === data.length-1){
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      optionArray.map((option)=>{
        option.current.classList.remove('bg-red-300','border-red-500','bg-green-300','border-green-500')
      })
    }
  }

  const reset = () => {
    setIndex(0);
    setQuestion(data[index]);
    setLock(false);
    setScore(0);
    setResult(false);
    optionArray.map((option)=>{
      option.current.classList.remove('bg-red-300','border-red-500','bg-green-300','border-green-500')
    })
  }


  return (
    <div className='relative w-full min-h-screen'>
      <div className='flex justify-center items-center absolute inset-0 bg-gradient-to-b from-orange-300 to-purple-300'>
        <div className="flex flex-col items-left w-[35rem] min-h-[40rem] bg-white rounded-md">
          <h1 className='text-4xl my-6 mx-4'>Quiz App</h1>
          <hr className='bg-gray-400 w-full h-.5 '/>
          {result?<>
            <h2 className='text-3xl text-gray-400 my-5 mx-4'>You scored {score} out of {data.length}</h2>
            <button onClick={reset} className='my-6 shadow-sm p-2 h-12 mx-5 w-[calc(100%-2.5rem)] rounded-md bg-blue-300 hover:bg-blue-200 hover:text-black text-white'>Reset</button>
          </>:<>
            <h2 className='text-lg my-5 mx-4'>{index+1}. {question.question}</h2>
          <ul className='w-full space-y-8 px-4'>
            <li ref={Option1} onClick={(e)=>{checkAns(e, 1)}} className='w-full border-2 p-3 rounded hover:border-gray-300 '>{question.option1}</li>
            <li ref={Option2} onClick={(e)=>{checkAns(e, 2)}} className='w-full border-2 p-3 rounded hover:border-gray-300 '>{question.option2}</li>
            <li ref={Option3} onClick={(e)=>{checkAns(e, 3)}} className='w-full border-2 p-3 rounded hover:border-gray-300 '>{question.option3}</li>
            <li ref={Option4} onClick={(e)=>{checkAns(e, 4)}} className='w-full border-2 p-3 rounded hover:border-gray-300 '>{question.option4}</li>
          </ul>
          <button onClick={next} className='my-6 shadow-sm p-2 h-12 mx-5 w-[calc(100%-2.5rem)] rounded-md bg-blue-300 hover:bg-blue-200 hover:text-black text-white'>Next</button>
          <div className="index mx-5">{index+1} of {data.length} question</div>
          </>}
        </div>

      </div>
    </div>
  )
}

export default App
