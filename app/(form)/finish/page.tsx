'use client'
import { useRouter } from 'next/navigation';

const end = ()=>{
    const router = useRouter();
    return(
        <div>
            <section>
                <h2 className="text-xl font-bold text-center mt-6">以上です。<br/>ありがとうございます。</h2>

                <div className="font-bold text-2xl flex justify-center">
                    <button
                        className="bg-[#00ff00] px-8 my-16 rounded-md flex items-center"
                        onClick={()=>{
                            router.push("/nummber");
                        }}
                    >
                        終了<span className="text-base ml-1">&gt;</span>
                    </button>
                </div>
                
            </section>
        </div>
    )
}

export default end;