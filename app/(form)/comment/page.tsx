'use client'
import { useState, FC, useEffect } from "react";
import { useRouter } from 'next/navigation';

const Comment: FC = () => {
    const router = useRouter()
    const [inputText, setInputText] = useState<string>('');
    const [nodata,setnodata] = useState(true);

    useEffect(()=>{
        const data1 = localStorage.getItem("inputText")
        data1 ? setInputText(data1):""
    },[])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputText(e.target.value);
    };

    const handleNextClick = () => {
      // ローカルストレージに値を保存
      if(inputText != ""){
        localStorage.setItem('inputText', inputText.toString());
  
      // '/tag'ページに移動
        router.push("/tag");
      }
      else{
          console.log("nodata")
          setnodata(false)
      }
    };

    return (
      <div>
        <section className="w-full max-w-xs mx-auto"></section>
          <h1 className="text-xl font-bold text-center mt-6">プレゼンの感想をお願いします</h1>

          <div className="mt-[50%]">
            <div className="flex justify-center flex-wrap">
              <div className="text-left w-full max-w-xs">
                <h2 className="text-base font-bold">コメントを入力</h2>
                <p className="text-xs">プレゼンの感想やアドバイスを入力してください</p>
                {
                  nodata == false ? <p className='text-xs text-red-500'>※コメントを入力してください</p> : ""
                }
              </div>
              <textarea
                id="textInput"
                value={inputText}
                onChange={handleChange}
                className="textarea textarea-bordered w-full max-w-xs h-[116px] text-base mt-2"
                placeholder="コメントを入力してください"
              />
            </div>
            <div className="flex justify-between">
              <div className="font-bold text-l mt-8 ml-10">
                <button 
                  className="btn bg-white text-[#808080]"
                  onClick={()=>{
                    router.push("/score")
                  }}  
                >
                  <span className="mr-[2px]">&lt;</span>戻る
                </button>
              </div>
              <div className="font-bold text-l mt-8 mr-10">
                <button onClick={handleNextClick} className="btn bg-black text-white">
                  次へ<span className="ml-[2px]">&gt;</span>
                </button>
              </div>
            </div>
          </div>
        <section />
      </div>
    );
  };

  export default Comment;