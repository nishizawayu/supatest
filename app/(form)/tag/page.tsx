'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Tag = ()=>{

    const router = useRouter();
    const tagarr:string[]=["すごい","かっこいい","神秘的","可愛い","きれい","大根おろし","鰹節"];
    // タグ用
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
          setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
        } else {
          setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleNextClick = () => {
        // ローカルストレージに値を保存
        localStorage.setItem('selectedTags', selectedTags.toString());
    
        // '/finish'ページに移動
        router.push("/finish");
      };


    return(
        <div>
            <button 
                className="mt-6 ml-8"
                onClick={()=>{
                    router.push("/comment");
                }}
            >
                    &lt;戻る
            </button>
            <section>
                <h2 className="text-xl font-bold text-center mt-6">学生に合うタグを選んでください</h2>
                <div className="flex flex-wrap w-[80%] mx-auto mt-9 gap-5">
                    {
                        tagarr.map((deta:string,index:number)=>(
                            <p key={index} className={`w-[45%] border border-[#000000] text-center p-3 cursor-pointer ${selectedTags.includes(deta) ? 'bg-gray-300' : ''}`}
                            onClick={()=>{
                                toggleTag(deta);
                            }}>#{deta}</p>
                        ))
                    }
                </div>

                <div className="font-bold text-2xl flex justify-center">
                    <button
                        className="bg-[#00ff00] px-8 my-16 rounded-md flex items-center"
                        onClick={handleNextClick}
                    >
                        next<span className="text-base ml-1">&gt;</span>
                    </button>
                </div>
                
            </section>
        </div>
    )
}

export default Tag;