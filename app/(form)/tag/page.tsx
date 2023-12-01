'use client'
import { useRouter } from 'next/navigation';

const Tag = ()=>{

    const router = useRouter();
    const tagarr:string[]=["すごい","かっこいい","神秘的","可愛い","きれい","大根おろし","鰹節"];
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
                <div className="flex flex-wrap w-[60%] mx-auto mt-9">
                    {
                        tagarr.map((deta:string,index:number)=>(
                            <p key={index} className="w-[50%]" onClick={()=>{
                                console.log(deta);
                            }}>#{deta}</p>
                        ))
                    }
                </div>

                <div className="font-bold text-2xl flex justify-center">
                    <button
                        className="bg-[#00ff00] px-8 my-16 rounded-md flex items-center"
                        onClick={()=>{
                            router.push("/finish")
                        }}
                    >
                        next<span className="text-base ml-1">&gt;</span>
                    </button>
                </div>
                
            </section>
        </div>
    )
}

export default Tag;