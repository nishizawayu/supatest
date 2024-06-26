'use client'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Tag = ()=>{

    const router = useRouter();
    const tagarr:string[]=["可能性の塊","自信家","天才","真面目","明るい","努力家","個性的","謙虚"];
    // タグ用
    const [selectedTags, setSelectedTags] = useState<string>("");
    const [nodata,setnodata] = useState(true);

    useEffect(()=>{
        const data1 = localStorage.getItem("selectedTags")
        data1 ? setSelectedTags(data1):""
      },[])

    const handleNextClick = () => {
        // ローカルストレージに値を保存
        if(selectedTags != ""){
            localStorage.setItem('selectedTags', selectedTags.toString());
            // '/finish'ページに移動
            router.push("/finish");
        }
        else{
            console.log("nodata")
            setnodata(false)
        }
      };
      
    return(
        <div>
            <section>
                <h1 className="text-xl font-bold text-center mt-6">どんな学生でしたか？</h1>

                <div className='flex flex-wrap justify-center mt-20'>
                    <div className="w-full max-w-xs mx-10">
                        <h2 className="text-base font-bold">タグを選択</h2>
                        <p className="text-xs">学生の特徴に合ったタグを1つ選択してください</p>
                        {
                            nodata == false ? <p className='text-xs text-red-500'>※タグを選択してください</p> : ""
                        }
                    </div>
                    <div className="flex flex-wrap w-full gap-x-10 gap-y-8 justify-center my-8">
                        {
                            tagarr.map((data:string,index:number)=>(
                                <p key={index} className={`w-[130px] border rounded-lg border-[#000000] text-base font-bold text-center py-4 cursor-pointer ${selectedTags.includes(data) ? 'bg-gray-300' : ''}`}
                                onClick={()=>{
                                    setSelectedTags(data);
                                }}>#{data}</p>
                            ))
                        }
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="font-bold text-l ml-10">
                        <button 
                        className="btn bg-white text-[#808080]"
                        onClick={()=>{
                            router.push("/comment")
                        }}  
                        >
                        <span className="mr-[2px]">&lt;</span>戻る
                        </button>
                    </div>
                    <div className="font-bold text-l mr-10">
                        <button onClick={handleNextClick} className="btn bg-black text-white">
                        次へ<span className="ml-[2px]">&gt;</span>
                        </button>
                    </div>
                </div>
                
            </section>
        </div>
    )
}

export default Tag;