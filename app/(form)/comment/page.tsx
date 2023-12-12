'use client'
import { useState, FC } from "react";
import { useRouter } from 'next/navigation';

const Comment: FC = () => {
    const router = useRouter()
    const [inputText, setInputText] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputText(e.target.value);
    };

    const handleNextClick = () => {
      // ローカルストレージに値を保存
      localStorage.setItem('inputText', inputText.toString());
  
      // '/tag'ページに移動
      router.push("/tag");
    };

    return (
      <div>
        <button 
          className="mt-6 ml-8"
          onClick={()=>{
            router.push("/score");
          }}
        >
            &lt;戻る
        </button>
        <section className="w-full max-w-xs mx-auto">
          <h2 className="text-xl font-bold text-center mt-6">よろしければコメントを<br/>お願いします</h2>
          <div className="mt-16">
            <label htmlFor="textInput" className="block text-lg mb-2">
              Enter Text:
            </label>
            <textarea
              id="textInput"
              value={inputText}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              style={{ backgroundColor: 'white', minHeight: '200px' }}
            />
            <p className="mt-2">You entered: {inputText}</p>
          </div>
        </section>
        <div className="font-bold text-2xl flex justify-center">
          <button
            className="bg-[#00ff00] px-8 my-16 rounded-md flex items-center"
            onClick={handleNextClick}
          >
              next<span className="text-base ml-1">&gt;</span>
          </button>
        </div>
      </div>
    );
  };

  export default Comment;