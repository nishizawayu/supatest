'use client'
import { useState, FC } from "react";
import Link from "next/link";

const Comment: FC = () => {
    const [inputText, setInputText] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputText(e.target.value);
    };

    return (
      <div>
        <p className="w-[80%] mx-auto mt-6">
          <Link href="/score">
            &lt;戻る
          </Link>
        </p>
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
            onClick={() => {
              console.log(inputText);
            }}
          >
            <Link href="/tag">
              next<span className="text-base ml-1">&gt;</span>
            </Link>
          </button>
        </div>
      </div>
    );
  };

  export default Comment;