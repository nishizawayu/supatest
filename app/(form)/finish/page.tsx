'use client'
import Link from "next/link";

const end = ()=>{

    return(
        <div>
            <section>
                <h2 className="text-xl font-bold text-center mt-6">以上です。<br/>ありがとうございます。</h2>

                <div className="font-bold text-2xl flex justify-center">
                    <button
                    className="bg-[#00ff00] px-8 my-16 rounded-md flex items-center"
                    >
                    <Link href="/nummber">
                        next<span className="text-base ml-1">&gt;</span>
                    </Link>

                    </button>
                </div>
                
            </section>
        </div>
    )
}

export default end;