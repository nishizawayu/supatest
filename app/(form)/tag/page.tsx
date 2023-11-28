'use client'
import Link from "next/link";

const Tag = ()=>{

    const tagarr:string[]=["すごい","かっこいい","神秘的","可愛い","きれい","大根おろし"];
    return(
        <div>
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
                    >
                    <Link href="/comment">
                        next<span className="text-base ml-1">&gt;</span>
                    </Link>

                    </button>
                </div>
                
            </section>
        </div>
    )
}

export default Tag;