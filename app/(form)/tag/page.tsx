'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Tag = ()=>{

    const router = useRouter();
    const tagarr:string[]=["すごい","プロ級","明るい","可愛い","きれい","面白い","努力家","天才"];
    // タグ用
    const [selectedTags, setSelectedTags] = useState<string>("");

    const handleNextClick = () => {
        // ローカルストレージに値を保存
        localStorage.setItem('selectedTags', selectedTags.toString());
    
        // '/finish'ページに移動
        router.push("/finish");
      };


    return(
        <div>
            <section>
                <h1 className="text-xl font-bold text-center mt-6">どんな学生でしたか？</h1>

                <div className='flex flex-wrap justify-center mt-20'>
                    <div className="w-full max-w-xs mx-10">
                        <h2 className="text-base font-bold">タグを選択</h2>
                        <p className="text-xs">学生の特徴に合ったタグを1つ選択してください</p>
                    </div>
                    <div className="flex flex-wrap w-full gap-x-10 gap-y-8 justify-center my-8">
                        {
                            tagarr.map((deta:string,index:number)=>(
                                <p key={index} className={`w-[130px] border rounded-lg border-[#000000] text-base font-bold text-center py-4 cursor-pointer ${selectedTags.includes(deta) ? 'bg-gray-300' : ''}`}
                                onClick={()=>{
                                    setSelectedTags(deta);
                                }}>#{deta}</p>
                            ))
                        }
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="font-bold text-l ml-10">
                        <button 
                        className="btn bg-white text-[#808080]"
                        onClick={()=>{
                            router.push("/score")
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